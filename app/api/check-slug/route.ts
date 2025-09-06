import { NextRequest, NextResponse } from 'next/server';

// Placeholder: in a real app, check against database.
const usedSlugs = new Set(['example-post']);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || '';
  const unique = slug ? !usedSlugs.has(slug) : false;
  return NextResponse.json({ unique });
}
