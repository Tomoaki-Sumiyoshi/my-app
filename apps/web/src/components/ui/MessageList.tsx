'use client';

import { MessageBubble } from './MessageBubble';
import { useMessages } from '../../hooks/useMessages';
import { useMemo } from 'react';

export const MessageList = () => {
  const { data } = useMessages();

  const reversedItems = useMemo(() => {
    const joinedList = [...(data?.pages.flat() ?? [])].reverse();
    const joinedMap = new Map(joinedList.map((item) => [item.messageId, item]));

    return [...joinedMap.values()];
  }, [data?.pages]);

  return (
    <>
      {reversedItems.map((msg) => (
        <MessageBubble key={msg.messageId} message={msg} />
      ))}
    </>
  );
};
