'use client';

import { ReactNode, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const queryClientRef = useRef<QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Toaster position="top-right" />
      {children}
    </QueryClientProvider>
  );
}
