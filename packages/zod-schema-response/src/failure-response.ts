import { z } from 'zod';
import { errorSchema } from 'zod-schema-error';

export const failureResponseSchema = z.object({
  success: z.literal(false),
  error: errorSchema,
});
