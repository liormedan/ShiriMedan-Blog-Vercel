// Minimal Markdown -> HTML converter for preview purposes.
// Supports headings, paragraphs, lists, bold/italic, code (inline/fenced), and links.

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function markdownToHtml(md: string): string {
  if (!md) return '';

  // Normalize line endings
  let text = md.replace(/\r\n?/g, '\n');

  // Escape all HTML first to avoid injection; subsequent markup inserts trusted tags.
  text = escapeHtml(text);

  // Fenced code blocks ```
  text = text.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre><code>${code.trim()}</code></pre>`; // already escaped globally
  });

  // Inline code `code`
  text = text.replace(/`([^`]+?)`/g, (_, code) => `<code>${code}</code>`);

  // Bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic *text*
  text = text.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');

  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (m, label, url) => {
    // Basic URL safety: allow only http(s) and root-relative links
    const safe = /^(https?:\/\/|\/)/i.test(url) ? url : '#';
    return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  // Headings
  text = text.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Unordered lists - group consecutive - items
  text = text.replace(/(?:^|\n)(-\s+.+(?:\n-\s+.+)*)/g, (match) => {
    const items = match
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^-\s+/, ''))
      .map((item) => `<li>${item}</li>`) // items already parsed for inline markdown above
      .join('');
    return `\n<ul>${items}</ul>`;
  });

  // Paragraphs: wrap lines separated by blank lines
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<h\d|^<ul>|^<pre>|^<blockquote>|^<p>|^<table>|^<code>/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .filter(Boolean);

  return blocks.join('\n');
}

export default markdownToHtml;
