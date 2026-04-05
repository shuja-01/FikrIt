import { NextResponse } from 'next/server';
import { prisma } from '@/core/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || 'mshuja.rizvi@gmail.com';

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { role: 'ADMIN', isApproved: true },
      create: { 
        email, 
        role: 'ADMIN', 
        isApproved: true,
        name: 'Initial Admin' 
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: `User ${email} is now an ADMIN.`,
      user 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
