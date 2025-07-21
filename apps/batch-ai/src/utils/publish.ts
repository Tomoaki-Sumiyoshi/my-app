import { redisClient } from '@packages/servers/redis';

export const publish = async (userId: string) => {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';

  const redis = await redisClient(url);
  await redis.publish('chat:new-userId', userId);
};
