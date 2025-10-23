// components/header/NavMenu.tsx
import Link from "next/link";
import { menuConfig, type MenuItem } from "@/lib/config/header/headerConfigs";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { MeResponse } from "@/types/auth";

interface Props {
  me?: MeResponse;
  layout?: "horizontal" | "drawer";
  className?: string;
}

export default function NavMenu({
  me,
  layout = "horizontal",
  className,
}: Props) {
  const role = me ? ("career" in me ? "mover" : "customer") : "guest";
  const menus: MenuItem[] = menuConfig[role];

  const isDrawer = layout === "drawer";

  return (
    <div
      className={
        className ??
        (isDrawer ? "flex flex-col gap-3" : "flex items-center gap-8")
      }
    >
      <Link href="/landing" className={isDrawer ? "mb-1" : ""}>
        <Image
          src={logo}
          alt="무빙 로고"
          width={isDrawer ? 96 : 116}
          height={isDrawer ? 36 : 44}
          priority
        />
      </Link>

      <ul
        className={
          isDrawer
            ? "flex flex-col space-y-1 text-[15px] font-medium text-black"
            : "text-md flex gap-6 font-bold text-black"
        }
      >
        {menus.map(({ href, label, className: itemClass }) => (
          <li key={href}>
            <Link
              href={href}
              className={
                isDrawer
                  ? `block rounded-lg px-3 py-2 hover:bg-gray-50 ${itemClass ?? ""}`
                  : (itemClass ?? "")
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
