"use client";

import { useState } from "react";
import { AppIcon, type AppIconName } from "@/components/ui/app-icon";

const STORAGE_KEY = "flight-path-onboarding-completed";

type OnboardingStep = {
  eyebrow: string;
  title: string;
  body: string;
  icon: AppIconName;
  accent: string;
  visual: "globe" | "route" | "passport";
};

const steps: OnboardingStep[] = [
  {
    eyebrow: "Step 1",
    title: "See your journeys as a live globe",
    body: "Your flights become a moving map of routes instead of a static list.",
    icon: "explore",
    accent: "from-[#007AFF] via-[#6aa8ff] to-[#c8d9ff]",
    visual: "globe",
  },
  {
    eyebrow: "Step 2",
    title: "Add flights and watch the timeline update",
    body: "Every new flight updates your stats, history, and map together.",
    icon: "add_circle",
    accent: "from-[#34C759] via-[#7ae28a] to-[#d7f8dd]",
    visual: "route",
  },
  {
    eyebrow: "Step 3",
    title: "Keep your passport moving",
    body: "Track countries, miles, and travel rewards in one clean workspace.",
    icon: "book",
    accent: "from-[#FF9500] via-[#ffb866] to-[#ffe2bf]",
    visual: "passport",
  },
];

function StepVisual({ visual }: { visual: OnboardingStep["visual"] }) {
  if (visual === "globe") {
    return (
      <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center">
        <div className="animate-fp-orbit absolute inset-0 rounded-full border border-white/12" />
        <div className="animate-fp-orbit-slow absolute inset-6 rounded-full border border-white/10 border-dashed" />
        <div className="animate-fp-float relative flex h-[230px] w-[230px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(255,255,255,0.04)_52%,_rgba(0,0,0,0.12)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-6 rounded-full border border-white/15" />
          <div className="absolute left-1/2 top-10 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.08)]" />
          <div className="absolute bottom-14 left-12 h-2.5 w-2.5 rounded-full bg-[#34C759] shadow-[0_0_0_10px_rgba(52,199,89,0.14)]" />
          <div className="absolute right-10 top-24 h-2 w-2 rounded-full bg-[#FF9500] shadow-[0_0_0_8px_rgba(255,149,0,0.14)]" />
          <AppIcon name="flight_takeoff" filled className="animate-fp-float-slow h-16 w-16 text-white drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
    );
  }

  if (visual === "route") {
    return (
      <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center">
        <div className="animate-fp-fade-up w-full rounded-[32px] border border-white/10 bg-white/6 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm">
          <div className="flex items-center justify-between text-white/70">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Live route</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Sync on</span>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <AppIcon name="flight_takeoff" filled className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-white">
                  <span className="text-lg font-extrabold tracking-tight">LHR</span>
                  <span className="text-white/50">→</span>
                  <span className="text-lg font-extrabold tracking-tight">DXB</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="animate-fp-pulse h-full w-[68%] rounded-full bg-linear-to-r from-[#34C759] via-[#7ae28a] to-white/90" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["8", "Flights"],
                ["33k", "Miles"],
                ["32", "Countries"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/8 px-3 py-3 text-center">
                  <div className="text-xl font-extrabold text-white">{value}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center">
      <div className="animate-fp-fade-up w-full rounded-[32px] border border-white/10 bg-white/6 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between text-white/70">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Passport pages</span>
          <AppIcon name="military_tech" filled className="h-5 w-5 text-white/85" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["Europe", "Asia", "Africa", "Rewards"].map((item, index) => (
            <div
              key={item}
              className={`animate-fp-fade-up rounded-[22px] border border-white/10 px-4 py-4 text-white ${
                index === 3 ? "bg-white/16" : "bg-white/8"
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">{item}</div>
              <div className="mt-3 flex items-end justify-between">
                <div className="text-2xl font-extrabold">
                  {index === 3 ? "XP" : `${(index + 1) * 4}`}
                </div>
                <AppIcon name={index === 3 ? "star" : "book"} filled className="mb-1 h-5 w-5 text-white/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FirstVisitOnboarding({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const completeOnboarding = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures and continue to the app.
    }
    onComplete();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-br from-[#061126] via-[#0c1730] to-[#050814] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,122,255,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,149,0,0.16),_transparent_38%)]" />
      <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top)+16px)] sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
              <AppIcon name="flight_takeoff" filled className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Flight Path</div>
              <div className="text-sm font-semibold text-white/85">First-time setup</div>
            </div>
          </div>
          <button
            type="button"
            onClick={completeOnboarding}
            className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/12"
          >
            Skip
          </button>
        </header>

        <main className="grid flex-1 items-center px-5 pb-8 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <section className="max-w-2xl">
            <div
              key={stepIndex}
              className="animate-fp-fade-up"
            >
              <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${step.accent} px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#061126]`}>
                {step.eyebrow}
              </div>

              <h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                {step.title}
              </h1>

              <p className="mt-4 max-w-lg text-base leading-7 text-white/68 sm:text-lg">
                {step.body}
              </p>

              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {steps.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={`rounded-[22px] border p-4 text-left transition-all duration-300 ${
                      index === stepIndex
                        ? "border-white/25 bg-white/14 shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                        : "border-white/10 bg-white/6 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <AppIcon name={item.icon} filled className="h-5 w-5 text-white" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="mt-4 text-sm font-bold leading-5 text-white">{item.title}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={() => setStepIndex((value) => Math.min(value + 1, steps.length - 1))}
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#061126] transition-transform duration-300 hover:translate-y-[-1px]"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={completeOnboarding}
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#061126] transition-transform duration-300 hover:translate-y-[-1px]"
                  >
                    Start Flight Path
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setStepIndex((value) => Math.max(value - 1, 0))}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
              </div>
            </div>
          </section>

          <section className="relative mt-10 lg:mt-0">
            <div
              key={stepIndex}
              className="animate-fp-scale-in"
            >
              <div className="rounded-[36px] border border-white/10 bg-white/6 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
                <StepVisual visual={step.visual} />
              </div>

              <div className="mt-4 flex items-center justify-between px-1 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                <span>{stepIndex + 1} of {steps.length}</span>
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === stepIndex ? "w-8 bg-white" : "w-3 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export { STORAGE_KEY as ONBOARDING_STORAGE_KEY };
