// hooks/useAuth.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { MeResponse } from "@/types/auth";

export const useMe = () => {
  const { userType, isAuthenticated } = useAuthStore();

  return useQuery<MeResponse>({
    queryKey: ["me", userType],
    queryFn: () => {
      if (userType === "customer") return customerGetMe();
      if (userType === "mover") return moverGetMe();
      throw new Error("No user type selected"); //@TODO 에러 정의
    },
    enabled: isAuthenticated(),
    retry: false, // 401은 인터셉터가 처리
    staleTime: 1000 * 60 * 5, // 5분동안은 fresh 취급
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    //프로필 수정 같은 변동사항 발생시 queryClient.invalidateQueries(["me", userType]) 으로 강제 갱신가능
  });
};
