import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/books/add",
];

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const token = cookies.get("token")?.value;

  const pathname = nextUrl.pathname;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const url = new URL("/auth/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/books/add/:path*"],
};
