import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
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
  if (session?.user && !pathname.includes('/setup-profile') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const userRole = (session.user as any).role;
    
    // If user has no role defined yet, they MUST complete the setup
    if (!userRole || userRole === 'USER' && (session.user as any).phone === null && (session.user as any).gender === null) {
       // We only redirect if they are a standard USER who hasn't been "onboarded" yet.
       // For now, let's just check if role is missing or they are 'USER' but haven't been 'processed' by our setup.
       // Note: Standard users are auto-approved, so we check for presence of role specifically.
       if (!userRole) {
         return NextResponse.redirect(new URL('/setup-profile', request.url));
       }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/fikradmin/:path*', '/ask/:path*', '/setup-profile/:path*'],
};
