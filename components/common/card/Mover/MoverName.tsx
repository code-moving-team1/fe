import Image from "next/image";

interface MoverNameProps {
  MoverName: string;
  showIcon?: boolean;
  className?: string;
}

export default function MoverName({
  MoverName,
  className,
  showIcon = true,
}: MoverNameProps) {
  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <Image
          src="/icons/ic_moving.svg"
          alt="기사님 아이콘"
          width={18}
          height={18}
        />
      )}
      <h3 className={`font-bold ${className || "text-lg"}`}>
        {MoverName} 기사님
      </h3>
    </div>
  );
}
