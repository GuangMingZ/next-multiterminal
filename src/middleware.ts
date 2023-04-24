import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isMobile from "is-mobile";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const ua = request.headers.get("user-agent") || "";
  const isMobileDevice = isMobile({ ua, tablet: false });
  const isTabletDevice = !isMobileDevice && isMobile({ ua, tablet: true });
  url.pathname = "/pc";
  if (isMobileDevice) {
    url.pathname = "/mobile";
  } else if (isTabletDevice) {
    url.pathname = "/tablet";
  }
  if (isMobileDevice && !url.pathname.startsWith("/mobile")) {
    return NextResponse.redirect(url);
  } else if (isTabletDevice && !url.pathname.startsWith("/tablet")) {
    return NextResponse.redirect(url);
  } else if (
    !isMobileDevice &&
    !isTabletDevice &&
    !url.pathname.startsWith("/pc")
  ) {
    return NextResponse.redirect(url);
  }
  return response;
}

// 中间件监听的路由
export const config = {
  matcher: ["/", "/pc", "/mobile", "/tablet"],
};
