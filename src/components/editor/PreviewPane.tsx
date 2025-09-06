"use client";
import { Card } from '@/src/components/ui/card';
import { useAppSelector } from '@/src/store/hooks';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function PreviewPane() {
  const { title, body } = useAppSelector((s) => s.editor);
  const html = DOMPurify.sanitize(marked.parse(body));

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold">תצוגה מקדימה</h3>
        <span className="text-xs text-gray-500">Markdown בסיסי</span>
      </div>
      <article className="prose prose-sm rtl:prose-h1:text-right rtl:prose-p:text-right max-w-none" dir="rtl">
        {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Card>
  );
}

