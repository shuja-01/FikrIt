import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 1. IP Restriction for /fikradmin
  if (pathname.startsWith('/fikradmin')) {
    const forwardHeader = request.headers.get('x-forwarded-for');
    const clientIp = forwardHeader ? forwardHeader.split(',')[0].trim() : '127.0.0.1';
    
    // User's provided IP from Vercel env
    const allowedIp = process.env.ADMIN_IP || '60.53.126.63'; 
    
    if (clientIp !== allowedIp) {
      console.log(`Unauthorized access attempt from IP: ${clientIp}`);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 2. Profile Setup Redirect
  const isAuthRoute = pathname.startsWith('/api/auth');
  if (session?.user && !pathname.includes('/setup-profile') && !isAuthRoute && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const userRole = (session.user as any).role;
    const phone = (session.user as any).phone;
    
    // A user is NOT onboarded if they have no role. User must explicitly pick a role during setup.
    // This allows us to force setup even if the database assigned a placeholder role.
    if (!userRole || !phone) {
       console.log(`[PROXY] Redirecting user ${session.user.email} to setup-profile`);
       return NextResponse.redirect(new URL('/setup-profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/fikradmin/:path*', '/ask/:path*', '/setup-profile/:path*'],
};
