// hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";

export const useMe = () => {
  const { userType } = useAuthStore();

  return useQuery({
    queryKey: ["me", userType],
    queryFn: () => {
      if (userType === "customer") return customerGetMe();
      if (userType === "mover") return moverGetMe();
      throw new Error("No user type selected");
    },
    enabled: !!userType, // userType 없으면 실행 안 함
    retry: false,
  });
};
