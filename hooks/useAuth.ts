// hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";

export const useMe = () => {
  const { userType, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["me", userType],
    queryFn: () => {
      if (userType === "customer") return customerGetMe();
      if (userType === "mover") return moverGetMe();
      throw new Error("No user type selected"); //@TODO 에러 정의
    },
    enabled: isAuthenticated(),
    retry: false, // 401은 인터셉터가 처리
  });
};
