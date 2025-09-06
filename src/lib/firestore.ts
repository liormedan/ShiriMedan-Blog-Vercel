import { db } from '@/src/lib/firebase';
import { collection, addDoc, getDocs, doc, getDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export type Post = {
  id?: string;
  title: string;
  body: string;
  createdAt?: any;
  updatedAt?: any;
  authorUid?: string | null;
  authorName?: string | null;
};

const postsCol = collection(db, 'posts');

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(postsCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function listPosts() {
  const q = query(postsCol, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Post[];
}

export async function getPost(id: string) {
  const ref = doc(db, 'posts', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) } as Post;
}

