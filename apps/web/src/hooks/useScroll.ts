import { useCallback } from 'react';

import { useMessageStore } from '../store/messageStore';

export const useScroll = () => {
  const { setIsAtBottom } = useMessageStore();

  return useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const isAtBottm =
        element.scrollHeight - element.scrollTop - element.clientHeight < 20;
      setIsAtBottom(isAtBottm);
    },
    [setIsAtBottom]
  );
};
