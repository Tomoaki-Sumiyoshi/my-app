import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MessageState = {
  isAtBottom: boolean;
  setIsAtBottom: (isAtBottom: boolean) => void;
  socketConnected: boolean;
  setSocketConnected: (socketConnected: boolean) => void;
  userId: string;
  setUserId: (userId: string) => void;
};

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      isAtBottom: true,
      setIsAtBottom: (isAtBottom) => set({ isAtBottom }),
      socketConnected: false,
      setSocketConnected: (socketConnected) => set({ socketConnected }),
      userId: '',
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'message-store', // localStorage に保存されるキー名
      partialize: (state) => ({ userId: state.userId }), // 保存対象を userId のみに限定
    }
  )
);
