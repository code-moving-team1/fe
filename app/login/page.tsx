// app/login/page.tsx
"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="grid w-full max-w-3xl grid-cols-2 gap-8">
        {/* 고객 로그인 */}
        <Link
          href="/login/customer"
          className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
        >
          <span className="text-2xl font-bold text-blue-600">고객 로그인</span>
          <p className="mt-2 text-sm text-gray-500">
            견적 요청하고 기사님을 찾아보세요
          </p>
        </Link>

        {/* 기사 로그인 */}
        <Link
          href="/login/mover"
          className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
        >
          <span className="text-2xl font-bold text-green-600">기사 로그인</span>
          <p className="mt-2 text-sm text-gray-500">
            고객 요청을 확인하고 견적을 보내보세요
          </p>
        </Link>
      </div>
    </div>
  );
}
