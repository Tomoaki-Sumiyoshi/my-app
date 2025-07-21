import { redisClient } from '@packages/servers/redis';
import { PostMessageResponseSchema } from '@packages/types/messages';

export const publish = async (data: unknown) => {
  const parsed = PostMessageResponseSchema.safeParse(data);
  const url = process.env.REDIS_URL || 'redis://localhost:6379';

  if (parsed.success) {
    const redis = await redisClient(url);
    await Promise.all([
      redis.publish('chat:new-userId', parsed.data.userId),
      redis.publish('chat:new-message', parsed.data.message),
    ]);
  }
};
