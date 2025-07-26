import { z } from 'zod';

export type MessageBody = {
  userId?: string;
  content: string;
};

export const messageBodySchema = z.object({
  userId: z.string().optional(),
  content: z.string(),
});
