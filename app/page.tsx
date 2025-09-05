import { Button } from '@/src/components/ui/Button';

export default function HomePage() {
  return (
    <main className="container">
      <h1>ברוכים הבאים לבלוג</h1>
      <p className="muted">שלד ראשוני – Next.js + Redux + נתיב עורך.</p>
      <ul>
        <li>
          <Button asChild>
            <a href="/editor">עבור לעורך</a>
          </Button>
        </li>
      </ul>
    </main>
  );
}

