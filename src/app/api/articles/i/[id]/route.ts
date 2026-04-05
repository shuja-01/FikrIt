import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    } as any);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true }
    }) as any;

    if (!existingArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Only the author can edit the content
    if (existingArticle.authorId !== (session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized: Only the author can edit this article' }, { status: 403 });
    }

    const { title, content, excerpt, category, imageUrl, published } = await request.json();

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        category,
        imageUrl,
        published,
      } as any
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true }
    }) as any;

    if (!existingArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Author OR Admin can delete
    const isAuthor = existingArticle.authorId === (session.user as any).id;
    const isAdmin = (session.user as any).role === 'ADMIN';

    if (!isAuthor && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: You do not have permission to delete this article' }, { status: 403 });
    }

    await prisma.article.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
