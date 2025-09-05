export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-semibold mb-2">ברוכים הבאים לבלוג</h1>
      <p className="muted mb-4">שלד ראשוני – Next.js + Redux + Tailwind + נתיב עורך.</p>
      <a href="/editor" className="inline-flex items-center gap-1 rounded-md bg-brand-primary text-white px-3 py-2 text-sm hover:opacity-90">
        עבור לעורך
      </a>
    </main>
  );
}
