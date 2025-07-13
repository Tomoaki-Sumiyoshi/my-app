import { z } from 'zod';
import { MessageSchemaRow } from './base';

export const GetMessageQuerySchema = z.object({
  beforeAt: z.coerce.date().optional(),
  afterAt: z.coerce.date().optional(),
  limit: z.coerce.number().optional(),
});

export const GetMessageResponseSchema = z.array(MessageSchemaRow);

export type GetMessageQuery = z.infer<typeof GetMessageQuerySchema>;
export type GetMessageResponse = z.infer<typeof GetMessageResponseSchema>;
