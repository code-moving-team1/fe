"use client";

import { ReactNode, useEffect, useState } from "react";

const CONTAINER = "mx-auto w-full max-w-6xl px-4";

export default function HeaderLayout({
  left,
  right,
  menu,
}: {
  left: ReactNode;
  right: ReactNode;
  menu?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-30 border-b border-gray-100 bg-white">
      <nav className="whitespace-nowrap">
        <div className={`${CONTAINER} flex items-center justify-between py-2`}>
          <div className="flex items-center gap-3 md:min-w-0 md:flex-1 md:gap-6 [&>*:first-child]:shrink-0">
            {left}
          </div>

          <div className="ml-3 flex flex-shrink-0 items-center gap-3 sm:gap-4 md:gap-5">
            {right}

            <button
              type="button"
              aria-label="메뉴 열기"
              aria-controls="mobile-drawer"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <button
          aria-label="메뉴 닫기"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 z-50 h-full w-[78%] max-w-[320px] bg-white shadow-xl transition-transform duration-200 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div className="text-base font-semibold">메뉴</div>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="no-scrollbar h-[calc(100%-52px)] overflow-y-auto px-4 py-3"
          onClick={(e) => {
            const el = e.target as HTMLElement;
            if (el.closest("a")) setOpen(false);
          }}
        >
          {menu ?? (
            <ul className="space-y-1 text-[15px]">
              <li>
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/request"
                >
                  견적 요청
                </a>
              </li>
              <li>
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/movers"
                >
                  기사님 찾기
                </a>
              </li>
              <li>
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/quotes"
                >
                  내 견적 관리
                </a>
              </li>
              <li>
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/reviews"
                >
                  리뷰
                </a>
              </li>
              <li>
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/support"
                >
                  고객센터
                </a>
              </li>
            </ul>
          )}
        </div>
      </aside>
    </header>
  );
}
