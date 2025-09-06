import Link from 'next/link';

import { getPosts } from '@/src/lib/cms';
import type { Post } from '@/src/types/post';


export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <main className="container">
      <h1>הבלוג</h1>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {posts.map((post) => (
          <li key={post.slug} className="card" style={{ marginBottom: 12 }}>
            <h2 style={{ marginBottom: 4 }}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="muted">{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

