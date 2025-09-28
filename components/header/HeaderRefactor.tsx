// components/header/HeaderRefactor.tsx
"use client";

import { useState } from "react";
import { useAuthStore } from "@/contexts/authStore";
import { useMe } from "@/hooks/useAuth";

import HeaderLayout from "./HeaderLayout";
import ProfileSection from "./ProfileSection";
import NavMenu from "./NavMenu";

export default function HeaderRefactor() {
  const { userType, isAuthenticated, logout } = useAuthStore();
  const { data: me } = useMe();
  const [open, setOpen] = useState(false);

  return (
    <HeaderLayout
      left={<NavMenu userType={userType} isAuthenticated={isAuthenticated()} />}
      right={
        <ProfileSection
          userType={userType}
          isAuthenticated={isAuthenticated()}
          me={me}
          open={open}
          setOpen={setOpen}
          logout={logout}
        />
      }
    />
  );
}
