import { useEffect, useMemo } from 'react';
import { useInfiniteMessages } from './useInfiniteMessages';
import { useScrollControll } from './useScrollControll';
import { useScrollStore } from '../store/scrollStore';

export const useMessages = () => {
  const { data } = useInfiniteMessages();

  const reversedItems = useMemo(() => {
    const joinedList = [...(data?.pages.flat() ?? [])].reverse();
    const joinedMap = new Map(joinedList.map((item) => [item.messageId, item]));

    return [...joinedMap.values()];
  }, [data?.pages]);

  useEffect(() => {
    const { scrollRef, setPrevScrollHeight } = useScrollStore.getState();

    useScrollControll().handleScrollMode();
    setPrevScrollHeight(scrollRef?.current?.scrollHeight ?? 0);
  }, [reversedItems]);

  return { reversedItems };
};
