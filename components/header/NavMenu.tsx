import Link from "next/link";
import { menuConfig, type MenuItem } from "@/lib/config/header/headerConfigs";

interface Props {
  userType: "customer" | "mover" | null;
  isAuthenticated: boolean;
}

export default function NavMenu({ userType, isAuthenticated }: Props) {
  // 로그인 여부에 따라 guest or customer/mover
  const role = !isAuthenticated ? "guest" : (userType ?? "guest");
  const menus: MenuItem[] = menuConfig[role];

  return (
    <ul className="text-md flex gap-6 font-bold text-black">
      {menus.map(({ href, label, className }) => (
        <li key={href}>
          <Link href={href} className={className ?? ""}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
