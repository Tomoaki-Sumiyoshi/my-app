import { z } from 'zod';

export const errorCodeSchema = z.enum([
  'REQUIRED',
  'INVALID_TYPE',
  'TOO_LONG',
  'NOT_FOUND',
  'CONFLICT',
  'FORBIDDEN',
  'UNAUTHORIZED',
  'INVALID_INPUT',
  'DB_ERROR',
  'UNKNOWN',
]);

export type ErrorCode = z.infer<typeof errorCodeSchema>;
