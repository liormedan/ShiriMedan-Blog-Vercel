export type EditorStatus = 'draft' | 'in_review' | 'scheduled' | 'published';

export interface EditorMeta {
  excerpt?: string;
  tags: string[];
  categories: string[];
  coverImage?: string;
}

export interface EditorDoc {
  id?: string;
  slug: string;
  title: string;
  body: string; // MVP: body כטקסט/Markdown
  status: EditorStatus;
  meta: EditorMeta;
}

