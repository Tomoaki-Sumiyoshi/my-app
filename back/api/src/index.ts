import express from 'express';
import { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = Number(process.env.API_PORT) || 4000;
const host: string = process.env.API_HOST || 'localhost';

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(port, host, () => {
  console.log(`${port}called`);
});
