// hooks/useAuth.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { MeResponse } from "@/types/auth";

export const useMe = (userTypeFromServer?: "customer" | "mover" | null) => {
  const { userType: userTypeFromStore } = useAuthStore();
  // 서버에서 온 값 > 스토어 값(클라 초기화 전일 수 있음)
  const effectiveUserType = userTypeFromServer ?? userTypeFromStore ?? null;

  return useQuery<MeResponse>({
    queryKey: ["me", effectiveUserType], // ✅ layout과 동일 키
    enabled: !!effectiveUserType, // 로그인 아닐 땐 호출 안 함
    queryFn: () =>
      effectiveUserType === "customer" ? customerGetMe() : moverGetMe(),
    retry: false, // 401 재시도 방지
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // placeholderData: keepPreviousData,
    placeholderData: (prev) => prev,
  });
};

// export const useMe = () => {
//   const { userType, isAuthenticated } = useAuthStore();

//   return useQuery<MeResponse>({
//     queryKey: ["me", userType],
//     queryFn: () => {
//       if (userType === "customer") return customerGetMe();
//       if (userType === "mover") return moverGetMe();
//       throw new Error("No user type selected"); //@TODO 에러 정의
//     },
//     enabled: isAuthenticated(),
//     retry: false, // 401은 인터셉터가 처리
//     staleTime: 1000 * 60 * 5, // 5분동안은 fresh 취급
//     //프로필 수정 같은 변동사항 발생시 queryClient.invalidateQueries(["me", userType]) 으로 강제 갱신가능
//   });
// };
