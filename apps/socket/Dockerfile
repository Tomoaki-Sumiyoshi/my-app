# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# pnpm インストール
RUN npm install -g pnpm@10.13.1

# package.json と pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/socket/package.json ./apps/socket/
COPY packages/servers/redis/package.json ./packages/servers/redis/

# 依存インストール
RUN pnpm install --frozen-lockfile

# ソースコードコピー
COPY . .

# APIアプリビルド
RUN pnpm turbo run build --filter=socket

WORKDIR /app/apps/socket

# 本番起動コマンド
CMD ["node", "dist/apps/socket/src/index.js"]