// contexts/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = "customer" | "mover" | null;

interface AuthState {
  userType: UserType;

  setAuth: (userType: UserType) => void;
  logout: () => void;
  isAuthenticated: () => boolean; //클라이언트 즉시 분기용
}

//로컬스토리지 "auth-store"에 userType같은 털려도 괜찮은 정보 저장
// 보안 민감 정보는 zustand 메모리에
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userType: null,
      setAuth: (userType) => set({ userType }),
      logout: () => set({ userType: null }),
      isAuthenticated: () => !!get().userType,
    }),
    { name: "auth-store" },
  ),
);
