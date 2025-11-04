// components/common/spinner/OrangeSpinner.tsx

"use client";

import React from "react";

type Props = {
  className?: string;
  /** 지름(px) */
  size?: number;
  /** 테두리 두께(px) */
  thickness?: number;
  /** 접근성 라벨 */
  ariaLabel?: string;
};

export function OrangeSpinner({
  className,
  size = 24,
  thickness = 2,
  ariaLabel = "Loading",
}: Props) {
  const colorVar = "var(--primary-orange-400, #F9502E)";

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`animate-spin rounded-full border-current border-t-transparent ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        color: colorVar, // border-current가 이 색을 따라감
        borderWidth: thickness, // 테두리 두께
      }}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

export default OrangeSpinner;
