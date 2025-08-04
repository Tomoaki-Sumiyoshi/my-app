'use client';

import { MessageBubble } from './MessageBubble';
import { useMessages } from '../../hooks/useMessages';

export const MessageList = () => {
  const { reversedItems } = useMessages();

  return (
    <>
      {reversedItems.map((msg) => (
        <MessageBubble key={msg.messageId} message={msg} />
      ))}
    </>
  );
};
