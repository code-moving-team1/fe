// app/myEstimates/[requestId]/quotes/[quoteId]/page.tsx
import { cookies } from "next/headers";
import { getQuoteDetailServer } from "@/lib/quoteApi";
import QuoteDetailClient from "./QuoteDetail.client";

export default async function Page({
  params,
}: {
  params: Promise<{ requestId: string; quoteId: string }>;
}) {
  const { requestId, quoteId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const detail = await getQuoteDetailServer(Number(quoteId), token);

  if (!detail) {
    return (
      <div className="p-6 text-red-600">견적 상세를 찾을 수 없습니다.</div>
    );
  }

  return <QuoteDetailClient requestId={Number(requestId)} detail={detail} />;
}
