import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  // Strict authorization check
  if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pendingGuides = await prisma.user.findMany({
      where: {
        role: 'DEENI_GUIDE',
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        gender: true,
        marjae: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(pendingGuides);
  } catch (error) {
    console.error('Fetch pending guides error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending guides' }, { status: 500 });
  }
}
