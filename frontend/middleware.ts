import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("adminAuth");

  // If not logged in → redirect to login
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Protect only admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
