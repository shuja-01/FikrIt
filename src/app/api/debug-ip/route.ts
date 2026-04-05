import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const realIp = request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  
  return NextResponse.json({
    realIp,
    forwardedFor,
    vercelForwardedFor,
    ADMIN_IP: process.env.ADMIN_IP,
    detected: realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'),
  });
}
