CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- テーブル作成
CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL CHECK (char_length(trim(message)) > 0),
    is_ai BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);