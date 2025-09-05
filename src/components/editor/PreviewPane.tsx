"use client";
import Card from '@/src/components/ui/Card';
import { useAppSelector } from '@/src/store/hooks';

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// פענוח Markdown בסיסי בלבד (MVP) – כותרות, הדגשה, קוד, שורות
function basicMarkdownToHtml(md: string) {
  let html = escapeHtml(md);
  // code blocks ```
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre class="bg-gray-100 p-3 rounded"><code>${code}</code></pre>`);
  // headings
  html = html.replace(/^######\s+(.*)$/gm, '<h6 class="text-sm font-semibold my-1">$1</h6>');
  html = html.replace(/^#####\s+(.*)$/gm, '<h5 class="text-base font-semibold my-1">$1</h5>');
  html = html.replace(/^####\s+(.*)$/gm, '<h4 class="text-lg font-semibold my-1">$1</h4>');
  html = html.replace(/^###\s+(.*)$/gm, '<h3 class="text-xl font-bold my-2">$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>');
  // bold/italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // lists (very basic)
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul class="list-disc pr-5 space-y-1">${m}</ul>`);
  // paragraphs
  html = html.replace(/^(?!<h\d|<ul|<pre|<li|<p|<\/|\s*$)(.+)$/gm, '<p class="my-2">$1</p>');
  // line breaks
  html = html.replace(/\n/g, '\n');
  return html;
}

export default function PreviewPane() {
  const { title, body } = useAppSelector((s) => s.editor);
  const html = basicMarkdownToHtml(body);

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

