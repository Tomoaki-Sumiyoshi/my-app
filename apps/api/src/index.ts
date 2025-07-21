import express from 'express';
import cors from 'cors';
import { Express, Request, Response } from 'express';
import messageRouter from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3001;
const host: string = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors());
app.use('/messages', messageRouter);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`${port}called`);
});
