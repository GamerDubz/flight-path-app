"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Globe } from "@/components/ui/cobe-globe";
import { AppIcon } from "@/components/ui/app-icon";
import { flightsToGlobeData } from "@/lib/flights-to-globe";
import { MOCK_FLIGHTS } from "@/lib/mock-data";

const STORAGE_KEY = "flight-path-onboarding-completed";
const ONBOARDING_GLOBE = flightsToGlobeData(MOCK_FLIGHTS.slice(0, 6));

type SlideId = 0 | 1 | 2 | 3;

function markComplete(onComplete: () => void) {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore storage failures and continue to the app.
  }

  onComplete();
}

function SlideDots({ active }: { active: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            active === index ? "w-8 bg-[#1d5cc7]" : "w-2 bg-[#cbd2e1]"
          }`}
        />
      ))}
    </div>
  );
}

function RootSurface({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative min-h-dvh overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function IntroSlide({ onNext }: { onNext: () => void }) {
  return (
    <RootSurface className="bg-[#eef2f8] text-[#111827]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.96),transparent_24%),radial-gradient(circle_at_50%_56%,rgba(29,92,199,0.10),transparent_36%),radial-gradient(circle_at_center,rgba(255,255,255,0.86),rgba(238,242,248,0.98))]" />

      <div className="absolute inset-0 opacity-95">
        <div className="absolute left-1/2 top-[-6vh] w-[160vw] max-w-[1480px] -translate-x-1/2 sm:w-[122vw] lg:top-[-8vh] lg:w-[102vw]">
          <Globe
            markers={ONBOARDING_GLOBE.markers}
            arcs={ONBOARDING_GLOBE.arcs}
            markerColor={[0.96, 0.97, 0.98]}
            baseColor={[0.98, 0.98, 0.99]}
            arcColor={[0.12, 0.36, 0.78]}
            glowColor={[0.97, 0.98, 1.0]}
            dark={0}
            mapBrightness={11}
            markerSize={0.017}
            markerElevation={0.02}
            arcWidth={0.9}
            arcHeight={0.34}
            speed={0.0006}
            theta={0.1}
            diffuse={1.15}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_42%,rgba(238,242,248,0.2)_70%,rgba(238,242,248,0.88)_100%)]" />
      </div>

      <main className="relative z-10 flex min-h-dvh items-end px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+16px)]">
        <section className="mx-auto w-full max-w-[390px] rounded-[30px] border border-white/80 bg-white/84 p-5 text-center text-[#111827] shadow-[0_18px_50px_rgba(17,33,61,0.08)] backdrop-blur-[24px] animate-fp-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e9f2] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1d5cc7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d5cc7]" />
            Flight Path
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <h1 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#123d8a]">
              Your Journey,
              <br />
              Visualized.
            </h1>
            <p className="mx-auto max-w-[286px] text-[16px] leading-[1.55] text-[#4d556a]">
              Turn your flights into a calm, interactive world that updates as your trips grow.
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#1d5cc7] px-6 text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
          >
            <span className="text-[15px] font-bold tracking-[0.01em]">Start Exploring</span>
            <AppIcon name="arrow_forward" className="h-6 w-6" />
          </button>

          <div className="mt-5">
            <SlideDots active={0} />
          </div>
        </section>
      </main>
    </RootSurface>
  );
}

function BoardingPassArt() {
  return (
    <div className="relative w-[228px] overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_18px_42px_rgba(17,33,61,0.14)]">
      <div className="flex items-center justify-between bg-[#1d5cc7] px-4 py-3 text-white">
        <span className="text-[12px] font-bold uppercase tracking-[0.22em]">Aero Pass</span>
        <AppIcon name="flight" filled className="h-[18px] w-[18px]" />
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[25px] font-semibold leading-[1.2] tracking-tight text-[#111827]">
              JFK
            </span>
            <span className="text-[14px] leading-[1.4] text-[#6d7588]">New York</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef3fb] text-[#1d5cc7]">
            <AppIcon name="flight_takeoff" className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[25px] font-semibold leading-[1.2] tracking-tight text-[#111827]">
              LHR
            </span>
            <span className="text-[14px] leading-[1.4] text-[#6d7588]">London</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e2e6ef] bg-[#f6f8fc] px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#4d556a]">
            Flight
          </span>
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#111827]">
            AE-402
          </span>
        </div>
        <div className="mt-3 h-8 rounded-[999px] bg-[repeating-linear-gradient(to_right,currentColor,currentColor_2px,transparent_2px,transparent_5px)] text-[#c7cfdd] opacity-70" />
      </div>
    </div>
  );
}

function LogSlide({ onNext }: { onNext: () => void }) {
  return (
    <RootSurface className="bg-[#edf2f8] text-[#111827]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_50%_70%,rgba(29,92,199,0.10),transparent_36%),linear-gradient(180deg,#f7f9fc_0%,#e7edf7_100%)]" />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-[#1d5cc7]/30 to-transparent" />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+16px)]">
        <main className="flex flex-1 items-center justify-center">
          <div className="animate-fp-scale-in">
            <BoardingPassArt />
          </div>
        </main>

        <section className="mx-auto w-full max-w-[390px] rounded-[30px] border border-white/80 bg-white/84 p-5 text-center shadow-[0_18px_50px_rgba(17,33,61,0.08)] backdrop-blur-[24px] animate-fp-fade-up">
          <div className="mb-5">
            <SlideDots active={1} />
          </div>

          <h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#111827]">
            Log Effortlessly.
          </h1>
          <p className="mx-auto mt-4 max-w-[290px] text-[16px] leading-[1.55] text-[#4d556a]">
            Enter a flight number and Flight Path handles the route, miles, and timeline automatically.
          </p>

          <button
            type="button"
            onClick={onNext}
            className="mt-7 flex h-14 w-full items-center justify-center rounded-full bg-[#1d5cc7] text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
          >
            Next
          </button>
        </section>
      </div>
    </RootSurface>
  );
}

function LandmarkArt() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/82 shadow-[0_18px_50px_rgba(17,33,61,0.12)] backdrop-blur-[24px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.95),transparent_36%),linear-gradient(180deg,#fafbff_0%,#edf2f8_100%)]" />
      <svg viewBox="0 0 320 360" className="relative z-10 block h-[340px] w-full">
        <defs>
          <linearGradient id="towerStroke" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#dbe4f2" />
            <stop offset="50%" stopColor="#f8fbff" />
            <stop offset="100%" stopColor="#b8c7de" />
          </linearGradient>
          <linearGradient id="towerGlow" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#d9e3f2" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="305" rx="124" ry="20" fill="rgba(29,92,199,0.07)" />
        <ellipse cx="160" cy="304" rx="98" ry="15" fill="none" stroke="rgba(29,92,199,0.18)" strokeWidth="8" />
        <path d="M160 34C174 74 181 90 182 124C183 140 183 156 184 168C199 183 208 196 215 212C221 226 226 239 230 254H190L182 230H138L130 254H90C95 239 100 226 106 212C113 196 122 183 137 168C138 156 138 140 139 124C140 90 146 74 160 34Z" fill="url(#towerGlow)" stroke="url(#towerStroke)" strokeWidth="2.2" />
        <path d="M155 34H165L168 64H152L155 34Z" fill="#f8fbff" />
        <path d="M150 70H170L174 91H146L150 70Z" fill="#e6edf8" />
        <path d="M142 96H178L182 118H138L142 96Z" fill="#eef4fb" />
        <path d="M134 122H186L190 146H130L134 122Z" fill="#dde7f4" />
        <path d="M126 148H194L199 174H121L126 148Z" fill="#f8fbff" />
        <path d="M118 176H202L206 198H114L118 176Z" fill="#dde7f4" />
        <path d="M110 203H210L215 228H105L110 203Z" fill="#f8fbff" />
        <path d="M102 231H218L223 255H97L102 231Z" fill="#dde7f4" />
        <path d="M145 148H175L182 255H138L145 148Z" fill="url(#towerGlow)" />
        <path d="M86 254L124 230H196L234 254" fill="none" stroke="url(#towerStroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 256H228" stroke="rgba(29,92,199,0.20)" strokeWidth="6" strokeLinecap="round" />
        <path d="M84 124C116 118 132 110 160 110C188 110 204 118 236 124" fill="none" stroke="rgba(29,92,199,0.12)" strokeWidth="10" strokeLinecap="round" />
        <path d="M88 210C120 220 137 226 160 226C183 226 200 220 232 210" fill="none" stroke="rgba(29,92,199,0.09)" strokeWidth="9" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-x-0 bottom-7 z-20 flex justify-center gap-1 opacity-35">
        <span className="h-px w-2 bg-[#1d5cc7]" />
        <span className="h-px w-4 bg-[#1d5cc7]" />
        <span className="h-px w-2 bg-[#1d5cc7]" />
      </div>
    </div>
  );
}

function BuildSlide({ onNext }: { onNext: () => void }) {
  return (
    <RootSurface className="bg-[#eef1f7] text-[#111827]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.96),transparent_25%),radial-gradient(circle_at_50%_72%,rgba(29,92,199,0.10),transparent_34%),linear-gradient(180deg,#f6f8fd_0%,#edf2f8_100%)]" />
      <div className="absolute top-0 left-0 h-[72vw] w-[72vw] rounded-full bg-[#dce7fb]/30 blur-[90px]" />
      <div className="absolute bottom-[-12%] right-[-18%] h-[86vw] w-[86vw] rounded-full bg-[#dbe5f5]/40 blur-[110px]" />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-5">
        <div className="w-full max-w-[390px]">
          <div className="animate-fp-scale-in">
            <LandmarkArt />
          </div>

          <section className="mt-4 rounded-[30px] border border-white/80 bg-white/84 p-5 text-center shadow-[0_18px_50px_rgba(17,33,61,0.08)] backdrop-blur-[24px] animate-fp-fade-up">
            <div className="mb-5">
              <SlideDots active={2} />
            </div>

            <h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#111827]">
              Earn &amp; Build.
            </h1>
            <p className="mx-auto mt-4 max-w-[290px] text-[16px] leading-[1.55] text-[#4d556a]">
              Collect stamps, unlock materials, and build landmarks on your personal globe.
            </p>

            <button
              type="button"
              onClick={onNext}
              className="group mt-7 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#1d5cc7] text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
            >
              <span className="text-[12px] font-bold uppercase tracking-widest">Get Started</span>
              <AppIcon name="arrow_forward" className="h-[18px] w-[18px]" />
            </button>
          </section>
        </div>
      </div>
    </RootSurface>
  );
}

function PermissionBadge() {
  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-white/68 shadow-sm backdrop-blur-[32px]">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#1d5cc7]/10">
        <div className="absolute inset-0 scale-110 rounded-full border border-[#1d5cc7]/20" />
        <AppIcon name="notifications" filled className="h-8 w-8 text-[#1d5cc7]" />
      </div>
    </div>
  );
}

function SetupSlide({ onComplete }: { onComplete: () => void }) {
  return (
    <RootSurface className="bg-[#eef1f7] text-[#111827]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.98),transparent_26%),radial-gradient(circle_at_50%_72%,rgba(29,92,199,0.08),transparent_35%),linear-gradient(180deg,#f8faff_0%,#edf2f8_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[46vw] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />

      <main className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-5">
        <div className="w-full max-w-[390px]">
          <section className="rounded-[30px] border border-white/80 bg-white/84 p-5 text-center shadow-[0_18px_50px_rgba(17,33,61,0.08)] backdrop-blur-[24px] animate-fp-fade-up">
            <PermissionBadge />

            <div className="mb-5 mt-5">
              <SlideDots active={3} />
            </div>

            <h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#111827]">
              Never Miss a Flight.
            </h1>
            <p className="mx-auto mt-4 max-w-[290px] text-[16px] leading-[1.55] text-[#4d556a]">
              Set your home airport, enable reminders, and stay in sync from first takeoff to final landing.
            </p>

            <div className="mt-6 space-y-3 text-left">
              <div className="group relative w-full">
                <span className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6d7588] transition-colors group-focus-within:text-[#1d5cc7]">
                  <AppIcon name="flight_takeoff" className="h-6 w-6" />
                </span>
                <input
                  type="text"
                  placeholder="e.g., JFK, LHR, DXB"
                  className="h-[60px] w-full rounded-xl border border-[#d7dbe6] bg-white/60 pl-[48px] pr-4 text-[16px] leading-[1.55] text-[#111827] shadow-inner outline-none transition-all placeholder:text-[#6d7588] focus:border-[#1d5cc7] focus:ring-1 focus:ring-[#1d5cc7]"
                />
              </div>

              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1d5cc7] text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
              >
                <span>Take Off</span>
                <AppIcon name="arrow_forward" className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#d7dbe6]/70" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6d7588]">
                or connect instantly
              </span>
              <div className="h-px flex-1 bg-[#d7dbe6]/70" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-[15px] text-white transition-opacity hover:opacity-90"
              >
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 20 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13.2562 6.95312C14.075 5.96562 14.625 4.60312 14.475 3.23438C13.3125 3.28125 11.8938 4.00937 11.0438 4.99688C10.2938 5.85938 9.64375 7.24688 9.825 8.59688C11.1187 8.69688 12.4438 7.93437 13.2562 6.95312ZM14.1687 13.2875C14.1375 11.0187 15.9937 9.94063 16.0812 9.89062C15.0188 8.32812 13.3812 8.09687 12.8312 8.07812C11.4125 7.93437 10.0187 8.91875 9.2875 8.91875C8.55625 8.91875 7.425 8.09687 6.2375 8.11562C4.7 8.13438 3.2625 8.95938 2.45625 10.3656C0.825 13.2031 2.0375 17.4094 3.63125 19.7094C4.40625 20.8344 5.31875 22.1094 6.55625 22.0656C7.75625 22.0187 8.2125 21.2844 9.6625 21.2844C11.0938 21.2844 11.5125 22.0656 12.7687 22.0469C14.0625 22.0281 14.8687 20.9 15.6375 19.7531C16.5438 18.4281 16.9187 17.1344 16.9375 17.0656C16.9062 17.0531 14.2062 16.0344 14.1687 13.2875Z"
                    fill="white"
                  />
                </svg>
                Continue with Apple
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#d7dbe6] bg-white text-[15px] text-[#111827] shadow-sm transition-colors hover:bg-[#f3f5f9]"
              >
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </section>
        </div>
      </main>
    </RootSurface>
  );
}

export function FirstVisitOnboarding({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [slideIndex, setSlideIndex] = useState<SlideId>(0);

  const finish = () => markComplete(onComplete);

  if (slideIndex === 0) {
    return <IntroSlide onNext={() => setSlideIndex(1)} />;
  }

  if (slideIndex === 1) {
    return <LogSlide onNext={() => setSlideIndex(2)} />;
  }

  if (slideIndex === 2) {
    return <BuildSlide onNext={() => setSlideIndex(3)} />;
  }

  return <SetupSlide onComplete={finish} />;
}

export { STORAGE_KEY as ONBOARDING_STORAGE_KEY };
