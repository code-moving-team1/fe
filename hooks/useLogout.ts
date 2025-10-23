// hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moverLogout, customerLogout } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket/socket";

export const useLogout = () => {
  const { userType, logout: clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = userType === "mover" ? moverLogout : customerLogout;

  return useMutation({
    mutationFn,
    onSuccess: () => {
      const s = getSocket();
      if (s?.connected) s.disconnect();

      clearAuth();
      queryClient.clear(); // 전체 캐시 초기화
      router.push("/landing"); // 홈으로 이동
    },
  });
};
