import { z } from 'zod';
import { MessageSchemaRow } from './base';

export const GetMessageServerQuerySchema = z.object({
  beforeAt: z.coerce.date().optional(),
  afterAt: z.coerce.date().optional(),
  limit: z.coerce.number().optional(),
});

export const GetMessageResponseSchema = z.array(MessageSchemaRow);

export type GetMessageServerQuery = z.infer<typeof GetMessageServerQuerySchema>;
export type GetMessageClientQuery = {
  beforeAt?: string;
  afterAt?: string;
  limit?: number;
};

export type GetMessageResponse = z.infer<typeof GetMessageResponseSchema>;
