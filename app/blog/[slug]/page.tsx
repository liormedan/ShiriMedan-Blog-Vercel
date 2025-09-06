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

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return (
    <main className="container">
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(post.body)) }} />
    </main>
  );
}

