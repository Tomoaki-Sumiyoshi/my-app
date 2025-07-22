import express from 'express';
import cors from 'cors';
import { Express, Request, Response } from 'express';
import messageRouter from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorHandler';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app: Express = express();
const port: number = Number(process.env.PORT) || 3001;
const host: string = process.env.HOST || 'localhost';
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:3000'];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // PostmanなどのCORS対策（非ブラウザ）
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
  })
);
app.use('/messages', messageRouter);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`${port}called`);
});
