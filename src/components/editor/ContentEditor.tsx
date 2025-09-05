"use client";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setBody } from '@/src/store/slices/editorSlice';

export default function ContentEditor() {
  const dispatch = useAppDispatch();
  const body = useAppSelector((s) => s.editor.body);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <label htmlFor="content" className="block text-sm text-gray-600 mb-1">
        גוף הפוסט (Markdown/טקסט)
      </label>
      <textarea
        id="content"
        value={body}
        onChange={(e) => dispatch(setBody(e.target.value))}
        placeholder="התחל לכתוב כאן..."
        className="w-full min-h-80 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}
