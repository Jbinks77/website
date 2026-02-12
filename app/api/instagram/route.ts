import { NextResponse } from 'next/server';
import mockPosts from '@/data/instagram-mock.json';
import { InstagramPost } from '@/lib/types';

export const revalidate = 1800;

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) return mockPosts as InstagramPost[];

  const endpoint = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${token}`;
  const response = await fetch(endpoint, { next: { revalidate: 1800 } });
  if (!response.ok) throw new Error('Instagram indisponible');

  const json = (await response.json()) as { data?: InstagramPost[] };
  if (!json.data?.length) return mockPosts as InstagramPost[];

  return json.data;
}

export async function GET() {
  try {
    const posts = await fetchInstagramPosts();
    const sorted = [...posts].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));
    return NextResponse.json({ source: 'instagram', posts: sorted });
  } catch {
    return NextResponse.json({ source: 'fallback', posts: mockPosts, message: 'Instagram est momentanément indisponible, voici une sélection récente.' });
  }
}
