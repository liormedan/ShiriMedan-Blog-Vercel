import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

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

