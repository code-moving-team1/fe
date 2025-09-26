// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Moving",
  description: "무빙",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
