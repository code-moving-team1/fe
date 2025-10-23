// components/reviews/ReviewCardSkeleton.tsx
export default function ReviewCardSkeleton({
  showPrice = true,
  showButton = true,
}: {
  showPrice?: boolean;
  showButton?: boolean;
}) {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 md:gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gray-200 md:h-[80px] md:w-[80px]" />
          <div className="mt-1 flex flex-col gap-2">
            <div className="h-5 w-28 rounded bg-gray-200 md:w-[180px]" />
            <div className="h-4 w-40 rounded bg-gray-200 md:w-[520px]" />
            <div className="mt-1 h-7 w-20 rounded-full bg-gray-200 md:w-[84px]" />
          </div>
        </div>
        {showPrice && (
          <div className="ml-auto flex flex-col items-end gap-1 md:mt-5 md:gap-2">
            <div className="h-4 w-[56px] rounded bg-gray-200 md:w-[60px]" />
            <div className="h-6 w-[120px] rounded bg-gray-200 md:h-7 md:w-[140px]" />
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-200" />
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div>
            <div className="mb-1 h-3 w-10 rounded bg-gray-200 md:w-12" />
            <div className="h-4 w-28 rounded bg-gray-200 md:w-[150px]" />
          </div>
          <div className="mt-4 h-4 w-4 rounded bg-gray-200" />
          <div>
            <div className="mb-1 h-3 w-10 rounded bg-gray-200 md:w-12" />
            <div className="h-4 w-28 rounded bg-gray-200 md:w-[150px]" />
          </div>
          <div className="hidden md:block">
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-5 w-[120px] rounded bg-gray-200" />
          </div>
        </div>

        {showButton && (
          <div className="w-full md:w-auto">
            <div className="h-10 w-full rounded-lg bg-gray-200 md:w-[100px]" />
          </div>
        )}
      </div>
    </div>
  );
}
