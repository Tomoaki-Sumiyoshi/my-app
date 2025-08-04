'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { useScrollPosition } from '../../hooks/useScrollPosition';

type Props = {
  children: ReactNode;
};

export const MessageScrollContainer = ({ children }: Props) => {
  const { scrollRef } = useScrollPosition();

  return (
    <div
      className="flex-1 overflow-y-auto px2 py-4 bg-blue-100"
      ref={scrollRef}
    >
      {children}
    </div>
  );
};
