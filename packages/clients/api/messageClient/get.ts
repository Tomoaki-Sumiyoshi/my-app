import {
  GetMessageQuery,
  MessageListSchema,
  Message,
} from '@packages/types/messages';

export const getMessageList = async (
  baseUrl: string,
  query: GetMessageQuery
): Promise<Message[]> => {
  const url = new URL(`${baseUrl}/messages`);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  const res = await fetch(url);
  const json = await res.json();
  const result = MessageListSchema.safeParse(json);

  return result.success ? result.data : [];
};
