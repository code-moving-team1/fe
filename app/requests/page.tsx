// app/requests/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { fetchMoveRequests } from "@/lib/api/moveRequest";
import RequestsClient from "./requests.client";
import { moveRequestsKey } from "@/lib/queries/requestKeys";

export default async function RequestsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const initialFilters = { page: 1, pageSize: 5 };
  const qc = new QueryClient();

  await qc.prefetchInfiniteQuery({
    queryKey: moveRequestsKey(initialFilters.page, initialFilters.pageSize),
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...initialFilters, page: pageParam }, accessToken),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <RequestsClient
        initialFilters={initialFilters}
        accessToken={accessToken}
      />
    </HydrationBoundary>
  );
}
