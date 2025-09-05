import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/src/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Shiri Medan Blog',
  description: 'Blog platform (MVP)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

