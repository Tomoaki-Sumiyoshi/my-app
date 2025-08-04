'use client';

import { ReactNode, useEffect } from 'react';

import { useMessages } from '../../hooks/useMessages';
import { useScrollStore } from '../../store/scrollStore';

type Props = { children: ReactNode };
export const OnReachTopProvider = ({ children }: Props) => {
  const { scrollPosition } = useScrollStore();
  const { scrollTo } = useScrollStore.getState();
  const { fetchNextPage } = useMessages();
  useEffect(() => {
    if (scrollPosition !== 'top') return;
    (async () => {
      await fetchNextPage();
      scrollTo();
    })();
  }, [scrollPosition]);

  return <>{children}</>;
};
