import { z } from 'zod';
import { MessageSchemaRow } from './base';

export const PostMessageBodySchema = z.object({
  userId: z.string().optional(),
  message: z.string(),
});

export const PostMessageResponseSchema = MessageSchemaRow;

export type PostMessageBody = z.infer<typeof PostMessageBodySchema>;
export type PostMessageResponse = z.infer<typeof PostMessageResponseSchema>;
