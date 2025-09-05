"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setBody } from '@/src/store/slices/editorSlice';

export default function ContentEditor() {
  const dispatch = useAppDispatch();
  const body = useAppSelector((s) => s.editor.body);

  return (
    <div className="card">
      <label htmlFor="content" className="muted" style={{ display: 'block', marginBottom: 8 }}>
        גוף הפוסט (Markdown/טקסט)
      </label>
      <textarea
        id="content"
        value={body}
        onChange={(e) => dispatch(setBody(e.target.value))}
        placeholder="התחל לכתוב כאן..."
        style={{ width: '100%', minHeight: 320, padding: 8 }}
      />
    </div>
  );
}

