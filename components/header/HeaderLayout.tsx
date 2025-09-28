// components/header/HeaderLayout.tsx
import { ReactNode } from "react";

export default function HeaderLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <header>
      <nav className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8 pl-[160px]">{left}</div>
        <div className="flex pr-[160px]">{right}</div>
      </nav>
    </header>
  );
}
