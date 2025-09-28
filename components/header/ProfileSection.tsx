// components/header/ProfileSection.tsx
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

export default function ProfileSection({
  userType,
  isAuthenticated,
  me,
  open,
  setOpen,
  logout,
}: {
  userType: "customer" | "mover" | null;
  isAuthenticated: boolean;
  me: any; //@TODO 타입가드 추후 필요
  open: boolean;
  setOpen: (v: boolean) => void;
  logout: () => void;
}) {
  if (!isAuthenticated) {
    return (
      <a
        href="/login"
        className="rounded-lg bg-orange-600 px-6 py-1.5 text-white"
      >
        로그인
      </a>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Image src="/icons/ic_alarm.svg" alt="알람" width={30} height={30} />
      <div className="relative flex items-center gap-2">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
          <Image src="/icons/ic_profile.svg" alt="프로필" width={36} height={36} />
          <span className="font-bold text-black">
            {userType === "mover" ? me?.nickname ?? "기사님" : me?.email ?? "고객님"}
          </span>
        </button>
        {open && (
          <ProfileDropdown userType={userType} me={me} logout={logout} />
        )}
      </div>
    </div>
  );
}
