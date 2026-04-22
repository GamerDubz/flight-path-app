"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "explore", label: "Explore" },
  { href: "/trips", icon: "flight_land", label: "My Trips" },
  { href: "/passport", icon: "book", label: "Passport" },
  { href: "/profile", icon: "person", label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[68px] flex justify-around items-center px-4 pb-safe z-50 bg-white border-t border-(--color-outline-variant) shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center min-w-[60px] transition-all ${
              isActive ? "text-[#007AFF]" : "text-(--color-on-surface-variant)/60 hover:text-[#007AFF]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px] mb-0.5"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-[#007AFF]" : "text-(--color-on-surface-variant)/50"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
