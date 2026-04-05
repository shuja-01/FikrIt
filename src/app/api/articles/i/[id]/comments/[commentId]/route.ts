import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, commentId: string }> }
) {
  const session = await auth();
  const { id, commentId } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const comment = await (prisma as any).articleComment.findUnique({
      where: { id: commentId },
      include: { article: { select: { authorId: true } } }
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Authorization: Admin, Article Author, or Comment Author
    const isAdmin = (session.user as any).role === 'ADMIN';
    const isArticleAuthor = (session.user as any).id === comment.article.authorId;
    const isCommentAuthor = (session.user as any).id === comment.authorId;

    if (!isAdmin && !isArticleAuthor && !isCommentAuthor) {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to delete this comment' }, { status: 403 });
    }

    await (prisma as any).articleComment.delete({
      where: { id: commentId }
    });

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Comment deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
