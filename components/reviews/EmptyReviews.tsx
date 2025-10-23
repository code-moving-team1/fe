"use client";
import Link from "next/link";

type Props = {
  message: string;
  illustrationSrc?: string;
  className?: string;
  showWriteButton?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
};

export default function EmptyReviews({
  message,
  illustrationSrc = "/assets/profile-gray.svg",
  className = "",
  showWriteButton = false,
  actionLabel = "리뷰 작성하러 가기",
  onAction,
  actionHref,
}: Props) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center",
        "min-h-[420px] py-20 md:min-h-[520px] md:py-24",
        "bg-white",
        className,
      ].join(" ")}
    >
      {illustrationSrc && (
        <img
          src={illustrationSrc}
          alt="empty"
          className="mb-6 h-36 w-36 opacity-70 select-none md:h-44 md:w-44"
          draggable={false}
        />
      )}

      <p className="mb-6 text-sm text-gray-500 md:text-base">{message}</p>

      {showWriteButton &&
        (onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-[#e64a1b] md:px-6 md:py-2.5"
          >
            {actionLabel}
          </button>
        ) : actionHref ? (
          <Link
            href={actionHref}
            className="rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-[#e64a1b] md:px-6 md:py-2.5"
          >
            {actionLabel}
          </Link>
        ) : null)}
    </div>
  );
}
