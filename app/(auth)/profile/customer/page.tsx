// app/profile/customer/page.tsx
"use client";

import { useAuthStore } from "@/contexts/authStore";
import { useMe } from "@/hooks/useAuth";

export default function CustomerProfilePage() {
  const { data: me, isLoading, isError } = useMe();
  const userType = useAuthStore().userType;

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !me) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Zustand 고객 타입</h1>
      <p>type : {userType}</p>

      <h1 className="mb-4 text-xl font-bold">ReactQuery 고객 프로필</h1>
      <p>이메일: {me.email}</p>
      <p>전화번호: {me.phone}</p>
      <p>지역: {me.region}</p>
      <p>가입일: {new Date(me.createdAt).toLocaleDateString()}</p>
      <p>서비스 유형: {me.customerServiceTypes?.join(", ")}</p>
    </div>
  );
}
