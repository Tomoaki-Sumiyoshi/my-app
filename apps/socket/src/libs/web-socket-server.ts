import { WebSocketServer, Server } from 'ws';

const port: number = Number(process.env.SOCKET_PORT) || 3002;
const host: string = process.env.SOCKET_HOST || 'localhost';
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:3000'];

let wss: Server | null = null;

export const getWebSocketServer = () => {
  if (!wss) {
    wss = new WebSocketServer({
      port,
      host,
      verifyClient: (info, done) => {
        const origin = info.origin;
        if (!origin || !allowedOrigins.includes(origin)) {
          return done(false, 403, 'Fobidden');
        }
        done(true);
      },
    });
  }
  return wss;
};
