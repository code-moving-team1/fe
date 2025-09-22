interface CardPriceProps {
  amount: number;
  showLabel?: boolean;
  className?: string;
}

export default function CardPrice({
  amount,
  className,
  showLabel = true,
}: CardPriceProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {showLabel && <span className="text-sm text-gray-500">견적 금액</span>}
      <span className="text-xl font-bold text-black">
        {amount.toLocaleString()}원
      </span>
    </div>
  );
}
