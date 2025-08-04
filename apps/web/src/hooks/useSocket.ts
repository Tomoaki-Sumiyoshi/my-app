import { useEffect } from 'react';

import { Message } from '@portfolio-chat/prisma-schema';
import { userInsertedSchema } from '@portfolio-chat/zod-schema';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { fetchMessages } from '../libs/api-messages';
import { useConnectionStore } from '../store/connectionStore';
import { useScrollStore } from '../store/scrollStore';
import { useUserStore } from '../store/userStore';
import { useInfiniteMessages } from './useInfiniteMessages';

export const useSocket = () => {
  const { setSocketConnected } = useConnectionStore();
  const { userId } = useUserStore.getState();
  const queryClient = useQueryClient();
  const { data } = useInfiniteMessages();

  useEffect(() => {
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_SOCKET_URL ?? 'ws://localhost:3002'
    );

    socket.onopen = () => setSocketConnected(true);
    socket.onclose = () => setSocketConnected(false);
    socket.onmessage = async (event) => {
      const parsed = userInsertedSchema.safeParse(JSON.parse(event.data));
      if (!parsed.success || userId === parsed.data.payload.userId) return;

      const { setScrollMode } = useScrollStore.getState();

      const newMessages = await fetchMessages({
        afterAt: data?.pages[0][0]?.createdAt,
      });
      setScrollMode('scrollBottom');
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

    return () => socket.close();
  }, [queryClient, setSocketConnected]);
};
