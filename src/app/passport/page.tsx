"use client";

import { TopBar } from "@/components/ui/top-bar";
import { BottomNav } from "@/components/ui/bottom-nav";
import {
  MOCK_PROFILE,
  MOCK_STAMPS,
  MOCK_MATERIALS,
  MOCK_LANDMARKS,
  MOCK_UNLOCKED_LANDMARK_IDS,
} from "@/lib/mock-data";

const materialIcons: Record<string, string> = {
  bolt: "bolt",
  star: "star",
  diamond: "diamond",
};

const continentPages = (() => {
  const pages: Record<string, typeof MOCK_STAMPS> = {};
  for (const s of MOCK_STAMPS) {
    const key = s.continent ?? "Other";
    if (!pages[key]) pages[key] = [];
    pages[key].push(s);
  }
  return Object.entries(pages);
})();

const stampRotations = ["-rotate-6", "rotate-12", "rotate-3", "rotate-6", "-rotate-12", "-rotate-3"];

export default function PassportPage() {
  const xpProgress = (MOCK_PROFILE.air_miles_xp % 15000) / 15000;
  const xpToNext = 15000 - (MOCK_PROFILE.air_miles_xp % 15000);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <BottomNav />

      <main className="grow pt-24 pb-32 px-5 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <section className="flex flex-col gap-2">
          <h2 className="text-headline-lg text-(--color-on-background)">
            Your Passport
          </h2>
          <p className="text-body-lg text-(--color-on-surface-variant)">
            Track your journeys and unlock rewards.
          </p>
        </section>

        {/* Profile Stats Bento */}
        <section className="grid grid-cols-2 gap-4">
          {/* XP Card */}
          <div className="glass-panel rounded-xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#007AFF]">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              <span className="text-label-bold text-[#0070eb]">
                Air Miles (XP)
              </span>
            </div>
            <div className="text-metric-display text-foreground">
              {MOCK_PROFILE.air_miles_xp.toLocaleString()}
            </div>
            <div className="w-full h-1 bg-(--color-surface-variant) rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#007AFF] rounded-full transition-all duration-700"
                style={{ width: `${xpProgress * 100}%` }}
              />
            </div>
            <div className="text-body-sm text-(--color-on-surface-variant) mt-1 text-right">
              To next tier: {xpToNext.toLocaleString()}
            </div>
          </div>

          {/* Materials Card */}
          <div className="glass-panel rounded-xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#007AFF]">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                inventory_2
              </span>
              <span className="text-label-bold text-[#0070eb]">
                Materials
              </span>
            </div>
            <div className="grow flex items-end">
              <div className="flex gap-4 w-full">
                {MOCK_MATERIALS.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-(--color-primary-fixed)/30 flex items-center justify-center text-[#007AFF] border border-[#007AFF]/20">
                      <span className="material-symbols-outlined text-lg">
                        {materialIcons[m.material_type] ?? "token"}
                      </span>
                    </div>
                    <span className="text-label-bold text-(--color-on-surface-variant)">
                      {m.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Passport Stamp Carousel */}
        <section className="flex flex-col gap-4 -mx-5 px-5">
          <h3 className="text-headline-md text-(--color-on-background) px-5">
            Stamps
          </h3>
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-6 px-5">
            {continentPages.map(([continent, stamps], pageIdx) => (
              <div
                key={continent}
                className="min-w-[300px] w-[80vw] max-w-[400px] aspect-3/4 glass-panel rounded-[24px] p-5 flex flex-col snap-center relative overflow-hidden"
              >
                {/* Radial glow */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,#007AFF,transparent)]" />

                <div className="flex justify-between items-center mb-6 border-b border-(--color-on-surface)/10 pb-4">
                  <span className="text-label-bold text-(--color-on-surface-variant)">
                    Page {pageIdx + 1}
                  </span>
                  <span className="text-label-bold text-[#007AFF]">
                    {continent}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 grow content-start relative z-10">
                  {stamps.map((stamp, i) => (
                    <div
                      key={stamp.id}
                      className={`flex flex-col items-center gap-2 transform ${
                        stampRotations[i % stampRotations.length]
                      } ${i % 2 === 1 ? "mt-8" : ""}`}
                    >
                      <div className="w-20 h-20 rounded-full border-2 border-(--color-on-primary-fixed) text-(--color-on-primary-fixed) flex flex-col items-center justify-center opacity-80 mix-blend-multiply bg-white/10">
                        <span className="material-symbols-outlined text-3xl mb-1">
                          {stamp.icon}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {stamp.airport_iata}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-(--color-on-surface-variant)">
                        {new Date(stamp.earned_at).toLocaleDateString(
                          "en-US",
                          { day: "2-digit", month: "short", year: "numeric" }
                        ).toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Empty page */}
            <div className="min-w-[300px] w-[80vw] max-w-[400px] aspect-3/4 glass-panel rounded-[24px] p-5 flex flex-col snap-center items-center justify-center border-dashed">
              <div className="w-16 h-16 rounded-full bg-(--color-surface-variant) flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-(--color-tertiary) text-3xl">
                  add
                </span>
              </div>
              <span className="text-body-lg text-(--color-on-surface-variant) text-center">
                Complete more journeys to fill this page.
              </span>
            </div>
          </div>
        </section>

        {/* Blueprint Store */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h3 className="text-headline-md text-(--color-on-background)">
              Blueprint Store
            </h3>
            <button className="text-label-bold text-[#007AFF] hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MOCK_LANDMARKS.map((lm) => {
              const isUnlocked = MOCK_UNLOCKED_LANDMARK_IDS.includes(lm.id);
              return (
                <div
                  key={lm.id}
                  className={`glass-panel rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/90 transition-colors group ${
                    !isUnlocked ? "opacity-60" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isUnlocked
                        ? "bg-[#007AFF]/20 text-[#007AFF]"
                        : "bg-(--color-surface-variant) text-(--color-tertiary)"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {lm.icon}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-body-sm font-semibold text-foreground">
                      {lm.name}
                    </div>
                    <div
                      className={`text-label-bold mt-1 flex items-center justify-center gap-1 ${
                        isUnlocked
                          ? "text-[#007AFF]"
                          : "text-(--color-tertiary)"
                      }`}
                    >
                      {!isUnlocked && (
                        <span className="material-symbols-outlined text-[10px]">
                          lock
                        </span>
                      )}
                      {lm.cost_xp.toLocaleString()} XP
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
