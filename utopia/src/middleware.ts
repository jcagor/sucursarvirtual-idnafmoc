import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const fullPath = request.url.toLowerCase();

  const suspiciousPatterns = [
    "%2e%2e",
    "..",
    "%252e",
    "%c0%ae",
    "%c0%af",
    "%2f",
    "%5c",
    "\\",
    ";",
    "%3b",
    "%00",
    "%",
  ];

  for (const pattern of suspiciousPatterns) {
    if (fullPath.includes(pattern)) {
      console.warn("🚨 Bloqueado por patrón malicioso:", pattern);
      return new Response("Blocked: Suspicious input", { status: 400 });
    }
  }

  if (url.searchParams.has("error")) {
    const redirectUrl = new URL("/", url.origin);
    return NextResponse.redirect(redirectUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/:path*", "/api/:path*"],
};
