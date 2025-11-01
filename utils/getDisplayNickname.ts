// lib/chat/getDisplayNickname.ts
import clientApi from "@/lib/api/axiosClient.client";
import { useAuthStore } from "@/contexts/authStore";

type MeResponse = { name?: string; nickname?: string; email?: string };

export async function getDisplayNickname() {
  const { userType } = useAuthStore.getState(); // "customer" | "mover" | undefined

  if (!userType) {
    // 비로그인 방문자
    return `Unknown-${Math.floor(Math.random() * 9999)}`;
  }

  const mePath =
    userType === "customer" ? "/auth/customer/me" : "/auth/mover/me";
  const { data } = await clientApi.get<MeResponse>(mePath, {
    withCredentials: true,
  });

  const base =
    data?.name ||
    data?.nickname ||
    // (data?.email ? data.email.split("@")[0] : "") ||
    `-${Math.floor(Math.random() * 9999)}`;

  const prefix = userType === "customer" ? "(고객)" : "(기사)";
  return `${prefix} ${base}`;
}
