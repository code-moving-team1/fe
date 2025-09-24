// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerSignIn, moverSignIn } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";

export const useLogin = (userType: "customer" | "mover") => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  const mutationFn =
    userType === "customer"
      ? customerSignIn
      : moverSignIn;

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      mutationFn(email, password),
    onSuccess: () => {
      setAuth(userType, true);
      queryClient.invalidateQueries({ queryKey: ["me", userType] });
    },
  });
};

//로그아웃 시 - 쿠키삭제api로 or useAuthStore().logout()