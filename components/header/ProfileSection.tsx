// components/header/ProfileSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import alarmIcon from "@/public/icons/ic_alarm.svg";
import profileIcon from "@/public/icons/ic_profile.svg";
import { MeResponse } from "@/types/auth";
import { useNotifications } from "@/hooks/useNotifications";
import { Spinner } from "../common/spinner/Spinner";
import OrangeSpinner from "../common/spinner/OrangeSpinner";
import CarLoader from "../common/loader/CarLoader";

interface Props {
  me?: MeResponse;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function ProfileSection({ me, open, setOpen }: Props) {
  const [alarmOpen, setAlarmOpen] = useState(false);
  // const { unread, items, loading, onClickItem, onMarkAllRead } =
  //   useNotifications();

  const isAuthed = !!me;
  const { unread, items, loading, onClickItem, onMarkAllRead } =
    useNotifications({ enabled: isAuthed, panelOpen: alarmOpen });

  const profileRef = useRef<HTMLDivElement | null>(null);
  const alarmRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(t)) setOpen(false);
      if (alarmRef.current && !alarmRef.current.contains(t))
        setAlarmOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAlarmOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [setOpen]);

  if (!me) {
    return (
      <a
        href="/login"
        className="rounded-lg bg-orange-600 px-6 py-1.5 text-white"
      >
        로그인
      </a>
    );
  }

  const userType = "career" in me ? "mover" : "customer";

  return (
    <div className="flex items-center gap-6">
      <div ref={alarmRef} className="relative">
        <button
          onClick={() => {
            setAlarmOpen((v) => !v);
            setOpen(false);
          }}
          className="relative"
          aria-label="알림"
        >
          <Image
            src={alarmIcon}
            alt="알림"
            className="mt-2 cursor-pointer"
            width={30}
            height={30}
          />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 mt-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>

        {alarmOpen && (
          <div className="absolute left-1/2 z-[60] mt-2 w-[92vw] max-w-[320px] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white shadow-xl md:w-[360px] md:max-w-none">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 md:px-5">
              <strong className="text-sm font-semibold text-gray-900 md:text-base">
                알림
              </strong>
              <button
                className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 md:text-sm"
                onClick={onMarkAllRead}
              >
                모두 읽음
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto py-1 md:max-h-[60vh] md:py-2">
              {loading ? (
                // <div className="p-4 text-sm text-gray-400">불러오는 중…</div>
                // <div className="grid min-h-[80px] place-items-center py-6">
                //   {/* <Spinner /> */}
                //   <OrangeSpinner thickness={5} />
                // </div>
                <div className="grid min-h-[160px] place-items-center py-6">
                  {/* 한 대만 달리는 기본형 */}
                  {/* <CarLoader height={48} duration={1.6} /> */}

                  {/* 여러 대가 스태거로 달리는 버전 (더 ‘로딩’같은 느낌) */}
                  <CarLoader
                    height={100}
                    duration={1.2}
                    cars={3}
                    stagger={0.6}
                  />
                </div>
              ) : items.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">알림이 없어요.</div>
              ) : (
                items.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onClickItem(n)}
                    className={`cursor-pointer border-b border-gray-100 px-4 py-3 hover:bg-gray-50 md:px-5 ${
                      n.isRead ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    <div className="text-[14px] leading-snug md:text-[15px]">
                      {n.content}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-400 md:text-xs">
                      {new Date(n.createdAt).toLocaleString("ko-KR")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div ref={profileRef} className="relative z-[60] flex items-center gap-2">
        <button
          onClick={() => {
            setOpen(!open);
            setAlarmOpen(false);
          }}
          className="flex cursor-pointer items-center gap-2"
        >
          <Image src={profileIcon} alt="프로필" width={36} height={36} />
          <span className="font-bold text-black">
            {userType === "mover"
              ? (me?.name ?? "기사님")
              : (me?.name ?? "고객님")}
          </span>
        </button>
        {open && <ProfileDropdown userType={userType} me={me} />}
      </div>
    </div>
  );
}
