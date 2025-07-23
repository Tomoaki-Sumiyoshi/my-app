# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /usr/src/app

# pnpm インストール
RUN npm install -g pnpm@10.13.1

# package.json と pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml ./
COPY apps/batch-ai/package.json ./apps/batch-ai/
COPY packages/types/package.json ./packages/types/
COPY packages/servers/redis/package.json ./packages/servers/
COPY packages/utils/package.json ./packages/utils/

# 依存インストール
RUN pnpm install --frozen-lockfile

# ソースコードコピー
COPY . .

# APIアプリビルド
RUN pnpm --filter batch-ai run build

# 本番起動コマンド
CMD ["pnpm", "--filter", "batch-ai", "start"]