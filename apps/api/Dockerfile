# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# pnpm インストール
RUN npm install -g pnpm@10.13.1

# package.json と pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/
COPY packages/servers/redis/package.json ./packages/servers/redis/
COPY packages/utils/package.json ./packages/utils/

# 依存インストール
RUN pnpm install --frozen-lockfile

# ソースコードコピー
COPY . .

# APIアプリビルド
RUN pnpm turbo run build --filter=api

WORKDIR /app/apps/api

# 本番起動コマンド
CMD ["node", "dist/apps/api/src/index.js"]