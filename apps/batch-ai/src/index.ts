import { prisma } from '@portfolio-chat/prisma-schema';
import { getRedisClient } from '@portfolio-chat/redis-client';

import { callOpenAI, makeMessageParams } from './open-ai/index.js';

const MAX_MESSAGES = 10;

const main = async () => {
  let messageList: string[] = [];
  const redis = getRedisClient();
  await redis.subscribe('chat:new-message', async (message) => {
    messageList.push(message);
    if (Math.random() > messageList.length / MAX_MESSAGES) return;

    const response = await callOpenAI(makeMessageParams(messageList));
    if (response.trim().length === 0) return;

    const { userId } = await prisma.message.create({
      data: {
        content: response,
      },
    });

    redis.publish('chat:new-userId', userId);
    messageList = [];
  });
};

main();
