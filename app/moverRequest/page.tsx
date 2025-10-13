// app/moverRequest/page.tsx (Server Component)
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchMoveRequests } from "@/lib/api/moveRequest";
import MoverRequestList from "./moverRequestList";
import { cookies } from "next/headers";

export default async function MoverRequestPage() {
  // console.log("🚀 [SERVER] MoverRequestPage 시작됨");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const queryClient = new QueryClient();
  const initialFilters = { page: 1, pageSize: 5 };
  const queryKey = [
    "moveRequests",
    initialFilters.page,
    initialFilters.pageSize,
  ];
  // console.log("📡 [SERVER] prefetchInfiniteQuery 실행 직전");
  // 서버에서 첫 페이지 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...initialFilters, page: pageParam }, accessToken),
    initialPageParam: 1,
  });
  // console.log("✅ [SERVER] prefetchInfiniteQuery 완료");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoverRequestList
        initialFilters={initialFilters}
        accessToken={accessToken}
      />
    </HydrationBoundary>
  );
}
