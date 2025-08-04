'use client';

import { ReactNode } from 'react';

import { useSocket } from '../../hooks/useSocket';

type Props = { children: ReactNode };
export const SocketProvider = ({ children }: Props) => {
  useSocket();
  return <>{children}</>;
};
