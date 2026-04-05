import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/core/db';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role, phone, gender, marjae, username, bio, scholarTitle } = await request.json();

  // Basic username validation
  if (username && !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return NextResponse.json({ error: 'Username must be 3-20 characters and only contain letters, numbers, and underscores.' }, { status: 400 });
  }

  if (!role || !['USER', 'DEENI_GUIDE'].includes(role)) {
    return NextResponse.json({ error: 'Valid role is required' }, { status: 400 });
  }

  try {
    const updateData: any = { role, username };

    if (role === 'DEENI_GUIDE') {
      if (!phone || !gender || !username) {
        return NextResponse.json({ error: 'Deeni Guides must provide username, phone, and gender' }, { status: 400 });
      }
      updateData.phone = phone;
      updateData.gender = gender;
      if (marjae) updateData.marjae = marjae;
      updateData.bio = bio;
      updateData.scholarTitle = scholarTitle;
      updateData.isApproved = false; // Requires admin approval
    } else {
      // Standard users also need a username for the forum
      if (!username) {
        return NextResponse.json({ error: 'Username is required for forum participation' }, { status: 400 });
      }
    }

    // Check username uniqueness if provided
    const existing = await prisma.user.findFirst({ 
      where: { 
        username: username
      } 
    }) as any;
    if (existing && existing.id !== (session.user as any).id) {
       return NextResponse.json({ error: 'This username is already taken. Please choose another.' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: (session.user as any).id },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Set-Cookie': 'fikrit_setup_success=true; Path=/; Max-Age=3600; SameSite=Lax',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Profile setup error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
