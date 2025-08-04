import { create } from 'zustand';

type ConnectionState = {
  socketConnected: boolean;
  setSocketConnected: (socketConnected: boolean) => void;
};

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  socketConnected: false,
  setSocketConnected: (socketConnected) => set({ socketConnected }),
}));
