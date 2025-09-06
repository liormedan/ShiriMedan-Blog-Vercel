"use client";
import Image from 'next/image';
import { useAuth } from '@/src/providers/FirebaseAuthProvider';

export default function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  return (
    <header className="border-b border-brand-primary/15 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-xl font-semibold text-brand-primary">Shiri Medan Blog</span>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-sky" />
            <span className="h-2 w-2 rounded-full bg-brand-lime" />
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            <span className="h-2 w-2 rounded-full bg-brand-magenta" />
          </span>
          <a href="/editor" className="text-brand-primary hover:underline">Editor</a>
          {!loading && (
            user ? (
              <>
                <span className="text-brand-primary">{user.displayName || user.email}</span>
                <button onClick={() => signOut()} className="hover:underline">Sign out</button>
              </>
            ) : (
              <button onClick={() => signInWithGoogle()} className="hover:underline">Sign in</button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
