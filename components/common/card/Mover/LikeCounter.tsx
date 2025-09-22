import Image from "next/image";

interface LikeCounterProps {
  count: number;
  className?: string;
}

export default function LikeCounter({ count, className }: LikeCounterProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      <Image src="/icons/ic_like.svg" alt="좋아요" width={18} height={18} />
      <span className="text-sm text-gray-600">{count}</span>
    </div>
  );
}
