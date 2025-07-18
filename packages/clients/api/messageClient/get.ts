import {
  GetMessageClientQuery,
  MessageListSchema,
  Message,
} from '@packages/types/messages';
import { ApiResponseSchema, ApiResponse } from '@packages/types/response';

export const getMessageList = async (
  baseUrl: string,
  query?: GetMessageClientQuery
): Promise<ApiResponse<Message[]>> => {
  const url = new URL(`${baseUrl}/messages`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  const res = await fetch(url);
  const json = await res.json();
  const result = ApiResponseSchema(MessageListSchema).safeParse(json);

  if (result.success) return result.data;

  return { success: false, error: { message: 'Invalid response structure' } };
};
