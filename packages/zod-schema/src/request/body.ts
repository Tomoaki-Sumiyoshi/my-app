import { z } from 'zod';

import { errorMap, ErrorType } from '../error/index.js';
import { FailureResponse } from '../response/index.js';

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const messageBodySchema = z.object({
  userId: z
    .string()
    .regex(uuidV4Regex, { message: 'UUIDv4形式で入力してください' })
    .optional(),
  content: z
    .string()
    .max(50, { message: '50文字以内で入力してください' })
    .refine((value) => value.trim().length > 0, {
      message: '空白のみのメッセージは無効です',
    }),
});

export type MessageBody = z.infer<typeof messageBodySchema>;
export type SafeMessageBody =
  | {
      success: true;
      data: MessageBody;
    }
  | FailureResponse;

export const getSafeMessageBody = (body: unknown): SafeMessageBody => {
  const parsedBody = messageBodySchema.safeParse(body);
  if (parsedBody.success) return { success: true, data: parsedBody.data };

  const issue = parsedBody.error.issues.find(
    ({ code }) => code !== 'invalid_type'
  );
  const error: ErrorType = issue
    ? { ...errorMap.INVALID_INPUT, message: issue.message }
    : errorMap.INVALID_TYPE;
  return { success: false, error };
};
