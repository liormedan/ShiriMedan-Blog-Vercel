"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { reset, setStatus } from '@/src/store/slices/editorSlice';
import { useRouter } from 'next/navigation';

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const editor = useAppSelector((s) => s.editor);
  const status = editor.status;
  const router = useRouter();

  async function handlePublish() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editor.title, body: editor.body, slug: editor.slug })
      });
      const data = await res.json();
      dispatch(setStatus('published'));
      router.push(`/blog/${data.id || editor.slug}`);
    } catch (err) {
      console.error(err);
      alert('שגיאה בפרסום');
    }
  }

  return (
    <div className="toolbar">
      <button onClick={() => dispatch(setStatus('draft'))} aria-pressed={status === 'draft'}>
        שמור כטיוטה
      </button>
      <button onClick={() => dispatch(setStatus('in_review'))} aria-pressed={status === 'in_review'}>
        שלח לסקירה
      </button>
      <button onClick={handlePublish}>פרסם</button>
      <button onClick={() => dispatch(reset())}>איפוס</button>
      <span className="muted" style={{ marginInlineStart: 8 }}>
        מצב: <strong>{status}</strong>
      </span>
    </div>
  );
}

