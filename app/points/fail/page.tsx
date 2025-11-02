// app/points/fail/page.tsx
"use client";

export default function FailPage() {
  const url =
    typeof window !== "undefined" ? new URL(window.location.href) : null;
  const code = url?.searchParams.get("code");
  const message = url?.searchParams.get("message");

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">결제 실패</h1>
      <p className="text-sm text-gray-600">code: {code}</p>
      <p className="text-sm text-gray-600">message: {message}</p>
    </main>
  );
}
