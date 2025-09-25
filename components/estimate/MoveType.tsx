"use client";

import { useEstimateStore } from "@/store/estimateStore";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

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
    <div className="grid grid-cols-3 gap-4">
      {options.map((opt) => {
        const isActive = moveType === opt.label;
        return (
          <button
            key={opt.id}
            onClick={() => setMoveType(opt.label)}
            className={`flex h-48 w-full cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left transition ${
              isActive
                ? "border-red-500 bg-orange-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-2">
              {isActive ? (
                <CheckCircle className="h-5 w-5 text-red-500" />
              ) : (
                <span className="h-5 w-5 rounded-full border border-gray-300" />
              )}
              <div>
                <p
                  className={`font-bold ${
                    isActive ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {opt.label}
                </p>
                <p
                  className={`text-sm ${
                    isActive ? "text-red-400" : "text-gray-500"
                  }`}
                >
                  {opt.desc}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Image src={opt.img} alt={opt.label} width={80} height={80} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
