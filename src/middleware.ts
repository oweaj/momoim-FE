import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  const { pathname } = request.nextUrl;

  const url = request.nextUrl.clone();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", url.toString());

  // /mypage 접근 제어
  if (pathname.startsWith("/mypage")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }

  // /login 및 /signup 접근 제어
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/mypage/:path*", "/login", "/signup", "/:path*"],
};
