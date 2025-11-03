// components/header/ProfileDropdown.tsx
import Link from "next/link";
import {
  profileConfig,
  type MenuItem,
} from "@/lib/config/header/headerConfigs";
import { useLogout } from "@/hooks/useLogout";
import { MeResponse } from "@/types/auth";

export default function ProfileDropdown({
  userType,
  me,
}: {
  userType: "customer" | "mover" | null;
  me: MeResponse;
}) {
  if (!userType) return null;

  const { mutate: logout } = useLogout();
  const menus: MenuItem[] = profileConfig[userType];

  const marginTopClass =
    userType === "customer" ? "mt-66 md:mt-79" : "mt-50 md:mt-59";

  return (
    <div
      className={`absolute right-0 ${marginTopClass} w-30 rounded-lg border border-gray-200 bg-white shadow-lg md:w-45`}
    >
      <div className="px-3 py-3 text-xs font-bold text-gray-800 md:px-4 md:py-4 md:text-sm">
        {me?.name
          ? `${me.name} ${userType === "mover" ? "기사" : "고객"}님`
          : `${userType === "mover" ? "기사" : "고객"}님`}
      </div>

      <ul className="text-xs text-gray-700 md:text-sm">
        {menus.map(({ href, label, className }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block px-3 py-2 hover:bg-gray-100 md:px-4 md:py-2.5 ${className ?? ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => logout()}
        className="w-full cursor-pointer border-t border-gray-100 px-3 py-2 text-center text-xs text-gray-400 md:px-4 md:py-2 md:text-sm"
      >
        로그아웃
      </button>
    </div>
  );
}
