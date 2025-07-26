import { z } from 'zod';

import { errorCodeSchema } from './error-code';

export const errorSchema = z.object({
  code: errorCodeSchema,
  status: z.number(),
  message: z.string(),
});

export type ErrorType = z.infer<typeof errorSchema>;
