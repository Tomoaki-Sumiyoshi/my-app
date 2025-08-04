import { useEffect, useRef } from 'react';

import { useScrollStore } from '../store/scrollStore';

export const useScrollPosition = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setScrollRef, setScrollPosition } = useScrollStore();
  useEffect(() => {
    const element = scrollRef?.current;

    if (!element) return;
    setScrollRef(scrollRef);

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const threshold = 10;
      if (scrollTop <= threshold) {
        setScrollPosition('top');
        return;
      }

      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        setScrollPosition('bottom');
        return;
      }

      setScrollPosition('middle');
    };
    handleScroll();

    element.addEventListener('scroll', handleScroll);

    return () => element.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  return {
    scrollRef,
  };
};
