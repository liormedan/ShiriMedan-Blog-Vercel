"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setTitle, setSlug } from '@/src/store/slices/editorSlice';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"\u05d0-\u05ea]/g, (c) => c) // שמירה על עברית; סלאג יוגדר ידנית אם צריך
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-');
}

export default function TitleInput() {
  const dispatch = useAppDispatch();
  const { title, slug } = useAppSelector((s) => s.editor);

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={title}
        onChange={(e) => {
          const v = e.target.value;
          dispatch(setTitle(v));
          if (!slug) dispatch(setSlug(slugify(v)));
        }}
        placeholder="כותרת הפוסט"
        aria-label="כותרת הפוסט"
        style={{ width: '100%', padding: 8, fontSize: 24 }}
      />
      <div className="muted" style={{ marginTop: 6 }}>
        סלאג: <code>{slug || '(ייווצר אוטומטית מהכותרת)'}</code>
      </div>
    </div>
  );
}

