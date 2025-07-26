import { z } from 'zod';
import { MessageModel } from 'zod-schema-prisma';

export const stringifyMessageSchema = z.object({
  messageId: z.string(),
  userId: z.string(),
  content: z.string(),
  isAi: z.boolean().transform((value) => `{${value}}`),
  createdAt: z.date().transform((value) => value.toISOString()),
});

export const parseMessageSchema = z.object({
  messageId: z.string(),
  userId: z.string(),
  content: z.string(),
  isAi: z.string().transform((value) => value === 'true'),
  createdAt: z.string().transform((value) => new Date(value)),
});

export type Message = z.infer<typeof MessageModel>;
export type StringifyMessage = {
  messageId: string;
  userId: string;
  content: string;
  isAi: string;
  createdAt: string;
};
