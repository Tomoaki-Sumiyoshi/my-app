import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { redisClient } from '@packages/servers/redis';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const server = createServer();
const wss = new WebSocketServer({ server });
const port: number = Number(process.env.SOCKET_PORT) || 3002;
const host: string = process.env.SOCKET_HOST || 'localhost';

wss.on('connection', (ws) => {
  console.log('Client connected');
});

server.listen(port, host, () => {
  console.log('WebSocket server on ws://localhost:3002');
});

const url = process.env.REDIS_URL || 'redis://localhost:6379';

(async () => {
  const redis = await redisClient(url);
  await redis.subscribe('chat:new-userId', (message: string) => {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });
})();
