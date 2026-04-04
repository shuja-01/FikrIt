import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function POST(request: Request) {
  const session = await auth();

  // Basic role check (IP restriction is at middleware level)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, action } = await request.json();

  if (!userId || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    if (action === 'approve') {
      await prisma.user.update({
        where: { id: userId },
        data: { isApproved: true },
      });
    } else {
      // For rejection, we revert their role back to USER
      await prisma.user.update({
        where: { id: userId },
        data: { 
          role: 'USER', 
          isApproved: true, // Standard users are auto-approved
          phone: null,
          gender: null,
          marjae: null
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Guide action error:', error);
    return NextResponse.json({ error: 'Failed to process guide action' }, { status: 500 });
  }
}
