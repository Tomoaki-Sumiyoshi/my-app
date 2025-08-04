import { z } from 'zod';

export const userInsertedSchema = z.object({
  type: z.literal('USER_INSERTED'),
  payload: z.object({
    userId: z.string(),
  }),
  createdAt: z.string(),
});

export type UserInserted = z.infer<typeof userInsertedSchema>;
