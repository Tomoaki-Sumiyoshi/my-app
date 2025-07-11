-- テーブル作成
CREATE TABLE my_table (
    id serial PRIMARY KEY,
    name VARCHAR (100) NOT NULL
);

-- サンプルデータの登録
INSERT INTO my_table (name) VALUES ('John Doe');