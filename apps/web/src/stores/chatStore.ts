import { create } from 'zustand';

import { Message } from '@portfolio-chat/prisma-client';
import {
  makeMessageQueryString,
  makeReceiveApiResponse,
  MessageBody,
} from '@portfolio-chat/zod-schema';

import { mergeUniqueMessages } from '../lib/array';

type ChatStore = {
  userId: string;
  messageList: Message[];
  isSocketConnected: boolean;
  isSending: boolean;
  setUserId: (id: string) => void;
  fetchOlder: () => Promise<void>;
  fetchNew: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  setSocketConnected: (flag: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  userId: '',
  messageList: [],
  isSocketConnected: false,
  isSending: false,
  setUserId: (id) => set({ userId: id }),
  fetchOlder: async () => {
    const older = get().messageList[0]?.createdAt ?? new Date();
    const query = makeMessageQueryString({
      beforeAt: older,
      limit: 10,
    });
    const res = await fetch(`/api/messages?${query}`);
    const result = makeReceiveApiResponse(res);
    if (!result.success) return;

    set(({ messageList }) => ({
      messageList: mergeUniqueMessages(result.data, messageList),
    }));
  },
  fetchNew: async () => {
    const currentMessageList = get().messageList;
    const newer =
      currentMessageList[currentMessageList.length - 1]?.createdAt ??
      new Date();
    const query = makeMessageQueryString({
      afterAt: newer,
      limit: 10,
    });
    const res = await fetch(`/api/messages?${query}`);
    const result = makeReceiveApiResponse(res);
    if (!result.success) return;

    set(({ messageList }) => ({
      messageList: mergeUniqueMessages(messageList, result.data),
    }));
  },
  sendMessage: async (text) => {
    set({ isSending: true });
    const userId = get().userId;
    const body: MessageBody = {
      content: text,
      ...(userId !== '' && { userId }),
    };

    const res = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = makeReceiveApiResponse(res);
    if (!result.success) return;

    const data = result.data;
    const message = Array.isArray(data) ? data[0] : data;
    if (userId !== message.userId) {
      set({ userId: message.userId });
    }

    set(({ messageList }) => ({
      messageList: mergeUniqueMessages(messageList, message),
      isSending: false,
    }));
  },
  setSocketConnected: (flag) => set({ isSocketConnected: flag }),
}));
