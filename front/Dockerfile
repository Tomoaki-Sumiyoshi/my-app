# 外部イメージをbaseステージとして扱う
FROM node AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# baseステージをもとにrunnerステージを開始
FROM base AS runner

WORKDIR /app

# public と .next/static は nextjs の standalone を使う場合に含まれないため、コピーする必要がある
# https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
# builderから必要なファイルだけコピーする
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/.next/standalone ./

# `next start` の代わりに `node server.js` を使用
# https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
CMD ["node", "server.js"]