// lib/config/header/headerConfigs.ts

export type MenuItem = {
  href: string;
  label: string;
  className?: string;
};

export const menuConfig: Record<"guest" | "customer" | "mover", MenuItem[]> = {
  guest: [
    { href: "/search", label: "기사님 찾기" },
    // {
    //   href: "/login/customer",
    //   label: "고객 로그인",
    //   className: "text-blue-600",
    // },
    // { href: "/login/mover", label: "기사 로그인", className: "text-blue-600" },
  ],
  customer: [
    { href: "/estimate", label: "견적 요청" },
    { href: "/search", label: "기사님 찾기" },
    { href: "/myEstimates", label: "내 견적 관리" },
  ],
  mover: [
    { href: "/requests", label: "받은 요청" },
    { href: "/myEstimates", label: "내 견적 관리" },
  ],
};

export const profileConfig: Record<"customer" | "mover", MenuItem[]> = {
  customer: [
    { href: "/profile/customer", label: "내 프로필" },
    { href: "/wishlist", label: "찜한 기사님" },
    { href: "/reviews", label: "이사 리뷰" },
  ],
  mover: [{ href: "/profile/mover", label: "내 프로필" }],
};
