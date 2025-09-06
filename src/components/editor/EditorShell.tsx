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

  // Check for storage permissions on mount
  useEffect(() => {
    let cancelled = false;
    async function ensureStoragePermission() {
      try {
        if (typeof navigator !== 'undefined' && navigator.storage?.persist) {
          const persisted = await navigator.storage.persisted();
          if (!persisted) {
            const granted = await navigator.storage.persist();
            if (!granted && !cancelled) {
              alert(
                'אי אפשר להבטיח שמירת טיוטות לאורך זמן; שקלו להעתיק את התוכן ידנית.'
              );
            }
          }
        }
      } catch {
        if (!cancelled) {
          alert(
            'בדיקת הרשאות האחסון נכשלה; שקלו להעתיק את התוכן ידנית.'
          );
        }
      }
    }
    ensureStoragePermission();
    return () => {
      cancelled = true;
    };
  }, []);

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
      (async () => {
        try {
          const payload = { ...doc, lastSavedAt: Date.now() };
          const serialized = JSON.stringify(payload);
          const size = new Blob([serialized]).size;
          const max = 5 * 1024 * 1024; // ~5MB
          if (size > max) {
            alert('הטיוטה גדולה מדי ולא ניתן לשמור אותה בדפדפן.');
            return;
          }
          if (
            typeof navigator !== 'undefined' &&
            navigator.storage?.estimate
          ) {
            const { quota, usage } = await navigator.storage.estimate();
            if (
              typeof quota === 'number' &&
              typeof usage === 'number' &&
              usage + size > quota
            ) {
              alert(
                'אין מספיק מקום אחסון בדפדפן; שמרו עותק מקומי של התוכן.'
              );
              return;
            }
          }
          localStorage.setItem('editor-draft', serialized);
          dispatch(setLastSavedAt(payload.lastSavedAt));
        } catch (err) {
          console.error('failed to save draft', err);
          alert('שגיאה בשמירת הטיוטה; שקלו להעתיק את התוכן ידנית.');
        }
      })();
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
