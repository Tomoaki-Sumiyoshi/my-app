import { useRef, useEffect } from 'react';
import { useAutoScroll } from './useAutoScroll';
import { useMessagesList } from './useMessagesList';
import { useScrollPosition } from './useScrollPosition';
import { useScrollToBottom } from './useScrollToBottom';
import { useUserId } from './useUserId';

export const useMessages = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

  const [userId, setUserId] = useUserId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(scrollRef);

  const {
    messages,
    getOldMessages,
    sendNewMessage: rawSendNewMessage,
  } = useMessagesList(baseUrl, userId);

  const scrollToBottom = useScrollToBottom(scrollRef);

  useAutoScroll(scrollRef, messages, userId, scrollPosition);

  useEffect(() => {
    if (scrollPosition === 'top') getOldMessages();
  }, [scrollPosition]);

  const sendNewMessage = async (text: string) => {
    const newUserId = await rawSendNewMessage(text);
    if (newUserId) setUserId(newUserId);
  };

  return {
    messages,
    userId,
    sendNewMessage,
    getOldMessages,
    scrollRef,
    scrollPosition,
    scrollToBottom,
  };
};
