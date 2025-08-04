import { Message } from '@portfolio-chat/prisma-schema';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

export const prependMessagesPage = (newMessages: Message[]) => {
  return () => {
    const queryClient = useQueryClient();
    queryClient.setQueryData(
      ['messages'],
      (oldData: InfiniteData<Message[]>) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          ...(newMessages.length > 0 && {
            pages: [newMessages, ...oldData.pages],
          }),
          pageParams: oldData.pageParams,
        };
      }
    );
  };
};
