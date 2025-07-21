import { useEffect, useRef, useState } from 'react';

type ScrollPosition = 'top' | 'middle' | 'bottom';

export const useScroll = (
  scrollRef: React.RefObject<HTMLDivElement | null>
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>();
  const preScrollPositionRef = useRef<ScrollPosition>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const preScrollPosition = preScrollPositionRef.current;
    const handleScroll = () => {
      if (element.scrollTop === 0 && preScrollPosition !== 'top') {
        setScrollPosition('top');
      } else if (
        element.scrollHeight - element.scrollTop < 10 &&
        preScrollPosition !== 'bottom'
      ) {
        setScrollPosition('bottom');
      } else if (preScrollPosition !== 'middle') {
        setScrollPosition('middle');
      }

      if (scrollPosition) preScrollPositionRef.current = scrollPosition;
    };

    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  const scrollTo = (scrollTop: number, enableAnimation: boolean = false) => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollTo({
      top: scrollTop,
      behavior: enableAnimation ? 'smooth' : 'auto',
    });
  };

  return {
    scrollPosition,
    setScrollPosition,
    scrollTo,
  };
};
