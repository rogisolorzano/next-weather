import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const authenticatedLandingPage = "/";
const protectedRoutes = [authenticatedLandingPage];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const sessionValue = cookies().get("session")?.value;
  // Note: Auth is intentionally not implemented.
  const isAuthenticated = sessionValue && sessionValue?.length > 0;

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(authenticatedLandingPage, req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|assets|_next/image|.*\\.png$).*)",
  ],
};
