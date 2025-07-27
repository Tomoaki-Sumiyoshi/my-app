import { Message } from '@portfolio-chat/prisma-client';

export const mergeUniqueMessages = (
  head: Message[] | Message,
  tail: Message[] | Message
) => {
  const joinedMessages = [
    ...(Array.isArray(head) ? head : [head]),
    ...(Array.isArray(tail) ? tail : [tail]),
  ];
  const joinedMap = new Map(
    joinedMessages.map((message) => [message.messageId, message])
  );

  return [...joinedMap.values()];
};
