import cors from 'cors';
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = Number(process.env.API_PORT) || 3001;
const host: string = process.env.API_HOST || 'localhost';
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:3000'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
  })
);
// app.use('/messages', messageRouter);
// app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`${port}called`);
});
