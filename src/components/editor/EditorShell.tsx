"use client";
import TitleInput from './TitleInput';
import Toolbar from './Toolbar';
import ContentEditor from './ContentEditor';
import Sidebar from './Sidebar';
import PreviewPane from './PreviewPane';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { hydrate, setLastSavedAt } from '@/src/store/slices/editorSlice';

export default function EditorShell() {
  const dispatch = useAppDispatch();
  const doc = useAppSelector((s) => s.editor);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('editor-draft');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          dispatch(hydrate(parsed));
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        const payload = { ...doc, lastSavedAt: Date.now() };
        localStorage.setItem('editor-draft', JSON.stringify(payload));
        dispatch(setLastSavedAt(payload.lastSavedAt));
      } catch {}
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [doc.slug, doc.title, doc.body, doc.status, doc.meta]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <section>
        <TitleInput />
        <Toolbar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ContentEditor />
          <PreviewPane />
        </div>
      </section>
      <aside>
        <Sidebar />
      </aside>
    </div>
  );
}
