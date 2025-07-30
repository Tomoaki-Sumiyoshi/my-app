import { toast } from 'react-hot-toast';

import {
  makeReceiveSingleApiResponse,
  MessageBody,
} from '@portfolio-chat/zod-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMessageStore } from '../store/messageStore';

const mutationFn = async (content: string) => {
  const { userId, setUserId } = useMessageStore.getState();
  const body: MessageBody = {
    content,
    ...(userId !== '' && { userId }),
  };
  const res = await fetch('/api/chat/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = makeReceiveSingleApiResponse(await res.json());
  if (!result.success) throw new Error(result.error.message);
  if (result.data.userId !== userId) setUserId(result.data.userId);
  return result.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : '不明なエラー';
      toast.error(`エラー: ${message}`);
    },
  });
};
