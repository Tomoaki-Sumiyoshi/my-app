-- 必要拡張機能
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- メインテーブル
CREATE TABLE
    messages (
        message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID DEFAULT uuid_generate_v4 (),
        message TEXT NOT NULL CHECK (char_length(trim(message)) > 0),
        is_ai BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

-- 一時読み込み用テーブル
CREATE TABLE
    raw_messages (id INT, message TEXT);

-- CSV読み込み（ファイルは同じディレクトリにある必要がある）
COPY raw_messages (id, message)
FROM
    '/docker-entrypoint-initdb.d/messages_raw.csv'
WITH
    (FORMAT csv, HEADER true);

-- WITH句で整形してINSERT
WITH
    user_id_list AS (
        SELECT
            id,
            uuid_generate_v4 () AS user_id
        FROM
            generate_series (1, 5) AS id
    ),
    message_list AS (
        SELECT
            id,
            message,
            CURRENT_TIMESTAMP - (
                INTERVAL '1 minute' * (100 - row_number() OVER ())
            ) AS create_at
        FROM
            raw_messages
    ),
    joined AS (
        SELECT
            u.user_id,
            m.message,
            m.create_at
        FROM
            message_list m
            INNER JOIN user_id_list u ON m.id = u.id
    )
INSERT INTO
    messages (user_id, message, created_at)
SELECT
    *
FROM
    joined;