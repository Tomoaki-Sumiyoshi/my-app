import { useEffect, useMemo } from 'react';
import { useInfiniteMessages } from './useInfiniteMessages';
import { useScrollControll } from './useScrollControll';

export const useMessages = () => {
  const { data } = useInfiniteMessages();

  const reversedItems = useMemo(() => {
    const joinedList = [...(data?.pages.flat() ?? [])].reverse();
    const joinedMap = new Map(joinedList.map((item) => [item.messageId, item]));

    return [...joinedMap.values()];
  }, [data?.pages]);

  useEffect(() => {
    useScrollControll().handleScrollMode();
  }, [reversedItems]);

  return { reversedItems };
};
