// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerSignIn, moverSignIn } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { useRouter } from "next/navigation";
import { getSocket, refreshSocketAuth } from "@/lib/socket/socket";

export const useLogin = (userType: "customer" | "mover") => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const mutationFn = userType === "customer" ? customerSignIn : moverSignIn;

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      mutationFn(email, password),
    onSuccess: (data) => {
      //로그인 성공 - Zustand 상태 업데이트
      setAuth(userType);
      // React Query 캐시 무효화 하고 다시 me api 호출
      queryClient.invalidateQueries({ queryKey: ["me", userType] });

      refreshSocketAuth();
      getSocket();

      //메인화면으로 이동
      router.push("/landing");
    },
  });
};

//로그아웃 시 - 쿠키삭제api로 or useAuthStore().logout()
