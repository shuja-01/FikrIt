import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 1. IP Restriction for /fikradmin
  if (pathname.startsWith('/fikradmin')) {
    const realIp = request.headers.get('x-real-ip');
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');
    
    // User's provided IP from Vercel env
    const allowedIp = process.env.ADMIN_IP || '60.53.126.63'; 
    
    console.log(`[PROXY] Admin attempt from IP: ${clientIp} (Target: ${allowedIp})`);
    
    if (clientIp !== allowedIp) {
      console.log(`[PROXY] Unauthorized IP: ${clientIp}. Access denied.`);
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Admins bypass all other checks on this request
    return NextResponse.next();
  }

  // 2. Profile Setup Redirect
  const isAuthRoute = pathname.startsWith('/api/auth');
  const isPendingPage = pathname.includes('/pending-approval');
  
  if (session?.user && !pathname.includes('/setup-profile') && !isAuthRoute && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const userRole = (session.user as any).role;
    const phone = (session.user as any).phone;
    const isApproved = (session.user as any).isApproved;
    
    // A user is NOT onboarded if they have no role. User must explicitly pick a role during setup.
    // However, we MUST allow them to reach the pending-approval page even if the session is stale.
    if ((!userRole || !phone) && !isPendingPage) {
       console.log(`[PROXY] Redirecting user ${session.user.email} to setup-profile`);
       return NextResponse.redirect(new URL('/setup-profile', request.url));
    }

    // 3. Deeni Guide Approval Check
    if (userRole === 'DEENI_GUIDE' && isApproved === false && !isPendingPage) {
       console.log(`[PROXY] Redirecting pending guide ${session.user.email} to approval page`);
       return NextResponse.redirect(new URL('/pending-approval', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
