import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            username: true,
            scholarTitle: true,
            name: true,
            image: true,
            bio: true,
          }
        },
        comments: {
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
        }
      }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
