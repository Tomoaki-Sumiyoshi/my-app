import '@/app/globals.css';

import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Chat App',
  description: 'A simple modern chat app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
