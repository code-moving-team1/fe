// app/(auth)/layout.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { customerGetMe, moverGetMe } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const userType = cookieStore.get("userType")?.value as
    | "customer"
    | "mover"
    | undefined;
  if (userType) {
    await queryClient.prefetchQuery({
      queryKey: ["me", userType],
      queryFn: userType === "customer" ? customerGetMe : moverGetMe,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
