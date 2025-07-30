import { getRedisClient } from '@portfolio-chat/redis-client';

import { getWebSocketServer } from './libs/web-socket-server.js';
import { isRateLimited } from './libs/rate-limit.js';

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

const redis = getRedisClient();
redis.subscribe('chat:new-userId', (message: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
});
