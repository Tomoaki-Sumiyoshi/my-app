'use client';

import { ReactNode, useEffect } from 'react';

import { useInfiniteMessages } from '../../hooks/useInfiniteMessages';
import { useScrollStore } from '../../store/scrollStore';

type Props = { children: ReactNode };
export const OnReachTopProvider = ({ children }: Props) => {
  const { scrollPosition } = useScrollStore();
  const { setScrollMode } = useScrollStore.getState();
  const { fetchNextPage } = useInfiniteMessages();
  useEffect(() => {
    if (scrollPosition !== 'top') return;
    (async () => {
      setScrollMode('keepScrollPosition');
      await fetchNextPage();
    })();
  }, [scrollPosition]);

  return <>{children}</>;
};
