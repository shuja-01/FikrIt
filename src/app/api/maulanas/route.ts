import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET() {
  try {
    const maulanas = await prisma.user.findMany({
      where: {
        role: 'MAULANA',
        isApproved: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(maulanas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Maulanas' }, { status: 500 });
  }
}
