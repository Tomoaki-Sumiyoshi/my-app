import { useScrollStore } from '../store/scrollStore';

export const useScrollControll = () => {
  const {
    scrollPosition,
    scrollMode,
    scrollRef,
    prevScrollHeight,
    setPrevScrollHeight,
  } = useScrollStore.getState();

  const keepScrollPosition = (diff = prevScrollHeight, isSmooth = false) => {
    const element = scrollRef?.current;
    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight - diff,
      behavior: isSmooth ? 'smooth' : 'auto',
    });
    setPrevScrollHeight(element.scrollHeight);
  };

  const forceScrollToBottom = (isSmooth = false) => {
    keepScrollPosition(0, isSmooth);
  };

  const scrollToBottom = (isSmooth = false) => {
    if (scrollPosition !== 'bottom') return;

    forceScrollToBottom(isSmooth);
  };

  const handleScrollMode = () => {
    if (scrollMode === 'forceScrollBottom') {
      forceScrollToBottom();
      return;
    }

    if (scrollMode == 'keepScrollPosition') {
      keepScrollPosition();
      return;
    }

    if (scrollMode === 'scrollBottom') {
      scrollToBottom();
      return;
    }
  };

  return {
    keepScrollPosition,
    forceScrollToBottom,
    scrollToBottom,
    handleScrollMode,
  };
};
