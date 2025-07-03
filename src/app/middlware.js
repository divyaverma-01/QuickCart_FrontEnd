// src/middleware.js
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/admin", "/admin/dashboard", "/admin/orders"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // Only run middleware for protected routes
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/(auth)/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
