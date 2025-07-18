import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { useMessagesList } from './useMessagesList';
import { useScroll } from './useScroll';
import { useUserId } from './useUserId';
import { useMessagesChangeCallback } from './useMessagesChangeCallback';

export const useMessages = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

  const [userId, setUserId] = useUserId();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    scrollPosition,
    preserveTopOffset,
    scrollAfterInitialize,
    scrollAfterInfinitScroll,
    scrollAfterSend,
  } = useScroll(scrollRef);

  const {
    messages,
    fetchInitialMessages,
    getOldMessages,
    sendNewMessage: rawSendNewMessage,
  } = useMessagesList(baseUrl, userId);

  const setCallbackRef = useMessagesChangeCallback(messages);

  useEffect(() => {
    setCallbackRef(scrollAfterInitialize);
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    if (scrollPosition === 'top') {
      preserveTopOffset();
      setCallbackRef(scrollAfterInfinitScroll);
      getOldMessages();
    }
  }, [scrollPosition]);

  const sendNewMessage = async (text: string) => {
    setCallbackRef(scrollAfterSend);
    const newUserId = await rawSendNewMessage(text);
    if (newUserId) setUserId(newUserId);
  };

  return {
    messages,
    userId,
    sendNewMessage,
    scrollRef,
  };
};
