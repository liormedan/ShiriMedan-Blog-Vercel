
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window as unknown as Window;
const DOMPurify = createDOMPurify(window);

interface Post {
  id: number;
  title: string;
  body: string;
}


import { getPost } from '@/src/lib/cms';
import type { Post } from '@/src/types/post';
import { notFound } from 'next/navigation';


export default async function BlogPostPage({ params }: { params: { slug: string } }) {

  const post: Post | undefined = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="container">
      <h1>{post.title}</h1>

      <article dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(post.body)) }} />

    </main>
  );
}

