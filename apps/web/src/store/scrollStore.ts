import { RefObject } from 'react';
import { create } from 'zustand';

type ScrollPosition = 'top' | 'middle' | 'bottom';

type ScrollState = {
  scrollPosition: ScrollPosition;
  setScrollPosition: (position: ScrollPosition) => void;
  scrollRef: RefObject<HTMLDivElement | null> | null;
  setScrollRef: (ref: RefObject<HTMLDivElement | null>) => void;
  prevScrollHeight: number;
  scrollTo: (diff?: number) => void;
  scrollToBottom: () => void;
};

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollRef: null,
  scrollPosition: 'bottom',
  setScrollPosition: (position: ScrollPosition) =>
    set({ scrollPosition: position }),
  setScrollRef: (ref) => set({ scrollRef: ref }),
  prevScrollHeight: 0,
  scrollTo: (diff = get().prevScrollHeight) => {
    const element = get().scrollRef?.current;
    if (!element) return;

    requestAnimationFrame(() => {
      console.log(diff);
      element.scrollTo({
        top: element.scrollHeight - diff,
        behavior: 'auto',
      });
      set({ prevScrollHeight: element.scrollHeight });
    });
  },
  scrollToBottom: () => get().scrollTo(0),
}));
