import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

// Use Edge-compatible auth initialization
const { auth } = NextAuth(authConfig);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith('/api/auth');
  const isPendingPage = pathname.includes('/pending-approval');
  
  // 1. VIP Bypass (Highest Priority)
  const hasJustSetup = request.cookies.get('fikrit_setup_success');
  if (hasJustSetup?.value === 'true' && !isAuthRoute && !isPendingPage && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
     return NextResponse.next();
  }

  const session = await auth();
  const user = session?.user as any;

  // 1. IP Restriction for /fikradmin
  if (pathname.startsWith('/fikradmin')) {
    const realIp = request.headers.get('x-real-ip');
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');
    
    // User's provided IP from Vercel env
    const allowedIp = process.env.ADMIN_IP || '60.53.126.63'; 
    
    console.log(`[PROXY] Admin attempt from IP: ${clientIp} (Allowed: ${allowedIp})`);
    
    // Allow local development and the configured admin IP
    // Handling IPv4, IPv6, and IPv4-mapped IPv6 (::ffff:127.0.0.1)
    const isLocal = clientIp === '127.0.0.1' || 
                    clientIp === '::1' || 
                    clientIp.includes('127.0.0.1') ||
                    clientIp.startsWith('localhost');
                    
    const isAllowed = clientIp === allowedIp || isLocal;

    if (!isAllowed) {
      console.log(`[PROXY] Unauthorized IP: ${clientIp}. Redirecting to home.`);
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Admins bypass all other checks on this request
    return NextResponse.next();
  }

  if (user && !pathname.includes('/setup-profile') && !isAuthRoute && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const userRole = user.role;
    const phone = user.phone;
    const isApproved = user.isApproved;
    
    // Separation of Roles: Standard Users vs Guides
    const hasRole = !!userRole;
    const needsGuideProfile = userRole === 'DEENI_GUIDE' && !phone;
    
    // Redirect to onboarding if missing core role or guide profile
    if ((!hasRole || needsGuideProfile) && !isPendingPage) {
       console.log(`[PROXY] Redirecting ${user.email} to setup-profile (Needs role: ${!hasRole}, Needs profile: ${needsGuideProfile})`);
       return NextResponse.redirect(new URL('/setup-profile', request.url));
    }

    // 3. Deeni Guide Approval Check
    if (userRole === 'DEENI_GUIDE' && isApproved === false && !isPendingPage) {
       console.log(`[PROXY] Redirecting pending guide ${user.email} to approval page`);
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
