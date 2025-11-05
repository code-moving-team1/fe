"use client";

import { useAuthStore } from "@/contexts/authStore";
import { onLoginSuccess } from "@/hooks/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccessPage() {
  console.log("페이지 접근");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    console.log("Oauth useEffect");
    if (type === "customer") {
      onLoginSuccess("customer", queryClient, setAuth, router);
    } else if (type === "mover") {
      onLoginSuccess("mover", queryClient, setAuth, router);
    }
  }, [type]);

  return <div>간편 로그인 성공! 잠시만 기다려 주세요.</div>;
}
