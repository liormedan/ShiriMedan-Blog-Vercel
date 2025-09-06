import { Post } from '@/src/types/post';

// Simulated CMS data
const posts: Post[] = [
  {
    slug: 'welcome',
    title: 'Welcome',
    content:
      '### שלום\nזהו הפוסט הראשון בבלוג שנשמר ב־CMS הפנימי.\nאפשר לכתוב כאן **Markdown** ולראותו מוצג כראוי.',
  },
  {
    slug: 'next-steps',
    title: 'הצעדים הבאים',
    content:
      '## תוכניות לעתיד\nבפוסט זה נסביר לאן ממשיכים מכאן ואיזה *פיצ׳רים* נוסיף בעתיד.',
  },
];

export async function getPosts(): Promise<Post[]> {
  // במערכת אמיתית כאן תהיה קריאה ל־API של ה־CMS
  return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug);
}

