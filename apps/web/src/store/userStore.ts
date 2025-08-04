import { RefObject, useRef } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  userId: string;
  setUserId: (userId: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'message-store', // localStorage に保存されるキー名
      partialize: (state) => ({ userId: state.userId }), // 保存対象を userId のみに限定
    }
  )
);
