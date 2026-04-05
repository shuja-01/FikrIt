import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  
  // Strict authorization: Only Guides and Admins
  if (!session || !session.user || ((session.user as any).role !== 'DEENI_GUIDE' && (session.user as any).role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized: Scholarly access required' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    // Stream the body directly to Vercel Blob
    const blob = await put(filename, request.body as any, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: Please ensure BLOB_READ_WRITE_TOKEN is set' }, { status: 500 });
  }
}
