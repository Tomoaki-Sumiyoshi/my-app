import { Message } from '@portfolio-chat/prisma-schema';
import {
  makeMessageQueryString,
  makeReceiveMultipleApiResponse,
  makeReceiveSingleApiResponse,
  MessageBody,
  MessageQuery,
} from '@portfolio-chat/zod-schema';
import { useUserStore } from '../store/userStore';
import toast from 'react-hot-toast';

export const fetchMessages = async (
  query: MessageQuery
): Promise<Message[]> => {
  const url = `/api/chat/messages?${makeMessageQueryString(query)}`;
  const res = await fetch(url);
  const result = makeReceiveMultipleApiResponse(await res.json());

  return result.success ? result.data : [];
};

export const postMessage = async (
  content: string
): Promise<Message | undefined> => {
  const { userId, setUserId } = useUserStore.getState();
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
  if (!result.success) {
    toast.error(`エラー: ${result.error.message}`);
    return;
  }
  if (result.data.userId !== userId) {
    setUserId(result.data.userId);
  }

  return result.data;
};
