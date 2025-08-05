import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

type CreateClientType = ReturnType<typeof createClient>;

type RedisRole = 'publisher' | 'subscriber';

const clients: Record<RedisRole, CreateClientType | null> = {
  publisher: null,
  subscriber: null,
};

export const getRedisClient = (
  role: RedisRole = 'publisher'
): CreateClientType => {
  if (!clients[role]) {
    const isTsl = redisUrl.startsWith('rediss://');
    const client = createClient({
      url: redisUrl,
      ...(isTsl && {
        socket: {
          tls: true,
        },
      }),
    });

    client.on('error', (err) => {
      console.error(`[Redis ${role} Error]`, err);
    });

    client.connect().catch((err) => {
      console.error(`[Redis ${role} Connect Error]`, err);
    });

    clients[role] = client;
  }

  return clients[role]!;
};
