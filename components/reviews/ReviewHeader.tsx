// components/reviews/ReviewsHeader.tsx
"use client";
type TabKey = "writable" | "written";
type Props = {
  active: TabKey;
  onTab: (t: TabKey) => void;
  showSort: boolean;
  sort: string;
  onChangeSort: (s: string) => void;
};
const TABS: { key: TabKey; label: string }[] = [
  { key: "writable", label: "작성 가능한 리뷰" },
  { key: "written", label: "내가 작성한 리뷰" },
];

export default function ReviewsHeader({
  active,
  onTab,
  showSort,
  sort,
  onChangeSort,
}: Props) {
  return (
    <nav className="flex items-end justify-between gap-2 md:flex-row md:items-center md:gap-12">
      <div className="flex min-w-0 flex-1 gap-6 overflow-x-auto whitespace-nowrap md:gap-12 md:overflow-visible">
        {TABS.map((t) => {
          const on = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onTab(t.key)}
              aria-current={on ? "page" : undefined}
              className={`relative cursor-pointer py-3 text-[15px] font-semibold md:py-6 md:text-[17px] ${
                on ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="relative inline-block pb-1 md:pb-2">
                {t.label}
                {on && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-16 -translate-x-1/2 rounded-full bg-gray-900 md:w-24" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {showSort && (
        <div className="relative mb-2 shrink-0 -translate-y-[1px] self-end pl-2 md:translate-y-0 md:self-auto">
          <select
            className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm md:text-base"
            value={sort}
            onChange={(e) => onChangeSort(e.target.value)}
          >
            <option value="recent">리뷰 등록 최신순</option>
            <option value="oldest">리뷰 등록 오래된순</option>
            <option value="rating_desc">평점 높은순</option>
            <option value="rating_asc">평점 낮은순</option>
          </select>
        </div>
      )}
    </nav>
  );
}
