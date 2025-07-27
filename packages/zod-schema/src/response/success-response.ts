import { z } from 'zod';

import { parseMessageSchema, stringifyMessageSchema } from './serializer.js';

export const sendSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.union([z.array(stringifyMessageSchema), stringifyMessageSchema]),
});

export const receiveSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.union([z.array(parseMessageSchema), parseMessageSchema]),
});
