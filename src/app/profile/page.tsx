"use client";

import { TopBar } from "@/components/ui/top-bar";
import { BottomNav } from "@/components/ui/bottom-nav";
import { AppIcon, type AppIconName } from "@/components/ui/app-icon";
import { MOCK_PROFILE, MOCK_FLIGHTS } from "@/lib/mock-data";

export default function ProfilePage() {
  const uniqueAirlines = new Set(
    MOCK_FLIGHTS.map((f) => f.airline).filter(Boolean)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar title="Profile" />
      <BottomNav />

      <main className="grow pt-24 pb-32 px-5 max-w-lg mx-auto w-full flex flex-col gap-8 items-center">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#007AFF] to-[#0070eb] flex items-center justify-center shadow-[0_8px_24px_rgba(0,112,235,0.3)]">
            <AppIcon name="person" filled className="h-12 w-12 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-headline-lg text-foreground">
              {MOCK_PROFILE.display_name}
            </h1>
            <p className="text-body-sm text-(--color-on-surface-variant)">
              Explorer since{" "}
              {new Date(MOCK_PROFILE.created_at).getFullYear()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="glass-card p-4 flex flex-col items-center gap-1">
            <span className="text-headline-lg text-[#007AFF]">
              {MOCK_FLIGHTS.length}
            </span>
            <span className="text-label-bold text-(--color-on-surface-variant)">
              Flights
            </span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center gap-1">
            <span className="text-headline-lg text-[#007AFF]">
              {MOCK_PROFILE.total_countries}
            </span>
            <span className="text-label-bold text-(--color-on-surface-variant)">
              Countries
            </span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center gap-1">
            <span className="text-headline-lg text-[#007AFF]">
              {uniqueAirlines.size}
            </span>
            <span className="text-label-bold text-(--color-on-surface-variant)">
              Airlines
            </span>
          </div>
        </div>

        {/* Settings List */}
        <div className="w-full glass-panel rounded-xl flex flex-col divide-y divide-(--color-outline-variant)/20">
          {[
            { icon: "notifications", label: "Notifications" },
            { icon: "cloud_sync", label: "Sync Data" },
            { icon: "palette", label: "Appearance" },
            { icon: "help", label: "Help & Support" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center justify-between px-5 py-4 hover:bg-white/40 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <AppIcon name={item.icon as AppIconName} className="h-5 w-5 text-(--color-outline)" />
                <span className="text-body-lg text-foreground">
                  {item.label}
                </span>
              </div>
              <AppIcon name="chevron_right" className="h-5 w-5 text-(--color-outline-variant)" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
