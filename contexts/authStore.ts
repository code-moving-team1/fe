// contexts/authStore.ts
import { create } from "zustand";

type UserType = "customer" | "mover" | null;

interface AuthState {
  userType: UserType;
  isAuthenticated: boolean;
  setAuth: (userType: UserType, isAuthenticated: boolean) => void;
  logout: () => void;
}

// 로그인 성공시 setAuth("customer", true) or setAuth("mover",true)
export const useAuthStore = create<AuthState>((set) => ({
  userType: null,
  isAuthenticated: false,
  setAuth: (userType, isAuthenticated) => set({ userType, isAuthenticated }),
  logout: () => set({ userType: null, isAuthenticated: false }),
}));
