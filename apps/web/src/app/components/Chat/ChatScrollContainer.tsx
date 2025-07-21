'use client';
import React from 'react';

type Props = {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

const ChatScrollContainer: React.FC<Props> = ({ children, scrollRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
      {children}
    </div>
  );
};

export default ChatScrollContainer;
