
import type { Metadata } from 'next';


interface Post {
  id: number;
  title: string;
  body: string;
}



export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  const description = post.body.slice(0, 160);
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [
        {
          url: `https://via.placeholder.com/1200x630.png?text=${encodeURIComponent(post.title)}`,
        },
      ],
    },
  };
}

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

      <article dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(post.body)) }} />

    </main>
  );
}

