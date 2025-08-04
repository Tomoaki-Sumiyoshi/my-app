import { toast } from 'react-hot-toast';

import { Message } from '@portfolio-chat/prisma-client';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { postMessage } from '../libs/api-messages';
import { useScrollStore } from '../store/scrollStore';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postMessage,
    onSuccess: (newMessage) => {
      if (!newMessage) return;
      const { scrollToBottom } = useScrollStore.getState();

      queryClient.setQueryData(
        ['messages'],
        (oldData: InfiniteData<Message[]>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...(newMessage && {
              pages: [[newMessage], ...oldData.pages],
            }),
            pageParams: oldData.pageParams,
          };
        }
      );
      scrollToBottom();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : '不明なエラー';
      toast.error(`エラー: ${message}`);
    },
  });
};
