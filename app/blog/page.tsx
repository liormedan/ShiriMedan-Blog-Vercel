import Link from 'next/link';
import { getPosts, type Post } from '@/src/lib/posts';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container">
      <h1>הבלוג</h1>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="card" style={{ marginBottom: 12 }}>
            <h2 style={{ marginBottom: 4 }}>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="muted">{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

