import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Halaman dashboard hanya bisa diakses jika JWT valid [cite: 23]
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Tentukan rute yang diproteksi [cite: 13]
export const config = {
  matcher: '/dashboard/:path*',
};