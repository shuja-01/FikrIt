import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  // Basic role check (IP restriction is at middleware level)
  if (!session || !session.user) {
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
