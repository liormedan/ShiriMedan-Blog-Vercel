"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { reset, setStatus } from '@/src/store/slices/editorSlice';
import { createPost } from '@/src/lib/firestore';
import { useAuth } from '@/src/providers/FirebaseAuthProvider';

function fromNow(ts?: number) {
  if (!ts) return '—';
  const diff = Math.max(0, Date.now() - ts);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `לפני ${sec} שניות`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `לפני ${min} דק׳`;
  const hr = Math.floor(min / 60);
  return `לפני ${hr} שעות`;
}

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const status = useAppSelector((s) => s.editor.status);
  const lastSavedAt = useAppSelector((s) => s.editor.lastSavedAt);
  const title = useAppSelector((s) => s.editor.title);
  const body = useAppSelector((s) => s.editor.body);

  async function handlePublish() {
    try {
      await createPost({
        title,
        body,
        authorUid: user?.uid ?? null,
        authorName: user?.displayName ?? null
      });
      alert('הפוסט פורסם בהצלחה');
      dispatch(reset());
    } catch (err) {
      console.error(err);
      alert('אירעה שגיאה בפרסום הפוסט');
    }
  }

  return (
    <div className="toolbar">
      <button className="rounded border px-2 py-1" onClick={() => dispatch(setStatus('draft'))} aria-pressed={status === 'draft'}>
        שמור כטיוטה
      </button>
      <button className="rounded border px-2 py-1" onClick={() => dispatch(setStatus('in_review'))} aria-pressed={status === 'in_review'}>
        שלח לסקירה
      </button>
      <button className="rounded bg-brand-primary text-white px-3 py-1" onClick={handlePublish}>
        פרסם
      </button>
      <button className="rounded border px-2 py-1" onClick={() => dispatch(reset())}>איפוס</button>
      <span className="muted ms-2">
        מצב: <strong>{status}</strong> · נשמר {fromNow(lastSavedAt)}
      </span>
    </div>
  );
}

