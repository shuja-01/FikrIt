import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const forumPosts = await (prisma as any).question.findMany({
      where: {
        parentId: null // Only main threads, not replies or follow-ups for cleaner dashboard
      },
      include: {
        author: {
           select: {
             name: true,
             username: true,
           }
        },
        _count: {
          select: { answers: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(forumPosts);
  } catch (error) {
    console.error('Admin Fetch Forum error:', error);
    return NextResponse.json({ error: 'Failed to fetch forum posts' }, { status: 500 });
  }
}
