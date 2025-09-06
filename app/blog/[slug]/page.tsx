
import { getPost } from '@/src/lib/cms';
import type { Post } from '@/src/types/post';
import { notFound } from 'next/navigation';


function markdownToHtml(md: string) {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br />');
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {

  const post: Post | undefined = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="container">
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
    </main>
  );
}

