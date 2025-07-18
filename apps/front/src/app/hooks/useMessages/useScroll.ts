import { useEffect, useRef, useState } from 'react';

type ScrollPosition = 'top' | 'middle' | 'bottom';

export const useScroll = (
  scrollRef: React.RefObject<HTMLDivElement | null>
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>();
  const preScrollPositionRef = useRef<ScrollPosition>(null);
  const prevOffsetRef = useRef<number>(null);

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

  const scrollAfterInitialize = () => {
    const element = scrollRef.current;
    if (!element) return;
    scrollTo(element.scrollHeight);
  };

  const scrollAfterSend = () => {
    const element = scrollRef.current;
    if (!element) return;
    scrollTo(element.scrollHeight, true);
  };

  const scrollAfterInfinitScroll = () => {
    const element = scrollRef.current;
    const preOffset = prevOffsetRef.current;
    if (!element || !preOffset) return;
    const diff = element.scrollHeight - preOffset;

    scrollTo(diff);
  };

  const preserveTopOffset = () => {
    const element = scrollRef.current;
    if (!element) return;
    prevOffsetRef.current = element.scrollHeight;
  };

  return {
    scrollPosition,
    preserveTopOffset,
    scrollAfterInitialize,
    scrollAfterInfinitScroll,
    scrollAfterSend,
  };
};
