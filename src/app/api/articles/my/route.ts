import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const articles = await prisma.article.findMany({
      where: { authorId: (session.user as any).id },
      include: {
        _count: {
          select: { comments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching my articles:', error);
    return NextResponse.json({ error: 'Failed to fetch your articles' }, { status: 500 });
  }
}
