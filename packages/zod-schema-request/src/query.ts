import { z } from 'zod';

export type MessageQuery = {
  beforeAt?: Date;
  afterAt?: Date;
  limit?: number;
};

export const makeMessageQueryString = (query: MessageQuery): string => {
  const { beforeAt, afterAt, limit } = query;

  const queryString = new URLSearchParams({
    ...(beforeAt && { beforeAt: query.beforeAt?.toISOString() }),
    ...(afterAt && { afterAt: query.afterAt?.toISOString() }),
    ...(limit && { limit: query.limit?.toString() }),
  }).toString();

  return queryString;
};

export const messageQuerySchema = z.object({
  beforeAt: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : value)),
  afterAt: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : value)),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : value)),
});
