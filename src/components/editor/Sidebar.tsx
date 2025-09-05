"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addTag, removeTag, addCategory, removeCategory, setExcerpt } from '@/src/store/slices/editorSlice';
import { useState } from 'react';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const meta = useAppSelector((s) => s.editor.meta);
  const slug = useAppSelector((s) => s.editor.slug);
  const [tagInput, setTagInput] = useState('');
  const [catInput, setCatInput] = useState('');

  return (
    <div className="card" aria-label="מאפייני פוסט">
      <nav style={{ marginBottom: 12 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>
            <a href="/blog">כל הפוסטים</a>
          </li>
          {slug && (
            <li>
              <a href={`/blog/${slug}`}>הצג פוסט</a>
            </li>
          )}
        </ul>
      </nav>
      <h3 style={{ marginTop: 0 }}>מאפיינים</h3>

      <section style={{ marginBottom: 12 }}>
        <label className="muted">תקציר</label>
        <textarea
          value={meta.excerpt || ''}
          onChange={(e) => dispatch(setExcerpt(e.target.value))}
          style={{ width: '100%', minHeight: 80, padding: 6 }}
        />
      </section>

      <section style={{ marginBottom: 12 }}>
        <label className="muted">תגיות</label>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} style={{ flex: 1, padding: 6 }} />
          <button onClick={() => { if (tagInput.trim()) { dispatch(addTag(tagInput.trim())); setTagInput(''); } }}>הוסף</button>
        </div>
        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {meta.tags.map((t) => (
            <span key={t} className="card" style={{ padding: '2px 6px' }}>
              {t} <button onClick={() => dispatch(removeTag(t))} aria-label={`הסר תגית ${t}`}>×</button>
            </span>
          ))}
        </div>
      </section>

      <section>
        <label className="muted">קטגוריות</label>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <input value={catInput} onChange={(e) => setCatInput(e.target.value)} style={{ flex: 1, padding: 6 }} />
          <button onClick={() => { if (catInput.trim()) { dispatch(addCategory(catInput.trim())); setCatInput(''); } }}>הוסף</button>
        </div>
        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {meta.categories.map((c) => (
            <span key={c} className="card" style={{ padding: '2px 6px' }}>
              {c} <button onClick={() => dispatch(removeCategory(c))} aria-label={`הסר קטגוריה ${c}`}>×</button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

