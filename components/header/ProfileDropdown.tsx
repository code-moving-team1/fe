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

  return (
    <div className="absolute top-full left-0 mt-2 w-45 rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="px-4 py-4 text-sm font-bold text-gray-800">
        {/* {me?.name ?? (userType === "mover" ? "기사" : "고객")}님 */}
        {me?.name
          ? `${me.name} ${userType === "mover" ? "기사" : "고객"}님`
          : `${userType === "mover" ? "기사" : "고객"}님`}
      </div>

      <ul className="text-sm text-gray-700">
        {menus.map(({ href, label, className }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block px-4 py-2.5 hover:bg-gray-100 ${className ?? ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => logout()}
        className="w-full cursor-pointer border-t border-gray-100 px-4 py-2 text-center text-sm text-gray-400"
      >
        로그아웃
      </button>
    </div>
  );
}
