import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const comments = await prisma.articleComment.findMany({
      where: { articleId: id },
      include: {
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized: Please sign in to comment' }, { status: 401 });
  }

  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const comment = await prisma.articleComment.create({
      data: {
        content,
        articleId: id,
        authorId: (session.user as any).id,
      },
      include: {
        article: {
          select: { authorId: true, title: true }
        }
      }
    });

    // Create a notification for the article author
    if (comment.article.authorId !== (session.user as any).id) {
      await prisma.notification.create({
        data: {
          userId: comment.article.authorId,
          type: 'COMMENT',
          entityId: comment.articleId,
          message: `${(session.user as any).username || 'A user'} commented on your article: ${comment.article.title.substring(0, 30)}...`,
        }
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
