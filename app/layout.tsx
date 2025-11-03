// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import HeaderRefactor from "@/components/header/HeaderRefactor";
import { headers } from "next/headers";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { serverCustomerGetMe, serverMoverGetMe } from "@/lib/auth/server";
import type { MeResponse } from "@/types/auth";

export const metadata: Metadata = {
  title: "Moving",
  description: "무빙",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const userType = headerList.get("userType"); //'customer' | 'mover' | null
  const hasProfile = headerList.get("hasProfile");
  const queryClient = new QueryClient();

  const cookieHeader = headerList.get("cookie") ?? "";

  //customer 나 mover일 경우 reactquery prefetch
  if (userType) {
    await queryClient.prefetchQuery({
      queryKey: ["me", userType],
      // queryFn: userType === "customer" ? customerGetMe : moverGetMe,
      // ✅ 서버에서 프리패치할 때 브라우저 쿠키를 함께 전달
      queryFn: () =>
        userType === "customer"
          ? serverCustomerGetMe(cookieHeader)
          : serverMoverGetMe(cookieHeader),
    });
  }

  const meInitial = userType
    ? (queryClient.getQueryData(["me", userType]) as MeResponse | undefined)
    : undefined;

  return (
    <html lang="ko">
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderRefactor
              userType={userType as "customer" | "mover" | null}
              meInitial={meInitial}
            />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
