import { z } from 'zod';

import { parseMessageSchema, stringifyMessageSchema } from './serializer.js';

export const sendSingleSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: stringifyMessageSchema,
});

export const receiveSingleSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: parseMessageSchema,
});

export const sendMultipleSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(stringifyMessageSchema),
});

export const receiveMultipleSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(parseMessageSchema),
});
