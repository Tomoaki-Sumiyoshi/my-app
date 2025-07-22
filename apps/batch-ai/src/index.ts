import { redisClient } from '@packages/servers/redis';
import { shouldTriggerByLength } from './utils/shouldTriggerByLength';
import { callOpenAI, makeMessageParams } from './openAi';
import { insertMessage } from './controllers/insert';
import { publish } from './utils/publish';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const url = process.env.REDIS_URL || 'redis://localhost:6379';

const main = async () => {
  let messageList: string[] = [];
  const redis = await redisClient(url);
  await redis.subscribe('chat:new-message', async (message) => {
    messageList.push(message);
    if (!shouldTriggerByLength(messageList)) return;

    const response = await callOpenAI(makeMessageParams(messageList));
    if (response.trim().length === 0) return;

    const userId = await insertMessage(response);
    await publish(userId);
    messageList = [];
  });
};

main();
