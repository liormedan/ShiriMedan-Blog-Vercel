"use client";
import { useState } from 'react';
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
  const [slugError, setSlugError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  async function checkSlugUnique(s: string) {
    if (!s) {
      setSlugError('הסלאג לא יכול להיות ריק');
      return;
    }
    try {
      const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(s)}`);
      const data = await res.json();
      if (!data.unique) setSlugError('הסלאג כבר קיים');
      else setSlugError(null);
    } catch {
      setSlugError('שגיאה בבדיקת הסלאג');
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={title}
        onChange={(e) => {
          const v = e.target.value;
          dispatch(setTitle(v));
          if (!slug && !slugEdited) {
            const newSlug = slugify(v);
            dispatch(setSlug(newSlug));
            checkSlugUnique(newSlug);
          }
        }}
        placeholder="כותרת הפוסט"
        aria-label="כותרת הפוסט"
        style={{ width: '100%', padding: 8, fontSize: 24 }}
      />
      <input
        value={slug}
        onChange={(e) => {
          setSlugEdited(true);
          const v = slugify(e.target.value);
          dispatch(setSlug(v));
          if (!v) setSlugError('הסלאג לא יכול להיות ריק');
          else setSlugError(null);
        }}
        onBlur={() => checkSlugUnique(slug)}
        placeholder="סלאג"
        aria-label="סלאג"
        style={{ width: '100%', padding: 8, fontSize: 18, marginTop: 8 }}
      />
      {slugError && (
        <div className="muted" style={{ color: 'red', marginTop: 6 }}>
          {slugError}
        </div>
      )}
    </div>
  );
}

