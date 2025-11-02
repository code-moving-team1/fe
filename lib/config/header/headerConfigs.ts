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
    { href: "/requests", label: "이사 요청" },
    { href: "/sentEstimates", label: "내 견적 관리" },
  ],
};

export const profileConfig: Record<"customer" | "mover", MenuItem[]> = {
  customer: [
    { href: "/profile/edit/customer", label: "프로필 수정" },
    { href: "/likes", label: "찜한 기사님" },
    { href: "/reviews", label: "이사 리뷰" },
    {
      href: "/points/charge",
      label: "포인트 충전하기",
      className: "text-blue-600",
    },
  ],
  mover: [
    { href: "/my-page", label: "마이페이지" },
    {
      href: "/points/charge",
      label: "포인트 충전하기",
      className: "text-blue-600",
    },
  ],
};
