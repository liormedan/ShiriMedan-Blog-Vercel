export interface Post {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_URL, { next: { revalidate: 60 } });
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`, { next: { revalidate: 60 } });
  return res.json();
}
