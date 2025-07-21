import { useRef, useEffect, useLayoutEffect, useState, useId } from 'react';
import { useMessagesList } from './useMessagesList';
import { useScroll } from './useScroll';
import { useUserId } from './useUserId';
import { Message } from '@packages/types/messages';
import { useWebSockt } from './useWebSocket';

export const useMessages = () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

  const [userId, setUserId] = useUserId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const prevMessagesRef = useRef<Message[]>([]);

  const { scrollPosition, setScrollPosition, scrollTo } = useScroll(scrollRef);

  const {
    messages,
    getOldMessages,
    getNewMessages,
    sendNewMessage: rawSendNewMessage,
  } = useMessagesList(apiUrl, userId);

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'ws://localhost:3002';
  const { isConnected } = useWebSockt({
    url: socketUrl,
    onMessage(data) {
      if (data !== userId) {
        getNewMessages();
      }
    },
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || messages.length === 0) {
      return;
    }
    const prevMessages = prevMessagesRef.current;
    const prevScrollHeight = prevScrollHeightRef.current;
    const diff = element.scrollHeight - prevScrollHeight;

    if (
      prevMessages.length === 0 ||
      messages[0].messageId !== prevMessages[0].messageId
    ) {
      scrollTo(element.scrollTop + diff);
    } else if (
      scrollPosition === 'bottom' &&
      messages[messages.length - 1].messageId !==
        prevMessages[prevMessages.length - 1].messageId
    ) {
      scrollTo(element.scrollHeight, true);
    }
    prevMessagesRef.current = messages;
    prevScrollHeightRef.current = element.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (scrollPosition === 'top') {
      getOldMessages();
    }
  }, [scrollPosition]);

  const sendNewMessage = async (text: string) => {
    setScrollPosition('bottom');
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
