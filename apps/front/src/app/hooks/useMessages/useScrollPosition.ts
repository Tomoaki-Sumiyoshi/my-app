import { ScrollPosition } from '@app/types/ScrollPosition';
import { useState, useEffect } from 'react';

export const useScrollPosition = (
  scrollRef: React.RefObject<HTMLDivElement | null>
) => {
  const [scrollPosition, setScrollPosition] =
    useState<ScrollPosition>('middle');

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      if (element.scrollTop === 0) {
        setScrollPosition('top');
      } else if (element.scrollHeight - element.scrollTop < 10) {
        setScrollPosition('bottom');
      } else {
        setScrollPosition('middle');
      }
    };

    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  return scrollPosition;
};
