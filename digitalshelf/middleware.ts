import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  const protectedRoutes = ["/dashboard", "/collections", "/profile"];
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to only protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/collections/:path*", "/profile/:path*"],
};