import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { redisClient } from '@packages/servers/redis';

// const redis = createClient();
// await redis.connect();
// await redis.subscribe('chat:new', (message) => {
//   const parsed = JSON.parse(message);
//   broadcast({ type: 'message:new', payload: parsed });
// });

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
});

server.listen(3002, () => {
  console.log('WebSocket server on ws://localhost:3002');
});

const url = process.env.REDIS_URL || 'redis://localhost:6379';

(async () => {
  const redis = await redisClient(url);
  await redis.subscribe('chat:new-message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });
})();
