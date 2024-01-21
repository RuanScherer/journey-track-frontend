import { ANONYMOUS_PATHS } from "@/shared/constants";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|icon.png).*)',
  ]
}

function isAnonymousPath(path: string) {
  return ANONYMOUS_PATHS.includes(path)
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", request.url)

  let action = validateAnonymousPaths(request)
  if (action) return action

  action = validateAuthenticatedPaths(request)
  if (action) return action

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}

function validateAnonymousPaths(request: NextRequest) {
  if (!isAnonymousPath(request.nextUrl.pathname)) {
    return
  }

  const accessToken = request.cookies.get("access_token")
  if (!accessToken) return

  return NextResponse.redirect(new URL("/home", request.url))
}

function validateAuthenticatedPaths(request: NextRequest) {
  if (isAnonymousPath(request.nextUrl.pathname)) {
    return
  }

  const accessToken = request.cookies.get("access_token")
  if (accessToken) return

  return NextResponse.redirect(new URL("/sign-in", request.url))
}