// components/header/HeaderWJ.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/contexts/authStore";
import { useMe } from "@/hooks/useAuth";

export default function HeaderWJ() {
  const { userType, isAuthenticated, logout } = useAuthStore();
  const { data: me } = useMe(); // 로그인 상태면 /me API 호출됨
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between px-6 py-3">
        {/* 왼쪽 로고 + 메뉴 */}
        <div className="flex items-center gap-8 pl-[160px]">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="무빙 로고"
              width={116}
              height={44}
            />
          </Link>

          <ul className="text-md flex gap-6 font-bold text-black">
            {/* 비회원 */}
            {!isAuthenticated() && (
              <>
                <li>
                  <Link href="/search">기사님 찾기</Link>
                </li>
                <li>
                  <Link href="/login/customer" className="text-blue-600">
                    고객 로그인
                  </Link>
                </li>
                <li>
                  <Link href="/login/mover" className="text-blue-600">
                    기사 로그인
                  </Link>
                </li>
              </>
            )}

            {/* 고객 */}
            {isAuthenticated() && userType === "customer" && (
              <>
                <li>
                  <Link href="/estimate">견적 요청</Link>
                </li>
                <li>
                  <Link href="/search">기사님 찾기</Link>
                </li>
                <li>
                  <Link href="/myEstimates">내 견적 관리</Link>
                </li>
              </>
            )}

            {/* 기사 */}
            {isAuthenticated() && userType === "mover" && (
              <>
                <li>
                  <Link href="/requests">받은 요청</Link>
                </li>
                <li>
                  <Link href="/myEstimates">내 견적 관리</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* 오른쪽 프로필 / 로그인 버튼 */}
        <div className="flex pr-[160px]">
          {!isAuthenticated() ? (
            <Link
              href="/login"
              className="rounded-lg bg-orange-600 px-6 py-1.5 text-white"
            >
              로그인
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Image
                src="/icons/ic_alarm.svg"
                alt="알람"
                width={30}
                height={30}
              />

              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/icons/ic_profile.svg"
                    alt="프로필"
                    width={36}
                    height={36}
                  />
                  <span className="font-bold text-black">
                    {userType === "mover"
                      ? `${me?.nickname ?? "기사님"}`
                      : `${me?.email ?? "고객님"}`}
                    {/* @TODO 고객은 뭘 표기해야할 지 */}
                  </span>
                </button>

                {open && (
                  <div className="absolute top-full left-0 mt-2 w-45 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {userType === "customer" && (
                      <>
                        <div className="px-4 py-4 text-sm font-bold text-gray-800">
                          {me?.nickname ?? "고객"}님
                        </div>
                        <ul className="text-sm text-gray-700">
                          <li className="cursor-pointer px-4 py-2.5 hover:bg-gray-100">
                            <Link href="/profile/customer">임시마이페이지</Link>
                          </li>
                          <li className="cursor-pointer px-4 py-2.5 hover:bg-gray-100">
                            프로필 수정
                          </li>
                          <li className="cursor-pointer px-4 py-2.5 hover:bg-gray-100">
                            찜한 기사님
                          </li>
                          <li className="cursor-pointer px-4 py-2.5 hover:bg-gray-100">
                            이사 리뷰
                          </li>
                        </ul>
                      </>
                    )}

                    {userType === "mover" && (
                      <>
                        <div className="px-4 py-4 text-sm font-bold text-gray-800">
                          {me?.nickname ?? "기사"}님
                        </div>
                        <ul className="text-sm text-gray-700">
                          <li className="cursor-pointer px-4 py-2.5 hover:bg-gray-100">
                            <Link href="/profile/mover">마이페이지</Link>
                          </li>
                        </ul>
                      </>
                    )}

                    <button
                      onClick={logout}
                      className="w-full cursor-pointer border-t border-gray-100 px-4 py-2 text-center text-sm text-gray-400"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
