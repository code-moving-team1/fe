// lib/config/auth/protectedRoutes.ts

/**
 * 로그인된 사용자만 접근 가능한 경로들
 * (auth)폴더에 페이지 추가 시 여기에 작성필요합니다
 */

//@TODO 나중에 기사만 갈수있는 routes 따로 고객만 갈수있는 routes따로 설정하면
// 더 안전할 수 있음
export const protectedRoutes = [
  "/profile/:path*",
  "/myEstimates",
  "/requests",
] as const;