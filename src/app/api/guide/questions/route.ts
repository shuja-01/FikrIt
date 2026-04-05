import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  if (!session || !session.user || (session.user as any).role !== 'DEENI_GUIDE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const questions = await prisma.question.findMany({
      where: {
        assignedTo: {
          some: { id: (session.user as any).id }
        }
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true
          }
        },
        answers: true,
        parent: {
          select: {
            title: true,
            id: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Fetch guide questions error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'DEENI_GUIDE') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId, action } = await request.json();

    try {
        if (action === 'approve') {
            await prisma.question.update({
                where: { id: questionId },
                data: { isPublic: true }
            });
            return NextResponse.json({ success: true });
        }
        
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Guide action error:', error);
        return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
    }
}
