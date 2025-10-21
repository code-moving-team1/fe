// components/header/ProfileSection.tsx
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import alarmIcon from "@/public/icons/ic_alarm.svg";
import profileIcon from "@/public/icons/ic_profile.svg";
import { MeResponse } from "@/types/auth";
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";

interface Props {
  me?: MeResponse;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function ProfileSection({ me, open, setOpen }: Props) {
  const [alarmOpen, setAlarmOpen] = useState(false);
  const { unread, items, loading, onClickItem, onMarkAllRead } = useNotifications();
  if (!me) {
    return (
      //@TODO 추후 우리 버튼컴포넌트 사용
      <a
        href="/login"
        className="rounded-lg bg-orange-600 px-6 py-1.5 text-white"
      >
        로그인
      </a>
    );
  }
  console.log(me);

  const userType = "career" in me ? "mover" : "customer";

  return (
    <div className="flex items-center gap-6">
      {/* 알림 버튼 */}
      <div className="relative">
        <button
          onClick={() => setAlarmOpen((v) => !v)}
          className="relative"
          aria-label="알림"
        >
          <Image src={alarmIcon} alt="알림" width={30} height={30} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>

        {/* 알림 패널 */}
        {alarmOpen && (
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border bg-white shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <strong className="text-sm">알림</strong>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={onMarkAllRead}
              >
                모두 읽음
              </button>
            </div>
            <div className="max-h-96 overflow-auto">
              {loading ? (
                <div className="p-4 text-sm text-gray-400">불러오는 중…</div>
              ) : items.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">알림이 없어요.</div>
              ) : (
                items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => onClickItem(n)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                      n.isRead ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    <div className="text-sm">{n.content}</div>
                    <div className="mt-1 text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString("ko-KR")}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 프로필 드롭다운 */}
      <div className="relative flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
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
//   return (
//     <div className="flex items-center gap-6">
//       <Image src={alarmIcon} alt="알람" width={30} height={30} />
//       <div className="relative flex items-center gap-2">
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2"
//         >
//           <Image src={profileIcon} alt="프로필" width={36} height={36} />
//           <span className="font-bold text-black">
//             {userType === "mover"
//               ? (me?.name ?? "기사님")
//               : (me?.name ?? "고객님")}
//           </span>
//         </button>
//         {open && <ProfileDropdown userType={userType} me={me} />}
//       </div>
//     </div>
//   );
// }
