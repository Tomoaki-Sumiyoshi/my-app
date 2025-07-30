import { ReactNode, useEffect, useRef } from 'react';

import { useMessageStore } from '../store/messageStore';

type Props = {
  children?: ReactNode;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

export const MessageScrollArea = ({ children, onScroll }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isAtBottom } = useMessageStore();

  useEffect(() => {
    if (isAtBottom) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [children, isAtBottom]);

  return (
    <div
      className="flex-1 overflow-y-auto px2 py-4 bg-gray-100"
      onScroll={onScroll}
    >
      {children}
      <div ref={bottomRef} />
    </div>
  );
};
