import { createClient } from 'redis';

export const redisClient = async (url: string) => {
  const redisClient = createClient({ url });
  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
  await redisClient.connect();

  return redisClient;
};
