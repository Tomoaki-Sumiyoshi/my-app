export const useScrollToBottom = (
  scrollRef: React.RefObject<HTMLDivElement | null>
) => {
  const scrollToBottom = () => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  };
  return scrollToBottom;
};
