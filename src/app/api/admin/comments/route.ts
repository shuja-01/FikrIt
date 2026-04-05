import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch recent comments across all articles
    const comments = await (prisma as any).articleComment.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
          }
        },
        article: {
          select: {
            title: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 for performance
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Admin Fetch Comments error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
