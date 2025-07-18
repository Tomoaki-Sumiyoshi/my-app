import { Message } from '@packages/types/messages';
import { useEffect, useRef } from 'react';

export const useMessagesChangeCallback = (messages: Message[]) => {
  const callbackRef = useRef<() => void>(null);

  const setCallbackRef = (callbackFunction: () => void) => {
    callbackRef.current = callbackFunction;
  };

  useEffect(() => {
    if (!callbackRef.current) return;

    callbackRef.current();

    callbackRef.current = null;
  }, [messages]);

  return setCallbackRef;
};
