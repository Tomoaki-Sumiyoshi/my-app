import { getRedisClient } from '@portfolio-chat/redis-client';
import { UserInserted } from '@portfolio-chat/zod-schema';

import { isRateLimited } from './libs/rate-limit.js';
import { getWebSocketServer } from './libs/web-socket-server.js';

const wss = getWebSocketServer();

wss.on('connection', (ws, req) => {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    '';
  if (!isRateLimited(ip)) return;

  ws.send(JSON.stringify({ error: 'Rate limit exceeded' }));
  ws.close();
});

const subscriber = getRedisClient('subscriber');
subscriber.subscribe('chat:new-userId', (userId: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      const sendMessage: UserInserted = {
        type: 'USER_INSERTED',
        payload: { userId },
        createdAt: new Date().toISOString(),
      };
      client.send(JSON.stringify(sendMessage));
    }
  });
});
