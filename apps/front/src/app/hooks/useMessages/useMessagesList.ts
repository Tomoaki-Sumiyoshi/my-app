import { mergeUniqueMessages } from '@app/utils/array';
import {
  getMessageList,
  postMessage,
} from '@packages/client/api/messageClient';
import { Message, PostMessageBody } from '@packages/types/messages';
import { useEffect, useState } from 'react';

export const useMessagesList = (baseUrl: string, userId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchInitialMessages = async () => {
    const res = await getMessageList(baseUrl, { limit: 30 });
    if (res.success) {
      setMessages((prev) => mergeUniqueMessages(prev, res.data));
    }
  };

  const getOldMessages = async () => {
    const res = await getMessageList(baseUrl, {
      limit: 30,
      ...(messages.length > 0 && { beforeAt: messages[0].createdAt }),
    });
    if (res.success) {
      setMessages((prev) => mergeUniqueMessages(res.data, prev));
    }
  };

  const sendNewMessage = async (text: string) => {
    const body: PostMessageBody = {
      message: text,
      ...(userId && { userId }),
    };
    const res = await postMessage(baseUrl, body);
    if (!res.success) return;
    setMessages((prev) => [...prev, res.data]);
    return res.data.userId;
  };

  useEffect(() => {
    fetchInitialMessages();
  }, [baseUrl]);

  return {
    messages,
    getOldMessages,
    sendNewMessage,
  };
};
