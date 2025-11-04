"use client";

import Image from "next/image";
import React from "react";
// 팀원이 올려준 svg 경로. (예: /public/assets/car.svg)
// 혹은 system 안내대로 /mnt/data/car.svg 를 프로젝트로 복사해서 /public/assets/car.svg 로 두세요.
import carSvg from "@/public/assets/car.svg";

type Props = {
  /** 컨테이너 높이(px) */
  height?: number;
  /** 한 번 지나가는 데 걸리는 시간(s) */
  duration?: number;
  /** 여러 대를 겹쳐서 더 “로딩감”을 줄지 */
  cars?: number;
  /** 스태거(지연) 비율 (0~1) */
  stagger?: number;
  className?: string;
  ariaLabel?: string;
};

export default function CarLoader({
  height = 56,
  duration = 1.8,
  cars = 1,
  stagger = 0.35,
  className,
  ariaLabel = "Loading",
}: Props) {
  const carArray = Array.from({ length: cars });

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ height }}
    >
      {/* 도로(옵션) */}
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gray-200" />

      {carArray.map((_, i) => (
        <div
          key={i}
          className="car-loader__car top-1/2 left-0 -translate-y-1/2"
          style={{
            animation: `car-move ${duration}s linear infinite`,
            // 각 차의 시작 시간을 조금씩 뒤로 미뤄서 연속감
            animationDelay: `-${(duration * stagger * i).toFixed(2)}s`,
            willChange: "transform",
          }}
        >
          <Image
            src={carSvg}
            alt=""
            // width={Math.round(height * 1.6)}
            width={Math.round(height * 0.8)}
            height={Math.round(height * 0.8)}
            priority
            draggable={false}
          />
        </div>
      ))}

      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
