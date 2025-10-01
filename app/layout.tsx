// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import HeaderRefactor from "@/components/header/HeaderRefactor";
import Header from "@/components/header/Header";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { customerGetMe, moverGetMe } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Moving",
  description: "무빙",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const userType = cookieStore.get("userType")?.value as
    | "customer"
    | "mover"
    | undefined;

  //customer 나 mover일 경우 reactquery prefetch
  if (userType) {
    await queryClient.prefetchQuery({
      queryKey: ["me", userType],
      queryFn: userType === "customer" ? customerGetMe : moverGetMe,
    });
  }

  return (
    <html lang="ko">
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderRefactor />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
