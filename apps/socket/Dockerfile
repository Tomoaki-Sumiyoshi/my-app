# -------- base --------
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@8.15.4
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/socket ./apps/socket
COPY packages ./packages

# -------- install db only (prisma generate) --------
FROM base AS prisma-generate
# dbパッケージの依存関係のみを先にインストール
RUN pnpm install --filter=@portfolio-chat/prisma-schema...
# prisma generate
RUN pnpm run generate
RUN pnpm prune --prod

# -------- install all dependencies --------
FROM prisma-generate AS prod-install
RUN pnpm install --prod --frozen-lockfile --filter=socket...

# -------- install all dependencies --------
FROM prisma-generate AS install-all
RUN pnpm install --frozen-lockfile --filter=socket...

# -------- build --------
FROM install-all AS build
RUN pnpm run build --filter=socket
RUN pnpm prune --prod

# -------- production --------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# 必要なファイルだけをコピー
COPY --from=prod-install /app/node_modules ./node_modules
COPY --from=build /app/apps/socket/dist ./apps/socket/dist
COPY --from=build /app/apps/socket/package.json ./apps/socket/package.json
COPY --from=prod-install /app/apps/socket/node_modules ./apps/socket/node_modules
COPY --from=build /app/packages/redis-client/dist ./packages/redis-client/dist
COPY --from=build /app/packages/redis-client/package.json ./packages/redis-client/package.json
COPY --from=prod-install /app/packages/redis-client/node_modules ./packages/redis-client/node_modules
COPY --from=build /app/packages/zod-schema/dist ./packages/zod-schema/dist
COPY --from=build /app/packages/zod-schema/package.json ./packages/zod-schema/package.json
COPY --from=prod-install /app/packages/zod-schema/node_modules ./packages/zod-schema/node_modules

CMD ["node", "apps/socket/dist/index.js"]