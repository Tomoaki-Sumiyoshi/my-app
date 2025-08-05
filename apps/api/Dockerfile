# -------- base --------
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@8.15.4
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages ./packages

# -------- install db only (prisma generate) --------
FROM base AS build
# dbパッケージの依存関係のみを先にインストール
RUN pnpm install --filter=@portfolio-chat/prisma-schema...
# prisma generate
RUN pnpm run generate
RUN pnpm install --frozen-lockfile --filter=api...
RUN pnpm run build --filter=api...
RUN pnpm prune --prod

# -------- production --------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# 必要なファイルだけをコピー
COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules

COPY --from=build /app/packages/prisma-schema/dist ./packages/prisma-schema/dist
COPY --from=build /app/packages/prisma-schema/package.json ./packages/prisma-schema/package.json
COPY --from=build /app/packages/prisma-schema/node_modules ./packages/prisma-schema/node_modules

COPY --from=build /app/packages/redis-client/dist ./packages/redis-client/dist
COPY --from=build /app/packages/redis-client/package.json ./packages/redis-client/package.json
COPY --from=build /app/packages/redis-client/node_modules ./packages/redis-client/node_modules

COPY --from=build /app/packages/zod-schema/dist ./packages/zod-schema/dist
COPY --from=build /app/packages/zod-schema/package.json ./packages/zod-schema/package.json
COPY --from=build /app/packages/zod-schema/node_modules ./packages/zod-schema/node_modules

CMD ["node", "apps/api/dist/index.js"]