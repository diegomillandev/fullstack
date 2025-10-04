import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const sesionCookie = getSessionCookie(request);

  const res = NextResponse.next();

  const isLoggedIn = !!sesionCookie;

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith("/api/");
  const isPublicFile = /\.(.*)$/.test(nextUrl.pathname);

  const isProtectedRoute = !isAuthRoute && !isApiRoute && !isPublicFile;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
