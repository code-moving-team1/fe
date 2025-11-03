// lib/auth/server.ts
import serverApi from "@/lib/api/axiosClient.server";
import type { MeResponse } from "@/types/auth";

export async function serverCustomerGetMe(cookieHeader?: string) {
  const { data } = await serverApi.get<MeResponse>("/auth/customer/me", {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
  return data;
}

export async function serverMoverGetMe(cookieHeader?: string) {
  const { data } = await serverApi.get<MeResponse>("/auth/mover/me", {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
  return data;
}
