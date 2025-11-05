"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import FavoritesAside from "./FavoritesAside";
import { getTopLikedMovers, type Mover } from "@/lib/api/mover";

// 프레젠테이션 컴포넌트가 기대하는 형태
type Fav = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  badge?: string;
  rating?: number;
  moves?: number;
  confirmed?: number;
};

// API(Mover) -> Fav 매핑
function toFav(m: Mover): Fav {
  return {
    id: String(m.id), // ← 여기! number -> string
    name: m.name?.trim() || m.nickname?.trim() || "이사 기사님",
    title: m.introduction?.trim() || m.description?.trim() || "",
    avatarUrl:
      (m.img && m.img.trim?.()) ||
      (m.avatarUrl && m.avatarUrl.trim?.()) ||
      "/assets/profile_mover_detail.svg",
    // (선택) 첫 서비스 타입을 뱃지로 노출
    badge:
      Array.isArray(m.services) && m.services.length > 0
        ? m.services[0]
        : undefined,
    // 평균 평점/대체 필드 사용
    rating:
      typeof m.averageRating === "number"
        ? m.averageRating
        : typeof m.rating === "number"
          ? m.rating
          : 0,
    // 이동/확정 건수(백엔드 스키마에 맞춰 유연 처리)
    moves: (m as any)._count?.reviews ?? 0,
    confirmed: (m as any)?._count?.quotes ?? 0,
  };
}

export default function FavoritesAsideContainer() {
  const { data } = useQuery({
    queryKey: ["mover-top-liked"],
    queryFn: getTopLikedMovers, // GET /mover/likes
    staleTime: 60_000,
  });
  // console.log("찜한기사님목록 data :", data);
  const items: Fav[] = (data ?? []).map(toFav);

  return <FavoritesAside items={items} />;
}
