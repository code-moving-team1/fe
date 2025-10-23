// hooks/useMoverDescriptions.ts
import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getMoverDetail } from "@/lib/api/mover";

type AnyItem = Record<string, any>;

export default function useMoverDescriptions({
  writtenItems = [],
  writableItems = [],
}: {
  writtenItems?: AnyItem[];
  writableItems?: AnyItem[];
}) {
  const descByMoverId = useMemo(() => {
    const map = new Map<string | number, string>();
    for (const w of writableItems) {
      if (
        w?.moverId &&
        typeof w.moverDescription === "string" &&
        w.moverDescription.trim()
      ) {
        map.set(w.moverId, w.moverDescription.trim());
      }
    }
    return map;
  }, [writableItems]);

  const missingIds = useMemo(() => {
    const ids: (string | number)[] = [];
    for (const it of writtenItems) {
      const hasWritten =
        typeof it?.moverDescription === "string" && it.moverDescription.trim();
      if (!hasWritten && it?.moverId && !descByMoverId.has(it.moverId)) {
        ids.push(it.moverId);
      }
    }
    return Array.from(new Set(ids));
  }, [writtenItems, descByMoverId]);

  const detailQueries = useQueries({
    queries: missingIds.map((id) => ({
      queryKey: ["mover", id],
      queryFn: () => getMoverDetail(String(id)),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const profileDescById = useMemo(() => {
    const map = new Map<string | number, string>();
    detailQueries.forEach((q, idx) => {
      const id = missingIds[idx];
      const d: any = q.data;
      const desc = [d?.introduction, d?.description]
        .filter((v) => typeof v === "string" && v.trim())
        .join(" ");
      if (desc) map.set(id, desc);
    });
    return map;
  }, [detailQueries, missingIds]);

  const getDesc = (item: AnyItem, moverDescription: any) => {
    if (
      typeof item?.moverDescription === "string" &&
      item.moverDescription.trim()
    ) {
      return item.moverDescription.trim();
    }
    if (item?.moverId) {
      return (
        descByMoverId.get(item.moverId) ||
        profileDescById.get(item.moverId) ||
        ""
      );
    }
    return "";
  };

  return { descByMoverId, profileDescById, getDesc };
}
