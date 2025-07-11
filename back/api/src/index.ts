import express from 'express';
import { Express, Request, Response } from 'express';
import messageRouter from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();
const port: number = Number(process.env.API_PORT) || 4000;
const host: string = process.env.API_HOST || 'localhost';

app.use(express.json());
app.use('/message', messageRouter);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`${port}called`);
});
