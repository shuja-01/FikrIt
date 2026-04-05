import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            username: true,
            scholarTitle: true,
            name: true,
            image: true,
          }
        },
        _count: {
          select: { comments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || (session.user as any).role !== 'DEENI_GUIDE') {
    return NextResponse.json({ error: 'Unauthorized: Only Deeni Guides can publish articles' }, { status: 401 });
  }

  try {
    const { title, content, excerpt, category, imageUrl, published } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Basic slug generation
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Math.random().toString(36).substring(2, 7);

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        imageUrl,
        published: published || false,
        authorId: (session.user as any).id,
      }
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Article creation error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
