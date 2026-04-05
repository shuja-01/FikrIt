import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      where: {
        isPublic: true
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true
          }
        },
        answers: {
          include: {
            author: {
              select: {
                name: true,
                username: true,
                scholarTitle: true,
                image: true
              }
            }
          }
        },
        _count: {
          select: {
            answers: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Fetch forum questions error:', error);
    return NextResponse.json({ error: 'Failed to fetch forum' }, { status: 500 });
  }
}
