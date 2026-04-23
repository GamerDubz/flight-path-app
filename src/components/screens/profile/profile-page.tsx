"use client";

import { useMemo } from "react";
import { AppIcon, type AppIconName } from "@/components/ui/app-icon";
import { BottomNav } from "@/components/ui/bottom-nav";
import { TopBar } from "@/components/ui/top-bar";
import { useFlights } from "@/lib/flight-store";
import { MOCK_PROFILE } from "@/lib/mock-data";

export default function ProfilePage() {
  const { flights } = useFlights();
  const uniqueAirlines = useMemo(
    () => new Set(flights.map((flight) => flight.airline).filter(Boolean)),
    [flights]
  );
  const uniqueAirports = useMemo(() => {
    const s = new Set<string>();
    for (const f of flights) { s.add(f.origin_iata); s.add(f.destination_iata); }
    return s.size;
  }, [flights]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Profile" />
      <BottomNav />

      <main className="mx-auto flex w-full max-w-lg grow flex-col items-center gap-8 px-5 pb-32 pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-[#007AFF] to-[#0070eb] shadow-[0_8px_24px_rgba(0,112,235,0.3)]">
            <AppIcon name="person" filled className="h-12 w-12 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-headline-lg text-foreground">{MOCK_PROFILE.display_name}</h1>
            <p className="text-body-sm text-(--color-on-surface-variant)">
              Explorer since {new Date(MOCK_PROFILE.created_at).getFullYear()}
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-3 gap-4">
          <div className="glass-card flex flex-col items-center gap-1 p-4">
            <span className="text-headline-lg text-[#007AFF]">{flights.length}</span>
            <span className="text-label-bold text-(--color-on-surface-variant)">Flights</span>
          </div>
          <div className="glass-card flex flex-col items-center gap-1 p-4">
            <span className="text-headline-lg text-[#007AFF]">{uniqueAirports}</span>
            <span className="text-label-bold text-(--color-on-surface-variant)">Countries</span>
          </div>
          <div className="glass-card flex flex-col items-center gap-1 p-4">
            <span className="text-headline-lg text-[#007AFF]">{uniqueAirlines.size}</span>
            <span className="text-label-bold text-(--color-on-surface-variant)">Airlines</span>
          </div>
        </div>

        <div className="glass-panel flex w-full flex-col divide-y divide-(--color-outline-variant)/20 rounded-xl">
          {[
            { icon: "notifications", label: "Notifications" },
            { icon: "cloud_sync", label: "Sync Data" },
            { icon: "palette", label: "Appearance" },
            { icon: "help", label: "Help & Support" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/40 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <AppIcon name={item.icon as AppIconName} className="h-5 w-5 text-(--color-outline)" />
                <span className="text-body-lg text-foreground">{item.label}</span>
              </div>
              <AppIcon name="chevron_right" className="h-5 w-5 text-(--color-outline-variant)" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
