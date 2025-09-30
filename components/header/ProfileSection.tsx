// components/header/ProfileSection.tsx
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import alarmIcon from "@/public/icons/ic_alarm.svg";
import profileIcon from "@/public/icons/ic_profile.svg";
import { MeResponse } from "@/types/auth";

interface Props {
  me?: MeResponse;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function ProfileSection({ me, open, setOpen }: Props) {
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

  const userType = "career" in me ? "mover" : "customer";

  return (
    <div className="flex items-center gap-6">
      <Image src={alarmIcon} alt="알람" width={30} height={30} />
      <div className="relative flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <Image src={profileIcon} alt="프로필" width={36} height={36} />
          <span className="font-bold text-black">
            {userType === "mover"
              ? (me?.nickname ?? "기사님")
              : (me?.email ?? "고객님")}
          </span>
        </button>
        {open && <ProfileDropdown userType={userType} me={me} />}
      </div>
    </div>
  );
}
