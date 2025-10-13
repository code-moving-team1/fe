// lib/utils/date.ts
export function formatDateSeoul(input: string | number | Date) {
  const d = new Date(input);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul", // ← 서버/클라 모두 동일 타임존 고정
  }).format(d);
}
