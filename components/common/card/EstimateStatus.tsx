import Image from "next/image";

interface EstimateStatusProps {
  status: "confirmed" | "waiting";
  className?: string;
  size?: number;
}

export default function EstimateStatus({
  status,
  className,
  size = 18,
}: EstimateStatusProps) {
  if (status === "confirmed") {
    return (
      <div className={`flex items-center gap-1 ${className || ""}`}>
        <Image
          src="/icons/ic_check.svg"
          alt="확정 아이콘"
          width={size}
          height={size}
        />
        <span className="text-red-500 text-sm font-medium">확정견적</span>
      </div>
    );
  }

  if (status === "waiting") {
    return (
      <span
        className={`ml-3 text-gray-400 text-sm font-medium ${className || ""}`}
      >
        견적대기
      </span>
    );
  }

  return null;
}
