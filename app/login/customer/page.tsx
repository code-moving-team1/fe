// app/login/customer/page.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("testcustomer1@test.com");
  const [password, setPassword] = useState("12345678");
  const { mutate: login, isPending } = useLogin("customer");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">고객 로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
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
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
