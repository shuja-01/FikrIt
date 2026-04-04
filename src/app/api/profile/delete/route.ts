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
    console.log(`[DELETE_API] Deleting user id: ${userId}`);

    if (!userId) {
      console.error("[DELETE_API] No user id found in session object");
      return NextResponse.json({ error: 'User ID missing in session' }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`[DELETE_API] Successfully deleted user record for: ${deletedUser.email}`);
    return NextResponse.json({ success: true, message: 'Account deleted successfully' });
  } catch (error: any) {
    console.error('[DELETE_API] Error deleting account:', error);
    return NextResponse.json({ 
      error: 'Failed to delete account. Please ensure you have run "npx prisma db push" to enable cascades.',
      details: error.message 
    }, { status: 500 });
  }
}
