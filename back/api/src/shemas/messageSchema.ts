import { z } from 'zod';

export const getMessageQuerySchema = z.object({
  before_at: z.string().optional(),
  after_at: z.string().optional(),
  limit: z.string().optional(),
});
export type GetMessageQuery = z.infer<typeof getMessageQuerySchema>;

export const createMessageSchema = z.object({
  user_id: z.string().uuidv4().optional(),
  message: z.string(),
});
export type CreateMessageInput = z.infer<typeof createMessageSchema>;

export const MessageResponseSchema = z.object({
  message_id: z.string().uuidv4(),
  user_id: z.string().uuidv4(),
  message: z.string(),
  is_ai: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});
export type MessageResponse = z.infer<typeof MessageResponseSchema>;

export const MessageListResponseSchema = z.array(MessageResponseSchema);
export type MessageListResponse = z.infer<typeof MessageListResponseSchema>;
