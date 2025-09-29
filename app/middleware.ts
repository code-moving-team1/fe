// middleware.ts

/***********
 *
 * 회원전용페이지 추가시 @/lib/config/auth/protectedRoutes 의 protectRoutes에 routes 추가하시면 됩니다
 *
 ***********/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "@/lib/config/auth/protectedRoutes";

export function authMiddleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const { pathname } = req.nextUrl;

  //회원전용 경로검사
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route.replace(":path*", "")),
  );

  if (isProtected && !accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname); // 로그인 후 다시 원래 페이지로
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Next.js에 알려주기
export function middleware(req: NextRequest) {
  return authMiddleware(req);
}

// 어떤 경로에서 실행할지 지정
export const config = {
  matcher: [...protectedRoutes],
};
