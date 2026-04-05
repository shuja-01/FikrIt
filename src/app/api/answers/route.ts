import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || (session.user as any).role !== 'DEENI_GUIDE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { questionId, content } = await request.json();

  if (!questionId || !content) {
    return NextResponse.json({ error: 'Question ID and content are required' }, { status: 400 });
  }

  try {
    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        authorId: (session.user as any).id,
        isPublic: true // Scholar answers are public by default in the forum
      }
    });

    return NextResponse.json(answer);
  } catch (error) {
    console.error('Answer creation error:', error);
    return NextResponse.json({ error: 'Failed to create answer' }, { status: 500 });
  }
}
