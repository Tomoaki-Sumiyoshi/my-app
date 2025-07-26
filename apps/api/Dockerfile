# -----------------
# 開発・ビルド用
# -----------------
FROM node:18-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@10.13.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/prisma-client/package.json ./packages/prisma-client/
COPY packages/zod-schema-error/package.json ./packages/zod-schema-error/
COPY packages/zod-schema-prisma/package.json ./packages/zod-schema-prisma/
COPY packages/zod-schema-request/package.json ./packages/zod-schema-request/
COPY packages/zod-schema-response/package.json ./packages/zod-schema-response/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm turbo run build --filter=api


# -----------------
# 実行用ステージ
# -----------------
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./

CMD ["node", "dist/index.js"]