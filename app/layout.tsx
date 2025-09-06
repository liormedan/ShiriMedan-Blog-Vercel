import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/src/providers/ReduxProvider';
import { FirebaseAuthProvider } from '@/src/providers/FirebaseAuthProvider';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Shiri Medan Blog',
  description: 'Blog platform (MVP)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-brand-bg text-brand-text">
        <Providers>
          <FirebaseAuthProvider>
            <Header />
            <div className="container py-6">
              {children}
            </div>
            <Footer />
          </FirebaseAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
