import * as z from "zod"

export const MessageModel = z.object({
  messageId: z.string(),
  userId: z.string(),
  message: z.string(),
  isAi: z.boolean(),
  createdAt: z.date(),
})
