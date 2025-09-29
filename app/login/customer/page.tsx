// app/login/customer/page.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter, useSearchParams } from "next/navigation";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("testcustomer1@test.com");
  const [password, setPassword] = useState("12345678");
  const { mutate: login, isPending } = useLogin("customer");

  //로그인 시 이전페이지 찾아서 다시 돌아가게하기
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectTo = searchParams.get("redirect") || "/";

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">고객 로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password },{onSuccess:()=>{
            router.push(redirectTo) // 로그인 성공시 원래 위치로 이동
          }});
        }}
        className="flex flex-col gap-2"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="border p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="border p-2"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-500 p-2 text-white"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
