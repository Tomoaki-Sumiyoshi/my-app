import { Message } from '@packages/types/messages';

export const mergeUniqueMessages = (head: Message[], tail: Message[]) => {
  const joinedMessages = [...head, ...tail];
  const joinedMap = new Map(
    joinedMessages.map((message) => [message.messageId, message])
  );

  return [...joinedMap.values()];
};
