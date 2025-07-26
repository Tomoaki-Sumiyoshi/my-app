import * as z from "zod"

export const MessageModel = z.object({
  messageId: z.string(),
  userId: z.string(),
  content: z.string(),
  isAi: z.boolean(),
  createdAt: z.date(),
})
