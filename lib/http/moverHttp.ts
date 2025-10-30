// // lib/http/moverHttp.ts
// import type {
//   MoverApi,
//   MoverListPage,
//   MoverListParams,
// } from "../moverSearchApi";

// const BASE =
//   process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
//   "http://localhost:4000/api";

// export const moverHttpApi: MoverApi = {
//   async getMoverList(params: MoverListParams): Promise<MoverListPage> {
//     const qs = new URLSearchParams();
//     if (params.q) qs.set("q", params.q);
//     if (params.region) qs.set("region", params.region);
//     if (params.service) qs.set("service", params.service);
//     if (params.sort) qs.set("sort", params.sort);
//     if (params.page) qs.set("page", String(params.page));
//     if (params.perPage) qs.set("perPage", String(params.perPage));

//     const res = await fetch(`${BASE}/movers?${qs.toString()}`, {
//       cache: "no-store",
//       next: { revalidate: 0 },
//     });
//     if (!res.ok) throw new Error("Failed to fetch mover list");
//     // 백엔드 응답 스키마 ↔ MoverListPage 매핑만 맞춰주면 끝
//     return res.json();
//   },
// };
