import { z } from 'zod';

import { parseMessageSchema, stringifyMessageSchema } from './serializer';

export const sendSuccessListResponseSchema = z.object({
  success: z.literal(true),
  isArray: z.literal(true),
  data: z.array(stringifyMessageSchema),
});

export const sendSuccessSingleResponseSchema = z.object({
  success: z.literal(true),
  isArray: z.literal(false),
  data: stringifyMessageSchema,
});

export const sendSuccessResponseSchema = z.discriminatedUnion('isArray', [
  sendSuccessListResponseSchema,
  sendSuccessSingleResponseSchema,
]);

export const receiveSuccessListResponseSchema = z.object({
  success: z.literal(true),
  isArray: z.literal(true),
  data: z.array(parseMessageSchema),
});

export const receiveSuccessSingleResponseSchema = z.object({
  success: z.literal(true),
  isArray: z.literal(false),
  data: parseMessageSchema,
});

export const receiveSuccessResponseSchema = z.discriminatedUnion('isArray', [
  receiveSuccessListResponseSchema,
  receiveSuccessSingleResponseSchema,
]);
