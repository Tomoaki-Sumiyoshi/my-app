import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useMessageStore } from '../store/messageStore';

export const useSocket = () => {
  const queryClient = useQueryClient();
  const { setSocketConnected } = useMessageStore();

  useEffect(() => {
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_SOCKET_URL ?? 'ws://localhost:3002'
    );

    socket.onopen = () => setSocketConnected(true);
    socket.onclose = () => setSocketConnected(false);
    socket.onmessage = () =>
      queryClient.invalidateQueries({ queryKey: ['messages'] });

    return () => socket.close();
  }, [queryClient, setSocketConnected]);
};
