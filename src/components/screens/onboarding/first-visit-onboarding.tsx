"use client";

import { useState } from "react";
import { Globe } from "@/components/ui/cobe-globe";
import { AppIcon } from "@/components/ui/app-icon";

const STORAGE_KEY = "flight-path-onboarding-completed";

type SlideId = 0 | 1 | 2 | 3 | 4;

function markComplete(onComplete: () => void) {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore storage failures and continue to the app.
  }
  onComplete();
}

function PaginationDots({ active }: { active: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            active === index ? "w-8 bg-[#0058bc]" : "w-2 bg-[#c1c6d7]/55"
          }`}
        />
      ))}
    </div>
  );
}

function GlobeIntroSlide({
  onNext,
  onSkip,
}: {
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9fb] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(to bottom, rgba(249,249,251,0.12), rgba(249,249,251,0.6)), radial-gradient(circle at 50% 20%, rgba(255,255,255,0.35), transparent 28%), radial-gradient(circle at 50% 60%, rgba(0,122,255,0.18), transparent 40%), radial-gradient(circle at center, rgba(10,17,40,0.98), rgba(10,17,40,0.88))" }} />
      <div className="absolute inset-0 z-0 opacity-95">
        <div className="absolute left-1/2 top-[-10vh] w-[180vw] max-w-[1560px] -translate-x-1/2 sm:w-[135vw] lg:top-[-14vh] lg:w-[115vw]">
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
            speed={0.00045}
            theta={0.08}
            diffuse={1.25}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_38%,_rgba(10,17,40,0.18)_76%,_rgba(10,17,40,0.38)_100%)]" />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-black/32 to-transparent" />

      <div className="relative z-20 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+16px)]">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 backdrop-blur-md">
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
            onClick={onSkip}
            className="rounded-full px-3 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/8 hover:text-white"
          >
            Skip
          </button>
        </header>

        <main className="flex flex-1 items-end px-4 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-8">
          <div className="mx-auto w-full max-w-md">
            <div className="animate-fp-fade-up rounded-[24px] border border-white/50 bg-white/72 p-5 text-[#1a1c1d] shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-[25px] sm:p-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-headline-lg text-[#004493]">
                  Your Journey, Visualized.
                </h1>
                <p className="text-body-lg text-[#414755]">
                  Turn your flights into a beautiful, interactive 3D world.
                </p>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0058bc] px-6 text-white transition-colors hover:bg-[#0050aa]"
              >
                <span className="text-body-lg font-semibold">Start Exploring</span>
                <AppIcon name="arrow_forward" className="h-6 w-6" />
              </button>

              <div className="mt-5">
                <PaginationDots active={0} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function LogPassSlide({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9fb] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-multiply" style={{ backgroundImage: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.45), transparent 30%), linear-gradient(to bottom, rgba(243,243,245,0.8), rgba(233,236,241,0.96)), radial-gradient(circle at 50% 72%, rgba(0,122,255,0.08), transparent 42%)" }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f9f9fb]/20 via-[#f9f9fb]/60 to-[#f9f9fb]" />

      <div className="relative z-10 flex h-screen flex-col justify-end pb-10 px-5">
        <main className="relative z-10 flex flex-col items-center">
          <div className="animate-fp-scale-in relative z-20 w-[220px] overflow-hidden rounded-2xl border-[0.5px] border-[#c1c6d7]/30 bg-[#ffffff] shadow-[0_20px_40px_-10px_rgba(0,88,188,0.15)]">
            <div className="flex items-center justify-between bg-[#0058bc] px-4 py-3 text-white">
              <span className="text-[12px] font-bold uppercase tracking-widest">Aero Pass</span>
              <AppIcon name="flight" filled className="h-[18px] w-[18px]" />
            </div>

            <div className="flex items-center justify-between bg-[#ffffff] p-5">
              <div className="flex flex-col">
                <span className="text-headline-md tracking-tight text-[#1a1c1d]">JFK</span>
                <span className="text-body-sm text-[#717786]">New York</span>
              </div>
              <AppIcon name="flight_takeoff" className="px-2 text-[#c1c6d7]" />
              <div className="flex flex-col text-right">
                <span className="text-headline-md tracking-tight text-[#1a1c1d]">LHR</span>
                <span className="text-body-sm text-[#717786]">London</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t-[0.5px] border-[#c1c6d7]/20 bg-[#f3f3f5] px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#414755]">FLIGHT</span>
                <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#1a1c1d]">AE-402</span>
              </div>
              <div className="barcode-pattern mt-2 h-8 w-full text-[#c1c6d7] opacity-60" />
            </div>
          </div>
        </main>

        <section className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/40" />
            <span className="h-2 w-6 rounded-full bg-[#0058bc]" />
            <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/40" />
          </div>

          <div className="animate-fp-fade-up w-full max-w-md rounded-[24px] border border-[#ffffff]/50 bg-[#ffffff]/70 px-5 py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-[25px]">
            <h1 className="text-headline-lg text-[#1a1c1d]">Log Effortlessly.</h1>
            <p className="mx-auto mt-4 max-w-xs text-body-lg text-[#414755]">
              Enter a flight number and we&apos;ll handle the rest. Track your miles, hours, and routes automatically.
            </p>

            <button
              type="button"
              onClick={onNext}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[#0058bc] text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_8px_20px_rgba(0,88,188,0.25)] transition-transform active:scale-[0.98]"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function EarnBuildSlide({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9fb] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[80vw] w-[80vw] rounded-full bg-[#d8defe]/30 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-20%] h-[90vw] w-[90vw] rounded-full bg-[#d8e2ff]/40 blur-[100px]" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-5">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-[0.5px] border-white/50 bg-white/70 shadow-[0_8px_32px_rgba(0,40,90,0.08)] backdrop-blur-[25px]">
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-white/60" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="3D white-glass rendered Eiffel Tower rotating inside a luminous crystalline void"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoRw6PmeicTlYHXAY8iPM3kFN9dTMkOkttXhaWj7BptA1RWBjgwDty9dMco5XAS8PDPb4B3-j3WgrQgG2HxPpA0u1rDVPa17aYUqXD_TJT5iBhrQCDwO4AqQY2VT7CuEppwcyQG3gpX6jrRl6UqrgSniJsEYkhkkGLL4-0gRRmsEjwYaU9gZRc3vqOsyZKS7VzUc_Ed3TOABG7WKQxYbOas817SckP31-lCESUeOvTzMOgxZEzseq_8Qh460PV28OJ_pn5gPrZF4p3"
              className="absolute inset-0 h-full w-full scale-105 object-cover mix-blend-luminosity opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80" />
            <div className="absolute bottom-8 left-0 z-20 flex w-full justify-center gap-1 opacity-30">
              <span className="h-px w-2 bg-[#0058bc]" />
              <span className="h-px w-4 bg-[#0058bc]" />
              <span className="h-px w-2 bg-[#0058bc]" />
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-20 mx-auto flex w-full max-w-md flex-col items-center px-5 pb-8 text-center">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/50" />
          <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/50" />
          <span className="h-2 w-8 rounded-full bg-[#0058bc] shadow-[0_0_8px_rgba(0,88,188,0.4)]" />
        </div>

        <h1 className="mb-4 text-metric-display text-[#1a1c1d]">Earn &amp; Build.</h1>
        <p className="mb-10 max-w-xs text-body-lg text-[#414755]">
          Unlock exclusive passport stamps and use your air miles to build 3D landmarks on your personal globe.
        </p>

        <button
          type="button"
          onClick={onNext}
          className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0058bc] text-white shadow-[0_8px_20px_rgba(0,88,188,0.25)] transition-colors hover:bg-[#004d9f]"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="text-[12px] font-bold uppercase tracking-widest">Get Started</span>
          <AppIcon name="arrow_forward" className="h-[18px] w-[18px]" />
        </button>
      </section>
    </div>
  );
}

function NotificationsSlide({
  onNext,
  onSkip,
}: {
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9fb] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.55), transparent 24%), linear-gradient(to bottom, rgba(249,249,251,0.18), rgba(224,228,235,0.36)), radial-gradient(circle at 65% 0%, rgba(0,122,255,0.18), transparent 24%), radial-gradient(circle at 40% 100%, rgba(255,149,0,0.15), transparent 26%)" }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/20 to-[#e2e4eb]/40 mix-blend-overlay" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] h-[80vw] w-[80vw] rounded-full bg-[#d8defe]/30 blur-[80px]" />
          <div className="absolute bottom-[-10%] right-[-20%] h-[90vw] w-[90vw] rounded-full bg-[#d8e2ff]/40 blur-[100px]" />
        </div>

        <main className="relative z-10 flex flex-1 items-center justify-center p-5">
          <div className="animate-fp-scale-in w-full max-w-[375px] rounded-[24px] border-[0.5px] border-white/50 bg-white/70 p-[32px] text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-[25px]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[0.5px] border-white bg-white/50 shadow-sm backdrop-blur-[40px]">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#007AFF]/10">
                <div className="absolute inset-0 scale-110 rounded-full border border-[#007AFF]/20" />
                <AppIcon name="notifications" filled className="h-8 w-8 text-[#007AFF]" />
              </div>
            </div>

            <h1 className="mb-3 text-headline-lg text-[#1a1c1d]">
              Never Miss a Flight.
            </h1>
            <p className="mx-auto mb-8 max-w-[280px] text-body-lg text-[#414755]">
              Allow notifications for boarding reminders, gate changes, and milestone alerts.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onNext}
                className="flex h-14 w-full items-center justify-center rounded-full bg-[#0058bc] px-5 text-[12px] font-bold uppercase tracking-widest text-white transition-transform active:scale-[0.98]"
              >
                Enable Notifications
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="flex h-14 w-full items-center justify-center rounded-full border border-transparent bg-white/20 px-5 text-[12px] font-bold uppercase tracking-widest text-[#414755] transition-colors hover:border-white/50 hover:bg-white/40"
              >
                Not right now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AuthSlide({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9fb] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: "radial-gradient(circle at 40% 0%, rgba(255,255,255,0.55), transparent 22%), radial-gradient(circle at 70% 25%, rgba(172,198,255,0.5), transparent 28%), linear-gradient(to bottom, rgba(255,255,255,0.24), rgba(226,228,235,0.42))" }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1c1d]/30 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end">
        <main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center p-[20px]">
          <div className="animate-fp-scale-in w-full aspect-[4/5] overflow-hidden rounded-3xl border-[0.5px] border-white/50 bg-white/70 shadow-[0_8px_32px_rgba(0,40,90,0.08)] backdrop-blur-[25px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/60" />
            <div className="relative flex h-full w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="3D white-glass rendered Eiffel Tower rotating inside a luminous crystalline void"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoRw6PmeicTlYHXAY8iPM3kFN9dTMkOkttXhaWj7BptA1RWBjgwDty9dMco5XAS8PDPb4B3-j3WgrQgG2HxPpA0u1rDVPa17aYUqXD_TJT5iBhrQCDwO4AqQY2VT7CuEppwcyQG3gpX6jrRl6UqrgSniJsEYkhkkGLL4-0gRRmsEjwYaU9gZRc3vqOsyZKS7VzUc_Ed3TOABG7WKQxYbOas817SckP31-lCESUeOvTzMOgxZEzseq_8Qh460PV28OJ_pn5gPrZF4p3"
                className="absolute inset-0 h-full w-full scale-105 object-cover mix-blend-luminosity opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80" />
            </div>
            <div className="absolute bottom-8 left-0 flex w-full justify-center gap-1 opacity-30">
              <span className="h-px w-2 bg-[#0058bc]" />
              <span className="h-px w-4 bg-[#0058bc]" />
              <span className="h-px w-2 bg-[#0058bc]" />
            </div>
          </div>
        </main>

        <section className="relative z-10 w-full bg-white/70 px-[20px] pb-[48px] pt-[32px] backdrop-blur-[40px]">
          <div className="mx-auto flex max-w-md flex-col gap-6 rounded-t-[32px] md:rounded-[32px] md:border md:border-white/60 md:shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-headline-lg text-[#1a1c1d]">Where is home?</h1>
              <p className="text-body-lg text-[#414755]">
                Set your primary departure hub for a frictionless experience.
              </p>
            </div>

            <div className="relative w-full group">
              <span className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#717786] transition-colors group-focus-within:text-[#0058bc]">
                <AppIcon name="flight_takeoff" className="h-6 w-6" />
              </span>
              <input
                type="text"
                placeholder="e.g., JFK, LHR, DXB"
                className="h-[60px] w-full rounded-xl border-[0.5px] border-[#c1c6d7] bg-white/40 pl-[48px] pr-4 text-body-lg text-[#1a1c1d] shadow-inner outline-none transition-all placeholder:text-[#717786] focus:border-[#0058bc] focus:ring-1 focus:ring-[#0058bc]"
              />
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0058bc] text-[12px] font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#0050aa]"
            >
              <span>Take Off</span>
              <AppIcon name="arrow_forward" className="h-[18px] w-[18px]" />
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-[#c1c6d7]/30" />
              <span className="text-body-sm text-[#717786]">or connect instantly</span>
              <div className="h-px flex-1 bg-[#c1c6d7]/30" />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-[16px] text-white transition-opacity hover:opacity-80"
              >
                <svg fill="none" height="24" viewBox="0 0 20 24" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13.2562 6.95312C14.075 5.96562 14.625 4.60312 14.475 3.23438C13.3125 3.28125 11.8938 4.00937 11.0438 4.99688C10.2938 5.85938 9.64375 7.24688 9.825 8.59688C11.1187 8.69688 12.4438 7.93437 13.2562 6.95312ZM14.1687 13.2875C14.1375 11.0187 15.9937 9.94063 16.0812 9.89062C15.0188 8.32812 13.3812 8.09687 12.8312 8.07812C11.4125 7.93437 10.0187 8.91875 9.2875 8.91875C8.55625 8.91875 7.425 8.09687 6.2375 8.11562C4.7 8.13438 3.2625 8.95938 2.45625 10.3656C0.825 13.2031 2.0375 17.4094 3.63125 19.7094C4.40625 20.8344 5.31875 22.1094 6.55625 22.0656C7.75625 22.0187 8.2125 21.2844 9.6625 21.2844C11.0938 21.2844 11.5125 22.0656 12.7687 22.0469C14.0625 22.0281 14.8687 20.9 15.6375 19.7531C16.5438 18.4281 16.9187 17.1344 16.9375 17.0656C16.9062 17.0531 14.2062 16.0344 14.1687 13.2875Z" fill="white" />
                </svg>
                Continue with Apple
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#c1c6d7] bg-white text-[16px] text-[#1a1c1d] shadow-sm transition-colors hover:bg-[#f3f3f5]"
              >
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
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
    return (
      <GlobeIntroSlide
        onNext={() => setSlideIndex(1)}
        onSkip={finish}
      />
    );
  }

  if (slideIndex === 1) {
    return <LogPassSlide onNext={() => setSlideIndex(2)} />;
  }

  if (slideIndex === 2) {
    return <EarnBuildSlide onNext={() => setSlideIndex(3)} />;
  }

  if (slideIndex === 3) {
    return (
      <NotificationsSlide
        onNext={() => setSlideIndex(4)}
        onSkip={() => setSlideIndex(4)}
      />
    );
  }

  return <AuthSlide onComplete={finish} />;
}

export { STORAGE_KEY as ONBOARDING_STORAGE_KEY };
