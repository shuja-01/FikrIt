import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role, phone, gender, marjae } = await request.json();

  if (!role || !['USER', 'DEENI_GUIDE'].includes(role)) {
    return NextResponse.json({ error: 'Valid role is required' }, { status: 400 });
  }

  try {
    const updateData: any = { role };

    if (role === 'DEENI_GUIDE') {
      if (!phone || !gender || !marjae) {
        return NextResponse.json({ error: 'Deeni Guides must provide phone, gender, and marjae' }, { status: 400 });
      }
      updateData.phone = phone;
      updateData.gender = gender;
      updateData.marjae = marjae;
      updateData.isApproved = false; // Requires admin approval
    }

    const updatedUser = await prisma.user.update({
      where: { id: (session.user as any).id },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Set-Cookie': 'fikrit_setup_success=true; Path=/; Max-Age=60; SameSite=Lax',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Profile setup error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
