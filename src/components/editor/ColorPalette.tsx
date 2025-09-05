"use client";
import { palette } from '@/src/theme/palette';
import { useState } from 'react';

export default function ColorPalette() {
  const [copied, setCopied] = useState<string | null>(null);
  const items = [
    { key: 'primary', name: 'Primary', color: palette.primary },
    { key: 'text', name: 'Text', color: palette.text },
    { key: 'sky', name: 'Sky', color: palette.sky },
    { key: 'lime', name: 'Lime', color: palette.lime },
    { key: 'orange', name: 'Orange', color: palette.orange },
    { key: 'magenta', name: 'Magenta', color: palette.magenta },
    { key: 'bg', name: 'Background', color: palette.bg }
  ];

  const onCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  return (
    <div>
      <h4 className="text-sm font-semibold mb-2">פלטת צבעים מהלוגו</h4>
      <div className="grid grid-cols-3 gap-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onCopy(it.color)}
            className="flex flex-col items-center justify-center rounded-md border border-gray-200 p-2 text-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-brand-sky"
            title={`העתק ${it.color}`}
          >
            <span className="h-8 w-full rounded" style={{ backgroundColor: it.color }} />
            <span className="mt-1 text-[10px] text-gray-600">{it.name}</span>
            <span className="text-[10px] text-gray-500">{copied === it.color ? 'הועתק!' : it.color}</span>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-500 mt-2">לחיצה מעתיקה את ההקס לקליפבורד</p>
    </div>
  );
}

