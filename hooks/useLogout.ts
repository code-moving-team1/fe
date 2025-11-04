// hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moverLogout, customerLogout } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { useRouter } from "next/navigation";
import { disconnectSocket } from "@/lib/socket/socket";
// import { getSocket } from "@/lib/socket/socket";

export const useLogout = () => {
  const { userType, logout: clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = userType === "mover" ? moverLogout : customerLogout;

  return useMutation({
    mutationFn,
    onSuccess: () => {
      disconnectSocket();
      // const s = getSocket();
      // if (s?.connected) s.disconnect(); //연결 해제

      // 상태/캐시 정리
      queryClient.setQueryData(["me"], undefined);
      queryClient.invalidateQueries({
        queryKey: ["me"],
        refetchType: "inactive",
      });
      clearAuth();
      queryClient.clear(); // 전체 캐시 초기화

      //이동
      router.push("/landing");
    },
  });
};
