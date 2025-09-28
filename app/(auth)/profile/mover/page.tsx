// app/profile/mover/page.tsx
"use client";

import { useMe } from "@/hooks/useAuth";

export default function MoverProfilePage() {
  const { data: me, isLoading, isError } = useMe();

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !me) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">기사 프로필</h1>
      <p>이메일: {me.email}</p>
      <p>전화번호: {me.phone}</p>
      <p>닉네임: {me.nickname}</p>
      <p>경력: {me.career}</p>
      <p>자기소개: {me.introduction}</p>
      <p>설명: {me.description}</p>
      <p>평점: {me.averageRating} ({me.totalReviews} 리뷰)</p>
      <p>서비스 유형: {me.moverServiceTypes?.join(", ")}</p>
    </div>
  );
}
