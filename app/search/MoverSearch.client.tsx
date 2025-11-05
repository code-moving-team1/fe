"use client";

import React, { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useMoverListPage } from "@/hooks/useMovers";
import { useMoverSearchStore } from "@/store/moverSearchStore";
import { getMoverList } from "@/lib/api/mover";
import Grid from "./components/Grid";

type Props = {
  initialParams: {
    q?: string;
    region?: string;
    service?: string; // SMALL | FAMILY | OFFICE
    sort?: "reviews" | "rating" | "quotes";
    page?: number;
  };
};

export default function MoverSearchClient({ initialParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qc = useQueryClient();

  const {
    q,
    region,
    service,
    sort,
    page,
    setQ,
    setRegion,
    setService,
    setSort,
    setPage,
  } = useMoverSearchStore();

  /** 1) URL → 스토어 : 마운트 시 + URL 변경 시 모두 동기화 */
  const spSnapshot = useMemo(() => sp.toString(), [sp]); // 변화를 감지하기 위한 스냅샷
  useEffect(() => {
    const nextQ = (sp.get("q") ?? initialParams.q ?? "") as string;
    const nextRegion = (sp.get("region") ?? initialParams.region ?? null) as
      | string
      | null;
    const nextService = (sp.get("service") ?? initialParams.service ?? null) as
      | string
      | null;
    const nextSort = (sp.get("sort") ?? initialParams.sort ?? "reviews") as
      | "reviews"
      | "rating"
      | "quotes";
    const nextPage = Number(sp.get("page") ?? initialParams.page ?? 1) || 1;

    // 값이 실제로 달라질 때만 스토어 업데이트 (핑퐁 방지)
    if (q !== nextQ) setQ(nextQ);
    if (region !== nextRegion) setRegion(nextRegion);
    if (service !== nextService) setService(nextService);
    if (sort !== nextSort) setSort(nextSort as any);
    if (page !== nextPage) setPage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spSnapshot]); // URL 쿼리 문자열이 바뀔 때마다 동기화

  /** 2) 스토어 → URL : 스토어 변경 시 URL 업데이트 (sp는 의존성에서 제외!) */
  useEffect(() => {
    const next = new URLSearchParams(sp.toString());
    q ? next.set("q", q) : next.delete("q");
    region ? next.set("region", region) : next.delete("region");
    service ? next.set("service", service) : next.delete("service");
    sort ? next.set("sort", sort) : next.delete("sort");
    next.set("page", String(page));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    // sp를 deps에 넣으면 URL→스토어 효과와 루프가 생길 수 있어요.
  }, [q, region, service, sort, page, pathname, router]); // <- sp 없음!

  /** 3) 데이터 패칭 */
  const { data, isFetching } = useMoverListPage({
    q: q || undefined,
    region: region || undefined,
    serviceType: service || undefined,
    sortBy: sort,
    page,
    perPage: 10,
  });

  /** 4) 다음 페이지 프리패치 */
  useEffect(() => {
    if (!data?.totalPages) return;
    const next = page + 1;
    if (next > data.totalPages) return;

    qc.prefetchQuery({
      queryKey: [
        "mover-list",
        {
          q: q || undefined,
          region: region || undefined,
          serviceType: service || undefined,
          sortBy: sort,
          page: next,
          perPage: 10,
        },
      ],
      queryFn: () =>
        getMoverList({
          q: q || undefined,
          region: region || undefined,
          serviceType: service || undefined,
          sortBy: sort,
          page: next,
          perPage: 10,
        }),
    });
  }, [qc, data?.totalPages, page, q, region, service, sort]);

  if (!data) return null;

  return (
    <div>
      <Grid
        items={data.items}
        page={data.page}
        totalPages={data.totalPages ?? 1}
        isFetching={isFetching}
        onPrev={() => setPage(Math.max(1, page - 1))}
        onNext={() =>
          setPage(
            data.totalPages ? Math.min(data.totalPages, page + 1) : page + 1,
          )
        }
      />
    </div>
  );
}
