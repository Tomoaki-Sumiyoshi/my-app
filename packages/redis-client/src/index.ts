import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

type CreateClientType = ReturnType<typeof createClient>;

let client: CreateClientType | null = null;

export const getRedisClient = (): CreateClientType => {
  if (!client) {
    client = createClient({ url: redisUrl });

    client.on('error', (err) => {
      console.error('[Redis Error]', err);
    });

    client.connect().catch((err) => {
      console.error('[Redis Connect Error]', err);
    });
  }

  return client;
};
