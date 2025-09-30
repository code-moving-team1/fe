// components/header/NavMenu.tsx
import Link from "next/link";
import { menuConfig, type MenuItem } from "@/lib/config/header/headerConfigs";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { MeResponse } from "@/types/auth";

interface Props {
  me?: MeResponse;
}

export default function NavMenu({ me }: Props) {
  // 로그인 여부에 따라 guest(비회원) or customer/mover
  const role = me ? ("career" in me ? "mover" : "customer") : "guest";
  const menus: MenuItem[] = menuConfig[role];

  return (
    <div className="flex items-center gap-8">
      {/* 로고 */}
      <Link href="/">
        <Image src={logo} alt="무빙 로고" width={116} height={44} />
      </Link>
      <ul className="text-md flex gap-6 font-bold text-black">
        {menus.map(({ href, label, className }) => (
          <li key={href}>
            <Link href={href} className={className ?? ""}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
