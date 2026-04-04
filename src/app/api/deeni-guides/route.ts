import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET() {
  try {
    const guides = await prisma.user.findMany({
      where: {
        role: 'DEENI_GUIDE',
        isApproved: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Deeni Guides' }, { status: 500 });
  }
}
