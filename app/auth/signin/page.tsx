"use client";
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <h1 className="text-2xl font-semibold">התחברות</h1>
      <button
        onClick={() => signIn('google')}
        className="rounded bg-brand-primary px-4 py-2 text-white"
      >
        התחבר עם Google
      </button>
    </div>
  );
}
