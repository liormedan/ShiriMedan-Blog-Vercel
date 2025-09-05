"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addTag, removeTag, addCategory, removeCategory, setExcerpt } from '@/src/store/slices/editorSlice';
import { useState } from 'react';
import ColorPalette from './ColorPalette';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const meta = useAppSelector((s) => s.editor.meta);
  const [tagInput, setTagInput] = useState('');
  const [catInput, setCatInput] = useState('');

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm" aria-label="מאפייני פוסט">
      <h3 className="text-base font-semibold mb-2">מאפיינים</h3>

      <section className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">תקציר</label>
        <textarea
          value={meta.excerpt || ''}
          onChange={(e) => dispatch(setExcerpt(e.target.value))}
          className="w-full min-h-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </section>

      <section className="mb-3">
        <label className="block text-sm text-gray-600">תגיות</label>
        <div className="flex gap-2 mt-1">
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
          <button className="rounded border px-2" onClick={() => { if (tagInput.trim()) { dispatch(addTag(tagInput.trim())); setTagInput(''); } }}>הוסף</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded border px-2 py-1 text-sm">
              {t}
              <button className="text-gray-500" onClick={() => dispatch(removeTag(t))} aria-label={`הסר תגית ${t}`}>×</button>
            </span>
          ))}
        </div>
      </section>

      <section className="mb-3">
        <label className="block text-sm text-gray-600">קטגוריות</label>
        <div className="flex gap-2 mt-1">
          <input value={catInput} onChange={(e) => setCatInput(e.target.value)} className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
          <button className="rounded border px-2" onClick={() => { if (catInput.trim()) { dispatch(addCategory(catInput.trim())); setCatInput(''); } }}>הוסף</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {meta.categories.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 rounded border px-2 py-1 text-sm">
              {c}
              <button className="text-gray-500" onClick={() => dispatch(removeCategory(c))} aria-label={`הסר קטגוריה ${c}`}>×</button>
            </span>
          ))}
        </div>
      </section>

      <section>
        <ColorPalette />
      </section>
    </div>
  );
}
