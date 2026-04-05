import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed. Use DELETE instead.' }, { status: 405 });
}

export async function DELETE() {
  const session = await auth();

  if (!session || !session.user) {
    console.error("[DELETE_API] No session or user found during delete request");
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = (session.user as any).id;
    console.log(`[DELETE_API] Attempting to delete user id: ${userId}`);

    if (!userId) {
      console.error("[DELETE_API] User ID missing in session object");
      return NextResponse.json({ error: 'User ID missing in session' }, { status: 400 });
    }

    // Attempting to delete the user. Cascade delete should handle related records if configured in DB.
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`[DELETE_API] Successfully deleted user record for: ${deletedUser.email}`);
    
    // Clear setup success cookie if it exists
    const response = NextResponse.json({ success: true, message: 'Account deleted successfully' });
    response.cookies.set('fikrit_setup_success', '', { maxAge: 0, path: '/' });
    
    return response;
  } catch (error: any) {
    console.error('[DELETE_API] Full Error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to delete account',
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      suggestion: 'Check Prisma error code P2003 or P2025'
    }, { status: 500 });
  }
}
