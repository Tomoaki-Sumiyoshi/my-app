'use client';

import { useScrollControll } from '../../hooks/useScrollControll';
import { useScrollStore } from '../../store/scrollStore';

export const ScrollToBottomButton = () => {
  const { scrollPosition } = useScrollStore();
  if (scrollPosition === 'bottom') return null;

  const onClick = () => useScrollControll().forceScrollToBottom();

  return (
    <button
      className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-bounce"
      onClick={onClick}
    >
      ↓
    </button>
  );
};
