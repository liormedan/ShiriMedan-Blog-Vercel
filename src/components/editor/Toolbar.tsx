"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { reset, setStatus } from '@/src/store/slices/editorSlice';

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.editor.status);

  return (
    <div className="toolbar">
      <button onClick={() => dispatch(setStatus('draft'))} aria-pressed={status === 'draft'}>
        שמור כטיוטה
      </button>
      <button onClick={() => dispatch(setStatus('in_review'))} aria-pressed={status === 'in_review'}>
        שלח לסקירה
      </button>
      <button onClick={() => alert('פרסום – יוגדר בהמשך (CMS/Webhook)')}>פרסם</button>
      <button onClick={() => dispatch(reset())}>איפוס</button>
      <span className="muted" style={{ marginInlineStart: 8 }}>
        מצב: <strong>{status}</strong>
      </span>
    </div>
  );
}

