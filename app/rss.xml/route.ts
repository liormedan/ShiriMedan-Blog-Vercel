import { NextResponse } from 'next/server';
import { getPosts } from '@/src/lib/posts';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const posts = await getPosts();

  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/blog/${post.id}</link>
        <guid>${baseUrl}/blog/${post.id}</guid>
        <description><![CDATA[${post.body}]]></description>
      </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog RSS Feed</title>
    <link>${baseUrl}</link>
    <description>Latest posts</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
