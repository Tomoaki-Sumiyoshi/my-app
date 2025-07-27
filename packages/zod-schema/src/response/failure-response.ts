import { z } from 'zod';
import { errorSchema } from '../error/index.js';

export const failureResponseSchema = z.object({
  success: z.literal(false),
  error: errorSchema,
});
