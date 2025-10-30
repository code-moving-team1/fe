export type Mover = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  intro?: string;
  rating: number; // 평균 평점
  reviews: number; // 리뷰 수
  totalMoves: number; // 진행/확정 수
  likes: number;
  services: string[]; // ["소형이사","가정이사"...]
  regions: string[]; // ["서울","경기"...]
};

export type MoverListParams = {
  q?: string;
  region?: string;
  service?: string;
  sort?: "recent" | "ratingDesc" | "movesDesc";
  page?: number;
  perPage?: number;
};

export type MoverListPage = {
  items: Mover[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export interface MoverApi {
  getMoverList(params: MoverListParams): Promise<MoverListPage>;
}

type DataSource = "mock" | "http";

function pickDataSource(): DataSource {
  // NEXT_PUBLIC_DATA_SOURCE=mock | http
  return (
    (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource | undefined) ?? "mock"
  );
}

// export async function getMoverApi(): Promise<MoverApi> {
//   const src = pickDataSource();
//   if (src === "http") {
//     const mod = await import("./http/moverHttp");
//     return mod.moverHttpApi;
//   }
//   const mod = await import("./mocks/moverMock");
//   return mod.moverMockApi;
// }

// 편의 함수
// export async function getMoverList(params: MoverListParams) {
//   const api = await getMoverApi();
//   return api.getMoverList(params);
// }
