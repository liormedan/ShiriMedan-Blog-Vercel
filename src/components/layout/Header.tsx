"use client";
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-brand-primary/15 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-3">
          {/* אם public/logo.png קיים, יוצג; אחרת יהיה טקסט */}
          <Image src="/logo.png" alt="שירי מדן" width={140} height={40} className="h-10 w-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <span className="text-xl font-semibold text-brand-primary">הבלוג של שירי</span>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-sky" />
            <span className="h-2 w-2 rounded-full bg-brand-lime" />
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            <span className="h-2 w-2 rounded-full bg-brand-magenta" />
          </span>
          <a href="/editor" className="text-brand-primary hover:underline">עורך</a>
          <a href="#" className="hover:underline">אודות</a>
          {session ? (
            <>
              <span>{session.user?.name}</span>
              <button onClick={() => signOut()} className="hover:underline">יציאה</button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="hover:underline">התחברות</button>
          )}
        </nav>
      </div>
    </header>
  );
}
