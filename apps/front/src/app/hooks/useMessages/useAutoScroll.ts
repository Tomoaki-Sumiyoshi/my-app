import { ScrollPosition } from '@app/types/ScrollPosition';
import { Message } from '@packages/types/messages';
import { useEffect } from 'react';

export const useAutoScroll = (
  scrollRef: React.RefObject<HTMLDivElement | null>,
  messages: Message[],
  userId: string | null,
  scrollPosition: ScrollPosition
) => {
  useEffect(() => {
    if (messages.length === 0) return;
    const element = scrollRef.current;
    if (!element) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.userId !== userId && scrollPosition !== 'bottom') return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, userId, scrollPosition]);
};
