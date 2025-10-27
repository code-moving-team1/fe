"use client";

import Image from "next/image";
import { useEstimateStore } from "@/store/estimateStore";
import { CheckCircle } from "lucide-react";

export default function MoveType() {
  const { moveType, setMoveType } = useEstimateStore();

  const options = [
    {
      id: "small",
      label: "소형이사",
      desc: "원룸, 투룸, 20평대 미만",
      img: "/assets/소형이사.svg",
    },
    {
      id: "home",
      label: "가정이사",
      desc: "쓰리룸, 20평대 이상",
      img: "/assets/가정이사.svg",
    },
    {
      id: "office",
      label: "사무실이사",
      desc: "사무실, 상업공간",
      img: "/assets/사무실이사.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {options.map((opt) => {
        const active = moveType === opt.label;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMoveType(opt.label)}
            className={[
              "w-full rounded-2xl border p-4 text-left transition",
              "flex items-center justify-between gap-3",
              "md:h-48 md:flex-col md:items-stretch md:justify-between",
              active
                ? "border-red-500 bg-orange-50"
                : "border-gray-200 bg-white hover:bg-gray-50",
            ].join(" ")}
          >
            <div className="flex min-w-0 flex-1 items-start gap-2">
              {active ? (
                <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-red-500" />
              ) : (
                <span className="mt-0.5 h-5 w-5 flex-none rounded-full border border-gray-300" />
              )}

              <div className="min-w-0">
                <p
                  className={`truncate font-bold ${active ? "text-red-500" : "text-gray-900"}`}
                >
                  {opt.label}
                </p>
                <p
                  className={`mt-1 truncate text-sm ${active ? "text-red-400" : "text-gray-500"}`}
                >
                  {opt.desc}
                </p>
              </div>
            </div>

            <div className="flex-none md:flex md:w-full md:justify-end md:self-end">
              <Image
                src={opt.img}
                alt={opt.label}
                width={120}
                height={88}
                className="h-[88px] w-[120px] object-contain md:h-20 md:w-20"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
