import type { Mover } from "@/lib/moverApi";
import { ServiceChip } from "@/components/common/chip/presets";

export default function MoverStatCards({ mover }: { mover: Mover }) {
  return (
    <section className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[1fr_320px]">
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "진행", value: `${mover.totalMoves}건` },
            // { label: "리뷰", value: `${mover.rating.toFixed(1)} ⭐` },
            { label: "리뷰", value: `${(mover.rating ?? 0).toFixed(1)} ⭐` },
            { label: "총 경력", value: `${mover.careerYears}년` },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className="text-zinc-500">{c.label}</div>
              <strong className="text-lg">{c.value}</strong>
            </div>
          ))}
        </div>

        {/* 제공 서비스 */}
        <div className="mt-6">
          <div className="text-lg font-bold">제공 서비스</div>
          <div className="mt-2 flex flex-wrap gap-8">
            {/* {mover.providedServices.map((s) => ( */}
            {(mover.providedServices ?? []).map((s) => (
              <ServiceChip
                key={s}
                className="border border-zinc-200 bg-white text-zinc-700 hover:border-[#FF5A3D] hover:text-[#FF5A3D]"
              >
                {s}
              </ServiceChip>
            ))}
          </div>
        </div>

        {/* 서비스 가능 지역 */}
        <div className="mt-5">
          <div className="text-lg font-bold">서비스 가능 지역</div>
          <div className="mt-2 flex flex-wrap gap-8">
            {/* {mover.regions.map((r) => ( */}
            {(mover.regions ?? []).map((r) => (
              <ServiceChip
                key={r}
                className="border border-zinc-200 bg-white text-zinc-700"
              >
                {r}
              </ServiceChip>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block" />
    </section>
  );
}
