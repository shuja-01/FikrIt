import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, maulanaId } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  try {
    let selectedMaulanaId = maulanaId;

    // Auto-assignment logic if no Maulana was selected
    if (!selectedMaulanaId) {
      const maulanas = await prisma.user.findMany({
        where: {
          role: 'MAULANA',
          isApproved: true,
        },
        include: {
          _count: {
            select: { assignedQuestions: true },
          },
        },
      });

      if (maulanas.length === 0) {
        return NextResponse.json({ error: 'No approved Maulanas available for assignment' }, { status: 503 });
      }

      // Find the one with the minimum count
      const leastBusyMaulana = maulanas.reduce((prev, curr) => 
        prev._count.assignedQuestions < curr._count.assignedQuestions ? prev : curr
      );

      selectedMaulanaId = leastBusyMaulana.id;
    }

    const question = await prisma.question.create({
      data: {
        title,
        content,
        authorId: (session.user as any).id,
        assignedTo: {
          connect: { id: selectedMaulanaId },
        },
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Question creation error:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
