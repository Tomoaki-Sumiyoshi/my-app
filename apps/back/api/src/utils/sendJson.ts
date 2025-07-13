import { Response } from 'express';
import { ZodSchema } from 'zod';

export const sendJson = <T>(
  res: Response,
  schema: ZodSchema,
  data: unknown,
  status: number = 200
) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return res.status(500).json({ error: 'Invalid response structure' });
  }
  return res.status(status).json(parsed.data);
};
