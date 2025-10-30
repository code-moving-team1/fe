// // lib/mocks/moverMock.ts
// import type {
//   Mover,
//   MoverApi,
//   MoverListPage,
//   MoverListParams,
// } from "../moverSearchApi";

// const REGIONS = ["서울", "경기", "인천", "대전", "충남", "전북"] as const;

// const MOCK: Mover[] = Array.from({ length: 73 }).map((_, i) => {
//   const n = i + 1;
//   const svcs = ["소형이사", ...(Math.random() > 0.5 ? ["가정이사"] : [])];
//   if (Math.random() > 0.8) svcs.push("사무실이사");
//   const regs = [REGIONS[n % REGIONS.length], REGIONS[(n + 2) % REGIONS.length]];

//   return {
//     id: String(n),
//     name: `김무빙 기사님 ${n}`,
//     avatarUrl: "/assets/profile_mover_detail.svg",
//     intro: "안전하고 신속하게 모십니다.",
//     rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
//     reviews: 50 + Math.floor(Math.random() * 200),
//     totalMoves: 100 + Math.floor(Math.random() * 1000),
//     likes: 100 + Math.floor(Math.random() * 1000),
//     services: svcs,
//     regions: regs,
//   };
// });

// function applyFilters(items: Mover[], p: MoverListParams) {
//   let out = items.slice();

//   if (p.q) {
//     const q = p.q.toLowerCase();
//     out = out.filter(
//       (m) =>
//         m.name.toLowerCase().includes(q) ||
//         (m.intro ?? "").toLowerCase().includes(q),
//     );
//   }
//   if (p.region) out = out.filter((m) => m.regions.includes(p.region!));
//   if (p.service) out = out.filter((m) => m.services.includes(p.service!));

//   switch (p.sort) {
//     case "ratingDesc":
//       out.sort((a, b) => b.rating - a.rating);
//       break;
//     case "movesDesc":
//       out.sort((a, b) => b.totalMoves - a.totalMoves);
//       break;
//     default:
//       out.sort((a, b) => Number(b.id) - Number(a.id)); // recent
//   }
//   return out;
// }

// export const moverMockApi: MoverApi = {
//   async getMoverList(params): Promise<MoverListPage> {
//     await new Promise((r) => setTimeout(r, 200)); // demo 지연
//     const page = Math.max(1, params.page ?? 1);
//     const perPage = params.perPage ?? 10;

//     const filtered = applyFilters(MOCK, params);
//     const total = filtered.length;
//     const totalPages = Math.max(1, Math.ceil(total / perPage));
//     const start = (page - 1) * perPage;
//     const items = filtered.slice(start, start + perPage);

//     return { items, page, perPage, total, totalPages };
//   },
// };
