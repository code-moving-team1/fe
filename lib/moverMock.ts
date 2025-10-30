// import type { Mover, ReviewsPage } from "./moverApi";

// const mover: Mover = {
//   id: "m1",
//   nickname: "김무버",
//   intro:
//     "친절하고 빠른 이사 전문 무버입니다. 소형/가정/사무실 이사 가능합니다.",
//   avatarUrl: "https://picsum.photos/seed/mover/200/200",
//   likes: 136,
//   careerYears: 7,
//   totalMoves: 334,
//   rating: 4.8,
//   providedServices: ["소형이사", "가정이사", "사무실이사"],
//   regions: ["서울", "경기", "인천"],
// };

// const reviews = Array.from({ length: 47 }, (_, i) => ({
//   id: String(i + 1),
//   nickname: `cus***${(i % 9) + 1}`,
//   rating: [5, 4, 5, 5, 3, 4, 5][i % 7],
//   createdAt: new Date(Date.now() - i * 86400000).toISOString(),
//   content:
//     i % 5
//       ? "가격/응대/속도 모두 만족입니다."
//       : "시간 약속도 잘 지켜주시고, 정리까지 깔끔!",
// }));

// export async function mockGetMover(moverId: string): Promise<Mover> {
//   await delay(200);
//   return { ...mover, id: moverId };
// }

// export async function mockGetMoverReviewsByPage(
//   moverId: string,
//   page = 1,
//   limit = 10,
//   opts?: {
//     rating?: number | null;
//     sort?: "recent" | "helpful" | "ratingDesc" | "ratingAsc";
//   },
// ): Promise<ReviewsPage> {
//   await delay(200);
//   let list = reviews.slice();

//   if (opts?.rating) list = list.filter((r) => r.rating === opts.rating);
//   switch (opts?.sort) {
//     case "ratingDesc":
//       list.sort((a, b) => b.rating - a.rating);
//       break;
//     case "ratingAsc":
//       list.sort((a, b) => a.rating - b.rating);
//       break;
//     case "helpful":
//       list.sort(
//         (a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt),
//       );
//       break;
//     default:
//       list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
//   }

//   const total = list.length;
//   const totalPages = Math.max(1, Math.ceil(total / limit));
//   const start = (page - 1) * limit;
//   const items = list.slice(start, start + limit);

//   const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<
//     1 | 2 | 3 | 4 | 5,
//     number
//   >;
//   list.forEach((r) => breakdown[r.rating as 1 | 2 | 3 | 4 | 5]++);
//   const avg = total
//     ? +(list.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
//     : 0;

//   return { items, page, pageSize: limit, total, totalPages, avg, breakdown };
// }

// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
