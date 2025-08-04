'use client';

import { useCallback } from 'react';

import { useScrollStore } from '../../store/scrollStore';

export const ScrollToBottomButton = () => {
  const { scrollPosition, scrollToBottom } = useScrollStore();
  if (scrollPosition === 'bottom') return null;

  const onClick = () => scrollToBottom();

  return (
    <button
      className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-bounce"
      onClick={onClick}
    >
      ↓
    </button>
  );
};
