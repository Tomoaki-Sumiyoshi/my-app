'use client';
import React from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  onReachTop: () => void;
};

const ChatScrollContainer: React.FC<Props> = ({ children, onReachTop }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    if (containerRef.current.scrollTop === 0) {
      onReachTop(); // 親に通知
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [children]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export default ChatScrollContainer;
