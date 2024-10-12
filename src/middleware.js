import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // jose is a library that works with the Web Crypto API

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('e-learninigtoken')?.value || '';
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
 // console.log('pay', payload);

  if (pathname.startsWith('/admin') && !payload.isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/Admin') && !payload.isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/instructor') && !payload.isInstructor) {
   // const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
   // console.log('pay', payload);
    return NextResponse.redirect(new URL('/student', request.url));
  }

  if (pathname.startsWith('/student') && payload.isInstructor) {
    return NextResponse.redirect(new URL('/instructor', request.url));
  }

  if (pathname.startsWith('/student') && payload.isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/instructor/:path*', '/student/:path*' ,'/checkout.stripe.com/:path*','/course/:path*'],
};
