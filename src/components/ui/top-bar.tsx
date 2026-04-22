"use client";

import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export function TopBar({
  title = "Flight Path",
  showBack = false,
  backHref = "/home",
  rightAction,
}: TopBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-(--color-outline-variant) shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-[60px]">
      {showBack ? (
        <Link
          href={backHref}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-(--color-surface-container) hover:bg-(--color-surface-container-high) transition-colors"
        >
          <AppIcon name="arrow_back" className="h-5 w-5 text-foreground" />
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <AppIcon name="flight_takeoff" filled className="h-6 w-6 text-[#007AFF]" />
        </div>
      )}

      <h1 className="font-extrabold tracking-tight text-foreground text-[17px]">
        {title}
      </h1>

      {rightAction ?? (
        <div className="w-9 h-9 rounded-full overflow-hidden bg-(--color-primary) flex items-center justify-center">
          <AppIcon name="person" filled className="h-[18px] w-[18px] text-white" />
        </div>
      )}
    </header>
  );
}
