import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized', status: 'not_logged_in' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  
  try {
    // DRY RUN deletion: Use a transaction but don't commit?
    // Actually, Prisma doesn't have a simple dry-run for deletions with relations.
    // We'll just try to "check" the records that might cause trouble.
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        sessions: true,
        questions: { select: { id: true, title: true } },
        answers: { select: { id: true, content: true } },
        bookmarks: { select: { id: true } },
        assignedQuestions: { select: { id: true } }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: "Ready to test deletion diagnostics",
      user_summary: {
        id: userId,
        email: user.email,
        counts: {
          accounts: user.accounts.length,
          sessions: user.sessions.length,
          questions: user.questions.length,
          answers: user.answers.length,
          bookmarks: user.bookmarks.length,
          assignedQuestions: user.assignedQuestions.length
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Diagnostic check failed', 
      details: error.message 
    }, { status: 500 });
  }
}

// Actual "Trace Delete" that tries to delete but returns detailed error
export async function POST() {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const userId = (session.user as any).id;
    
    try {
        // Try deleting inside a transaction that we intentionally fail or just report error
        // Note: Prisma 2 delete is atomic.
        const result = await prisma.user.delete({
            where: { id: userId }
        });
        return NextResponse.json({ success: true, user: result });
    } catch (e: any) {
        console.error("[DEBUG_DELETE_FAIL]", e);
        return NextResponse.json({
            success: false,
            code: e.code,
            meta: e.meta,
            message: e.message
        }, { status: 500 });
    }
}
