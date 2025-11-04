// components/header/HeaderRefactor.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMe } from "@/hooks/useAuth";

import HeaderLayout from "./HeaderLayout";
import ProfileSection from "./ProfileSection";
import NavMenu from "./NavMenu";
import logo from "@/public/assets/logo.svg";

export default function HeaderRefactor() {
  const { data: me, status } = useMe();
  const [open, setOpen] = useState(false);

  return (
    <HeaderLayout
      left={
        <>
          <Link href="/landing" className="flex items-center md:hidden">
            <Image src={logo} alt="무빙 로고" width={96} height={36} priority />
          </Link>

          <div className="hidden md:flex">
            <NavMenu me={me} />
          </div>
        </>
      }
      right={<ProfileSection me={me} open={open} setOpen={setOpen} />}
      menu={<NavMenu me={me} layout="drawer" />}
    />
  );
}
