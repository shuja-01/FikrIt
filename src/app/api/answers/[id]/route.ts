import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const answer = await prisma.answer.findUnique({
      where: { id },
      select: { authorId: true }
    });

    if (!answer) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    // Authorization: Admin or Author
    const isAdmin = (session.user as any).role === 'ADMIN';
    const isAuthor = (session.user as any).id === answer.authorId;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to delete this answer' }, { status: 403 });
    }

    await prisma.answer.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    console.error('Answer deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
  }
}
