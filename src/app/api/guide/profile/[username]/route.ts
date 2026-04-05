import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  try {
    const guide = await prisma.user.findUnique({
      where: {
        username: username,
        role: 'DEENI_GUIDE'
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        scholarTitle: true,
        _count: {
          select: {
            answers: true
          }
        },
        answers: {
          where: { isPublic: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            question: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    return NextResponse.json(guide);
  } catch (error) {
    console.error('Fetch guide profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
