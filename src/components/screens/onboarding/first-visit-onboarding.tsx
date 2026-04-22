"use client";

import { useState } from "react";
import { Globe } from "@/components/ui/cobe-globe";
import { AppIcon } from "@/components/ui/app-icon";

const STORAGE_KEY = "flight-path-onboarding-completed";

type Slide = {
  title: string;
  body: string;
  cta: string;
  progress: [number, number, number];
  glow: string;
};

const slides: Slide[] = [
  {
    title: "Your Journey, Visualized.",
    body: "Turn your flights into a beautiful, interactive 3D world.",
    cta: "Start Exploring",
    progress: [1, 0, 0],
    glow: "from-[#007AFF]/25 via-transparent to-transparent",
  },
  {
    title: "Log flights. Watch the map move.",
    body: "Every trip updates your globe, stats, and history in one place.",
    cta: "Next",
    progress: [1, 1, 0],
    glow: "from-[#34C759]/20 via-transparent to-transparent",
  },
  {
    title: "Keep your passport moving.",
    body: "Track miles, countries, and rewards as your travel grows.",
    cta: "Start Exploring",
    progress: [1, 1, 1],
    glow: "from-[#FF9500]/20 via-transparent to-transparent",
  },
];

function OnboardingGlobe() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(0,122,255,0.18),_transparent_38%),linear-gradient(to_bottom,_rgba(10,17,40,0.98),_rgba(10,17,40,0.88))]" />
      <div className="absolute left-1/2 top-[-6vh] w-[170vw] max-w-[1500px] -translate-x-1/2 sm:w-[130vw] lg:top-[-12vh] lg:w-[110vw]">
        <Globe
          markers={[]}
          arcs={[]}
          markerColor={[0.96, 0.97, 0.98]}
          baseColor={[0.98, 0.98, 0.99]}
          arcColor={[0.0, 0.48, 1.0]}
          glowColor={[0.92, 0.96, 1.0]}
          dark={0}
          mapBrightness={14}
          markerSize={0.014}
          speed={0.0005}
          theta={0.08}
          diffuse={1.3}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(10,17,40,0.2)_78%,_rgba(10,17,40,0.42)_100%)]" />
    </div>
  );
}

export function FirstVisitOnboarding({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = slides[slideIndex];
  const isLastSlide = slideIndex === slides.length - 1;

  const completeOnboarding = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures and continue to the app.
    }
    onComplete();
  };

  const nextSlide = () => {
    if (isLastSlide) {
      completeOnboarding();
      return;
    }
    setSlideIndex((value) => Math.min(value + 1, slides.length - 1));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a1128] text-white">
      <OnboardingGlobe />

      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/30 to-transparent" />

      <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+16px)]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/10">
              <AppIcon name="flight_takeoff" filled className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
                Flight Path
              </div>
              <div className="text-sm font-semibold text-white/85">
                First-time setup
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={completeOnboarding}
            className="rounded-full px-3 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/8 hover:text-white"
          >
            Skip
          </button>
        </header>

        <main className="flex flex-1 items-end px-4 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-8">
          <div className="mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[24px] border border-white/50 bg-white/72 p-5 text-[#1a1c1d] shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-[25px] sm:p-6">
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r ${slide.glow}`} />

              <div key={slideIndex} className="animate-fp-fade-up">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#007AFF]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#007AFF]">
                    Welcome
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#414755]/70">
                    0{slideIndex + 1} / 03
                  </span>
                </div>

                <h1 className="mt-5 max-w-[12ch] text-[34px] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#0058bc] sm:text-[44px]">
                  {slide.title}
                </h1>

                <p className="mt-4 max-w-[28ch] text-[18px] leading-7 text-[#414755]">
                  {slide.body}
                </p>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#0058bc] px-6 text-[18px] font-semibold text-white transition-transform duration-300 hover:translate-y-[-1px] active:translate-y-[1px]"
                >
                  <span>{slide.cta}</span>
                  <AppIcon name="arrow_forward" className="h-7 w-7" />
                </button>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {slide.progress.map((active, index) => (
                    <span
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active ? "w-8 bg-[#0058bc]" : "w-2 bg-[#c1c6d7]/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export { STORAGE_KEY as ONBOARDING_STORAGE_KEY };
