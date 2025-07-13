import {
  PostMessageBody,
  MessageSchema,
  Message,
} from '@packages/types/messages';

export const postMessage = async (
  baseUrl: string,
  body: PostMessageBody
): Promise<Message | undefined> => {
  const res = await fetch(`${baseUrl}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  const result = MessageSchema.safeParse(json);
  if (!result.success) return;

  return result.data;
};
