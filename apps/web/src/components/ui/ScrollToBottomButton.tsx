'use client';

import { useScrollControll } from '../../hooks/useScrollControll';
import { useScrollStore } from '../../store/scrollStore';

export const ScrollToBottomButton = () => {
  const { scrollPosition } = useScrollStore();
  if (scrollPosition === 'bottom') return null;

  const onClick = () => useScrollControll().forceScrollToBottom();

  return (
    <div className="flex justify-center">
      <button
        className="fixed bottom-20 bg-white text-black rounded-full p-2 shadow-lg animate-bounce"
        onClick={onClick}
      >
        ↓
      </button>
    </div>
  );
};
