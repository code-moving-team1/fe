// app/requests/requests.client.tsx
"use client";

import { MoverTabs } from "@/components/common/tab/MoverTabs";
import { useMoveRequestTab } from "@/hooks/useMoveRequestTab";
import NormalList from "./_NomalList";
import DirectList from "./_DirectList";

type Props = {
  initialFilters: { page: number; pageSize: number };
  accessToken?: string;
};

export default function RequestsClient({ initialFilters }: Props) {
  const { tab, onTabChange } = useMoveRequestTab();

  return (
    <div className="mx-auto max-w-[1120px] space-y-6 p-2 sm:p-8">
      <h1 className="m-0 ml-2 text-[22px] font-bold sm:text-[24px]">
        이사 요청
      </h1>
      <MoverTabs value={tab} onChange={onTabChange} />
      {tab === "normal" && <NormalList initialFilters={initialFilters} />}
      {tab === "direct" && <DirectList />}
    </div>
  );
}
