import { ReactNode } from 'react';

import { OnReachTopProvider } from './OnReachTopProvider';
import { SocketProvider } from './SocketProvider';

type Props = { children: ReactNode };
export const InitializeProvider = ({ children }: Props) => {
  return (
    <OnReachTopProvider>
      <SocketProvider>{children}</SocketProvider>
    </OnReachTopProvider>
  );
};
