import {
  PostMessageBody,
  MessageSchema,
  Message,
} from '@packages/types/messages';
import { ApiResponseSchema, ApiResponse } from '@packages/types/response';

export const postMessage = async (
  baseUrl: string,
  body: PostMessageBody
): Promise<ApiResponse<Message>> => {
  const res = await fetch(`${baseUrl}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  const result = ApiResponseSchema(MessageSchema).safeParse(json);

  if (result.success) return result.data;

  return { success: false, error: { message: 'Invalid response structure' } };
};
