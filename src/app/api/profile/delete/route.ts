import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed. Use DELETE instead.' }, { status: 405 });
}

export async function DELETE() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = (session.user as any).id;

    // Delete the user (Prisma cascade will handle related data if configured, 
    // but our schema has some relations that might need manual cleanup if not cascade)
    // Looking at schema: Account, Session, Question, Answer, Bookmark all have relations to User.
    // Most are marked onDelete: Cascade. 
    
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
