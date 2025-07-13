import { z } from 'zod';
import { MessageSchema } from './base';

export const PutMessageParamsSchema = z.object({
  messageId: z.string(),
});

export const PutMessageBodySchema = z.object({
  message: z.string(),
});

export const PutMessageResponseSchema = MessageSchema;
