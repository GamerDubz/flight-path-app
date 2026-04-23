"use client";

import { AppIcon, type AppIconName } from "@/components/ui/app-icon";
import { BottomNav } from "@/components/ui/bottom-nav";
import { TopBar } from "@/components/ui/top-bar";
import { useFlights } from "@/lib/flight-store";
import {
  MOCK_LANDMARKS,
  MOCK_MATERIALS,
  MOCK_STAMPS,
  MOCK_UNLOCKED_LANDMARK_IDS,
} from "@/lib/mock-data";

const materialIconNames: Record<string, AppIconName> = {
  bolt: "bolt",
  star: "star",
  diamond: "diamond",
};

const continentPages = (() => {
  const pages: Record<string, typeof MOCK_STAMPS> = {};

  for (const stamp of MOCK_STAMPS) {
    const continent = stamp.continent ?? "Other";
    if (!pages[continent]) pages[continent] = [];
    pages[continent].push(stamp);
  }

  return Object.entries(pages);
})();

const stampRotations = ["-rotate-6", "rotate-12", "rotate-3", "rotate-6", "-rotate-12", "-rotate-3"];

export default function PassportPage() {
  const { flights } = useFlights();
  const totalMiles = flights.reduce((sum, f) => sum + (f.distance_miles ?? 0), 0);
  const xpProgress = (totalMiles % 15000) / 15000;
  const xpToNext = 15000 - (totalMiles % 15000);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <BottomNav />

      <main className="mx-auto flex w-full grow max-w-7xl flex-col gap-8 px-5 pb-32 pt-24">
        <section className="flex flex-col gap-2">
          <h2 className="text-headline-lg text-(--color-on-background)">Your Passport</h2>
          <p className="text-body-lg text-(--color-on-surface-variant)">Track your journeys and unlock rewards.</p>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="glass-panel flex flex-col gap-2 rounded-xl p-5">
            <div className="flex items-center gap-2 text-[#007AFF]">
              <AppIcon name="military_tech" filled className="h-6 w-6" />
              <span className="text-label-bold text-[#0070eb]">Air Miles (XP)</span>
            </div>
            <div className="text-metric-display text-foreground">{totalMiles.toLocaleString()}</div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-(--color-surface-variant)">
              <div
                className="h-full rounded-full bg-[#007AFF] transition-all duration-700"
                style={{ width: `${xpProgress * 100}%` }}
              />
            </div>
            <div className="mt-1 text-right text-body-sm text-(--color-on-surface-variant)">
              To next tier: {xpToNext.toLocaleString()}
            </div>
          </div>

          <div className="glass-panel flex flex-col gap-2 rounded-xl p-5">
            <div className="flex items-center gap-2 text-[#007AFF]">
              <AppIcon name="inventory_2" filled className="h-6 w-6" />
              <span className="text-label-bold text-[#0070eb]">Materials</span>
            </div>
            <div className="flex grow items-end">
              <div className="flex w-full gap-4">
                {MOCK_MATERIALS.map((material) => (
                  <div key={material.id} className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#007AFF]/20 bg-(--color-primary-fixed)/30 text-[#007AFF]">
                      <AppIcon name={materialIconNames[material.material_type] ?? "token"} className="h-5 w-5" />
                    </div>
                    <span className="text-label-bold text-(--color-on-surface-variant)">{material.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 -mx-5 px-5">
          <h3 className="px-5 text-headline-md text-(--color-on-background)">Stamps</h3>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 hide-scrollbar">
            {continentPages.map(([continent, stamps], pageIndex) => (
              <div
                key={continent}
                className="glass-panel relative flex aspect-3/4 min-w-[300px] w-[80vw] max-w-[400px] snap-center flex-col overflow-hidden rounded-[24px] p-5"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#007AFF,transparent)] opacity-5" />

                <div className="mb-6 flex items-center justify-between border-b border-(--color-on-surface)/10 pb-4">
                  <span className="text-label-bold text-(--color-on-surface-variant)">Page {pageIndex + 1}</span>
                  <span className="text-label-bold text-[#007AFF]">{continent}</span>
                </div>

                <div className="relative z-10 grid grow content-start grid-cols-2 gap-x-6 gap-y-10">
                  {stamps.map((stamp, stampIndex) => (
                    <div
                      key={stamp.id}
                      className={`flex flex-col items-center gap-2 transform ${stampRotations[stampIndex % stampRotations.length]} ${stampIndex % 2 === 1 ? "mt-8" : ""}`}
                    >
                      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-(--color-on-primary-fixed) bg-white/10 text-(--color-on-primary-fixed) opacity-80 mix-blend-multiply">
                        <AppIcon name={stamp.icon as AppIconName} className="mb-1 h-8 w-8" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {stamp.airport_iata}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-(--color-on-surface-variant)">
                        {new Date(stamp.earned_at)
                          .toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="glass-panel flex aspect-3/4 min-w-[300px] w-[80vw] max-w-[400px] snap-center flex-col items-center justify-center rounded-[24px] border-dashed p-5">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-surface-variant)">
                <AppIcon name="add" className="h-8 w-8 text-(--color-tertiary)" />
              </div>
              <span className="text-body-lg text-center text-(--color-on-surface-variant)">
                Complete more journeys to fill this page.
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h3 className="text-headline-md text-(--color-on-background)">Blueprint Store</h3>
            <button className="text-label-bold text-[#007AFF] hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MOCK_LANDMARKS.map((landmark) => {
              const isUnlocked = MOCK_UNLOCKED_LANDMARK_IDS.includes(landmark.id);

              return (
                <div
                  key={landmark.id}
                  className={`glass-panel group flex cursor-pointer flex-col items-center gap-3 rounded-xl p-4 transition-colors hover:bg-white/90 ${
                    !isUnlocked ? "opacity-60" : ""
                  }`}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                      isUnlocked
                        ? "bg-[#007AFF]/20 text-[#007AFF]"
                        : "bg-(--color-surface-variant) text-(--color-tertiary)"
                    }`}
                  >
                    <AppIcon name={landmark.icon as AppIconName} className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-body-sm font-semibold text-foreground">{landmark.name}</div>
                    <div
                      className={`mt-1 flex items-center justify-center gap-1 text-label-bold ${
                        isUnlocked ? "text-[#007AFF]" : "text-(--color-tertiary)"
                      }`}
                    >
                      {!isUnlocked && <AppIcon name="lock" className="h-[10px] w-[10px]" />}
                      {landmark.cost_xp.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
