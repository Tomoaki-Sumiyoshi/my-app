import { z } from 'zod';
import { keyToCamelCase } from '@packages/utils/keyToCamelCase';

export const MessageSchemaRow = z
  .object({
    message_id: z.string(),
    user_id: z.string(),
    message: z.string(),
    is_ai: z.boolean(),
    created_at: z.date().transform((d) => d.toISOString()),
    updated_at: z.date().transform((d) => d.toISOString()),
  })
  .transform((val) => keyToCamelCase(val));

export const MessageSchema = z.object({
  messageId: z.string(),
  userId: z.string(),
  message: z.string(),
  isAi: z.coerce.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const MessageListSchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
