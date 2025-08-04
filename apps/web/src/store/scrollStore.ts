import { RefObject } from 'react';
import { create } from 'zustand';

type ScrollPosition = 'top' | 'middle' | 'bottom';
type ScrollMode = 'keepScrollPosition' | 'scrollBottom' | 'forceScrollBottom';

type ScrollState = {
  scrollPosition: ScrollPosition;
  setScrollPosition: (position: ScrollPosition) => void;
  scrollRef: RefObject<HTMLDivElement | null> | null;
  setScrollRef: (ref: RefObject<HTMLDivElement | null>) => void;
  prevScrollHeight: number;
  setPrevScrollHeight: (height: number) => void;
  scrollMode: ScrollMode;
  setScrollMode: (mode: ScrollMode) => void;
};

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollRef: null,
  scrollPosition: 'bottom',
  setScrollPosition: (position: ScrollPosition) =>
    set({ scrollPosition: position }),
  setScrollRef: (ref) => set({ scrollRef: ref }),
  prevScrollHeight: 0,
  setPrevScrollHeight: (height) => set({ prevScrollHeight: height }),
  scrollMode: 'forceScrollBottom',
  setScrollMode: (mode) => set({ scrollMode: mode }),
}));
