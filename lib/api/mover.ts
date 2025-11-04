import axios from "@/lib/api/axiosClient.client";
import serverApi from "./axiosClient.server";

export type Region =
  | "서울"
  | "경기"
  | "인천"
  | "부산"
  | "대전"
  | "대구"
  | "광주"
  | "울산"
  | "세종"
  | "강원"
  | "충북"
  | "충남"
  | "전북"
  | "전남"
  | "경북"
  | "경남"
  | "제주";

export type ServiceType = "SMALL" | "FAMILY" | "OFFICE";
export type SortBy = "reviews" | "rating" | "quotes";

export type Mover = {
  id: number;
  img?: string | null;
  avatarUrl?: string | null;
  nickname?: string;
  name?: string;
  intro?: string | null;
  introduction?: string | null;
  description?: string | null;
  averageRating?: number;
  rating?: number;
  _count?: { reviews: number; quotes: number; likes: number };
  reviews?: number;
  confirmedCount?: number;
  totalMoves?: number;

  /** ✅ 표준화된 필드들 */
  services?: ServiceType[];
  regions?: Region[];
  careerYears?: number; // ← 경력(연차) 표준 필드
  career?: number; // ← 하위호환(카드가 career를 볼 수도 있어서 같이 둠)
};

export type MoversListParams = {
  q?: string;
  region?: Region | string;
  serviceType?: ServiceType | string;
  sortBy?: SortBy | string;
  page?: number;
  perPage?: number;
};

export type MoversListPage = {
  items: Mover[];
  page: number;
  perPage?: number;
  totalPages?: number;
  total?: number;
};

const ROOT = "/mover";

/* ---------------- helpers ---------------- */
function compact<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

function toNum(v: unknown, fallback = 0) {
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const n = parseInt(v.replace(/[^\d\-]/g, ""), 10); // "5년" → 5
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function pickServices(item: any): ServiceType[] {
  if (Array.isArray(item?.services)) return item.services as ServiceType[];
  if (Array.isArray(item?.moverServiceTypes)) {
    return item.moverServiceTypes
      .map((s: any) => (typeof s === "string" ? s : s?.serviceType))
      .filter(Boolean) as ServiceType[];
  }
  if (typeof item?.serviceType === "string") {
    return [item.serviceType as ServiceType];
  }
  return [];
}

function pickRegions(item: any): Region[] {
  if (Array.isArray(item?.regions)) return item.regions as Region[];
  if (Array.isArray(item?.moverRegions)) {
    return item.moverRegions
      .map((r: any) => (typeof r === "string" ? r : r?.region))
      .filter(Boolean) as Region[];
  }
  return [];
}

/** ✅ 경력(연차) 표준화 */
function pickCareerYears(item: any): number {
  return toNum(
    item?.careerYears ??
      item?.career ??
      item?.experienceYears ??
      item?.years ??
      item?.profile?.careerYears ??
      item?.profile?.career,
    0,
  );
}

/** 리스트 아이템 정규화 */
function normalizeMover(item: any): Mover {
  const _count =
    item?._count ??
    ({
      reviews: Number(item?.reviews ?? 0),
      quotes: Number(item?.quotes ?? item?.confirmedCount ?? 0),
      likes: Number(item?.likes ?? 0),
    } as Mover["_count"]);

  const careerYears = pickCareerYears(item);

  return {
    id: Number(item.id),
    img: item.img ?? null,
    avatarUrl: item.avatarUrl ?? null,
    nickname: item.nickname ?? item.name ?? undefined,
    name: item.name ?? item.nickname ?? undefined,
    intro: item.intro ?? item.introduction ?? null,
    introduction: item.introduction ?? item.intro ?? null,
    description: item.description ?? null,
    averageRating:
      item.averageRating ?? (typeof item.rating === "number" ? item.rating : 0),
    rating: item.rating ?? item.averageRating ?? 0,
    _count,
    reviews: Number(item.reviews ?? _count?.reviews ?? 0),
    confirmedCount: Number(
      item.confirmedCount ?? _count?.quotes ?? item.quotes ?? 0,
    ),
    totalMoves: item.totalMoves,

    services: pickServices(item),
    regions: pickRegions(item),

    /** ✅ 경력 표준 필드 두 개 모두 채워줌 */
    careerYears,
    career: careerYears,
  };
}

/* ---------------- APIs ---------------- */
export async function getMoverList(
  params: MoversListParams,
): Promise<MoversListPage> {
  const query = compact({
    searchText: params.q, // ← 서버 명세
    region: params.region,
    serviceType: params.serviceType,
    sortBy: params.sortBy,
    page: params.page ?? 1,
    perPage: params.perPage ?? 10,
  });

  const res = await axios.get(ROOT, { params: query });
  const data = res.data;

  if (Array.isArray(data)) {
    return {
      items: data.map(normalizeMover),
      page: params.page ?? 1,
      perPage: params.perPage,
      totalPages: undefined,
      total: undefined,
    };
  }

  const items = Array.isArray(data?.items) ? data.items : data;
  return {
    items: items.map(normalizeMover),
    page: Number(data?.page ?? params.page ?? 1),
    perPage: Number(data?.perPage ?? params.perPage ?? 10),
    totalPages: data?.totalPages != null ? Number(data.totalPages) : undefined,
    total: data?.total != null ? Number(data.total) : undefined,
  };
}

export async function getMoverDetail(id: number | string) {
  const res = await serverApi.get(`${ROOT}/${id}`);
  return res.data;
}

export async function getMyProfile(cookieHeader: string) {
  const res = await serverApi.get(`${ROOT}/my-profile`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res.data;
}

export async function getTopLikedMovers(): Promise<Mover[]> {
  const res = await axios.get(`${ROOT}/likes`);
  const data = res.data;
  const list = Array.isArray(data) ? data : (data?.items ?? []);
  return list.map(normalizeMover);
}
