import './globals.css';

import { Providers } from './providers';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
