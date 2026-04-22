"use client";

import Link from "next/link";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export function TopBar({
  title = "Flight Path",
  showBack = false,
  backHref = "/",
  rightAction,
}: TopBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-(--color-outline-variant) shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-[60px]">
      {showBack ? (
        <Link
          href={backHref}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-(--color-surface-container) hover:bg-(--color-surface-container-high) transition-colors"
        >
          <span className="material-symbols-outlined text-foreground text-[20px]">arrow_back</span>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#007AFF] text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            flight_takeoff
          </span>
        </div>
      )}

      <h1 className="font-extrabold tracking-tight text-foreground text-[17px]">
        {title}
      </h1>

      {rightAction ?? (
        <div className="w-9 h-9 rounded-full overflow-hidden bg-(--color-primary) flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            person
          </span>
        </div>
      )}
    </header>
  );
}
