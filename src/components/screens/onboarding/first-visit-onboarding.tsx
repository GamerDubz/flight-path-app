"use client";

import { useState } from "react";
import { Globe } from "@/components/ui/cobe-globe";
import { AppIcon } from "@/components/ui/app-icon";
import { flightsToGlobeData } from "@/lib/flights-to-globe";
import { MOCK_FLIGHTS } from "@/lib/mock-data";

const STORAGE_KEY = "flight-path-onboarding-completed";

type SlideId = 0 | 1 | 2 | 3 | 4;

const UTILITY_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTHE9b-3rwG6i9eZ8DNs2yZIlvnjj6AEa1QGeyzHcFClNWi5q4EmMydDKYXB_HRLTERak8wmmTP7M2_YFbcY5uFhfL00d2nXLhH26lNK1SvBMPnn_dhlvYuPv0CikncprE-U9DhiMcHFM7603GzVxmS_lheG9q2Wu6x3BUaqaHKm_baDzVDqlB-gVRV3-cLeRHY8sUZRTsQzJ6jreaz-YX5EWxP95r1YDGNGZpvclGgpWn8745hrbpVKeEQC6HkD3JgI5V9yo_U8Jv";
const GAMIFICATION_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBoRw6PmeicTlYHXAY8iPM3kFN9dTMkOkttXhaWj7BptA1RWBjgwDty9dMco5XAS8PDPb4B3-j3WgrQgG2HxPpA0u1rDVPa17aYUqXD_TJT5iBhrQCDwO4AqQY2VT7CuEppwcyQG3gpX6jrRl6UqrgSniJsEYkhkkGLL4-0gRRmsEjwYaU9gZRc3vqOsyZKS7VzUc_Ed3TOABG7WKQxYbOas817SckP31-lCESUeOvTzMOgxZEzseq_8Qh460PV28OJ_pn5gPrZF4p3";
const PERMISSIONS_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDD_zhC58TKMFxna8TJxOZjIT2jyWt1cm42RYXirmhwyLnmWI0T7gu5-8sTcr81l5CSrY2Rm6O8hDXUIDP3dMTQ9sgAVj-prFWqTrgC5YnOAloTYUrPoqmapSdbfR-M0QrLg7X1FabMQwjwbqgk6rqRokCRCdChjHlWUPhDTChD_a5r77y4bY2VyY8nzRESzeIoZag5l6OkSh0ESjLKKDHHu41bt7lfOvLyqbxh9yLyO5dfvwccDDjzjMA-JdF3a8XwigJ6QbA2C3Vr";
const AUTH_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAPLpQq7hncY8XWSZe2t0Pm3lMXlDjL5LEZPU4EDHWboVTYSlZE9Do0H_35h0FfJZCIdUf4cUaLEKz1EslzWgA3JCVe5CpcZtE5Ew57wY4nuQiAZcTlVzArBMimv-9AS6VPSn1xw7D8VcCfYV2m7KbaCakk59npXszKnDF75URgoMPHL_UL4CY0ioAMJYu9T54xOHSEITra4lwvkIVzw0GPy53yPSkRQcqMUYwptmm2ptixw0DVLUwga2Di0s18oPSMAuCRqcltd-MM";
const ONBOARDING_GLOBE = flightsToGlobeData(MOCK_FLIGHTS.slice(0, 4));

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
            active === index ? "w-8 bg-[#0058bc]" : "w-2 bg-[#c1c6d7]/50"
          }`}
        />
      ))}
    </div>
  );
}

function GlobeIntroSlide({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#eef1f7] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.92),transparent_24%),radial-gradient(circle_at_50%_52%,rgba(0,122,255,0.1),transparent_36%),radial-gradient(circle_at_center,rgba(255,255,255,0.88),rgba(238,241,247,0.98))]" />
      <div className="absolute inset-0 z-0 opacity-95">
        <div className="absolute left-1/2 top-[-6vh] w-[162vw] max-w-[1480px] -translate-x-1/2 sm:w-[124vw] lg:top-[-8vh] lg:w-[102vw]">
          <Globe
            markers={ONBOARDING_GLOBE.markers}
            arcs={ONBOARDING_GLOBE.arcs}
            markerColor={[0.96, 0.97, 0.98]}
            baseColor={[0.98, 0.98, 0.99]}
            arcColor={[0.0, 0.48, 1.0]}
            glowColor={[0.97, 0.98, 1.0]}
            dark={0}
            mapBrightness={11}
            markerSize={0.017}
            markerElevation={0.02}
            arcWidth={0.85}
            arcHeight={0.34}
            speed={0.0006}
            theta={0.1}
            diffuse={1.15}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_42%,rgba(238,241,247,0.22)_70%,rgba(238,241,247,0.88)_100%)]" />
      </div>

      <main className="relative z-10 flex min-h-dvh items-end px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+16px)]">
        <div className="mx-auto w-full max-w-[390px]">
          <div className="animate-fp-fade-up rounded-[28px] border border-white/70 bg-white/82 p-5 text-center text-[#1a1c1d] shadow-[0_12px_40px_rgba(18,34,66,0.08)] backdrop-blur-[24px]">
            <div className="flex flex-col gap-3">
              <h1 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#123d8a]">
                Your Journey,
                <br />
                Visualized.
              </h1>
              <p className="mx-auto max-w-[286px] text-[16px] leading-[1.55] text-[#4d556a]">
                Turn your flights into a beautiful, interactive 3D world.
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
              <PaginationDots active={0} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LogPassSlide({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#eef1f7] text-[#1a1c1d]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-top opacity-90 mix-blend-multiply"
        style={{ backgroundImage: `url("${UTILITY_BG}")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eef1f7]/16 via-[#eef1f7]/62 to-[#eef1f7]" />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end pb-8 px-4">
        <main className="relative z-10 flex flex-col items-center">
          <div className="animate-fp-scale-in relative z-20 w-[222px] overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_18px_36px_rgba(18,34,66,0.12)]">
            <div className="flex items-center justify-between bg-[#0058bc] px-4 py-3 text-white">
              <span className="text-[12px] font-bold uppercase tracking-widest">Aero Pass</span>
              <AppIcon name="flight" filled className="h-[18px] w-[18px]" />
            </div>

            <div className="flex items-center justify-between bg-white p-5">
              <div className="flex flex-col">
                <span className="text-[24px] font-semibold leading-[1.3] tracking-tight text-[#1a1c1d]">
                  JFK
                </span>
                <span className="text-[14px] leading-[1.4] text-[#717786]">New York</span>
              </div>
              <AppIcon name="flight_takeoff" className="px-2 text-[#c1c6d7]" />
              <div className="flex flex-col text-right">
                <span className="text-[24px] font-semibold leading-[1.3] tracking-tight text-[#1a1c1d]">
                  LHR
                </span>
                <span className="text-[14px] leading-[1.4] text-[#717786]">London</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t-[0.5px] border-[#e1e4ec] bg-[#f4f6fb] px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#414755]">
                  FLIGHT
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#1a1c1d]">
                  AE-402
                </span>
              </div>
              <div className="barcode-pattern mt-2 h-8 w-full text-[#c1c6d7] opacity-60" />
            </div>
          </div>
        </main>

        <section className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-7 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/40" />
            <span className="h-2 w-6 rounded-full bg-[#0058bc]" />
            <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/40" />
          </div>

          <div className="animate-fp-fade-up w-full max-w-md rounded-[28px] border border-white/70 bg-white/82 px-5 py-8 text-center shadow-[0_12px_40px_rgba(18,34,66,0.08)] backdrop-blur-[24px]">
            <h1 className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#1a1c1d]">
              Log Effortlessly.
            </h1>
            <p className="mx-auto mt-4 max-w-xs text-[16px] leading-[1.55] text-[#4d556a]">
              Enter a flight number and we&apos;ll handle the rest. Track your miles, hours, and routes automatically.
            </p>

            <button
              type="button"
              onClick={onNext}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[#1d5cc7] text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
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
    <div className="relative min-h-dvh overflow-hidden bg-[#eef1f7] text-[#1a1c1d]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[80vw] w-[80vw] rounded-full bg-[#d8defe]/18 blur-[84px]" />
        <div className="absolute bottom-[-10%] right-[-20%] h-[90vw] w-[90vw] rounded-full bg-[#d8e2ff]/24 blur-[100px]" />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-5">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[30px] border border-white/70 bg-white/78 shadow-[0_12px_40px_rgba(18,34,66,0.08)] backdrop-blur-[24px]">
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/16 via-transparent to-white/72" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="3D white-glass rendered Eiffel Tower rotating inside a luminous crystalline void"
              src={GAMIFICATION_BG}
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

      <section className="relative z-20 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-8 text-center">
        <div className="mb-7 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/50" />
          <span className="h-2 w-2 rounded-full bg-[#c1c6d7]/50" />
          <span className="h-2 w-8 rounded-full bg-[#0058bc] shadow-[0_0_8px_rgba(0,88,188,0.4)]" />
        </div>

        <h1 className="mb-4 text-[46px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#1a1c1d]">
          Earn &amp; Build.
        </h1>
        <p className="mb-9 max-w-xs text-[16px] leading-[1.55] text-[#4d556a]">
          Unlock exclusive passport stamps and use your air miles to build 3D landmarks on your personal globe.
        </p>

        <button
          type="button"
          onClick={onNext}
          className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#1d5cc7] text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-colors hover:bg-[#174cac]"
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
    <div className="relative min-h-dvh overflow-hidden bg-[#eef1f7] text-[#1a1c1d]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url("${PERMISSIONS_BG}")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/20 to-[#eef1f7]/60 mix-blend-overlay" />

      <main className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-5">
        <div className="animate-fp-scale-in w-full max-w-[375px] rounded-[28px] border border-white/70 bg-white/82 p-[30px] text-center shadow-[0_12px_40px_rgba(18,34,66,0.08)] backdrop-blur-[24px]">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white/60 shadow-sm backdrop-blur-[36px]">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#007AFF]/10">
              <div className="absolute inset-0 scale-110 rounded-full border border-[#007AFF]/20" />
              <AppIcon name="notifications" filled className="h-8 w-8 text-[#007AFF]" />
            </div>
          </div>

          <h1 className="mb-3 text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1a1c1d]">
            Never Miss a Flight.
          </h1>
          <p className="mx-auto mb-8 max-w-[280px] text-[16px] leading-[1.55] text-[#4d556a]">
            Allow notifications for boarding reminders, gate changes, and milestone alerts.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onNext}
              className="flex h-14 w-full items-center justify-center rounded-full bg-[#1d5cc7] px-5 text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-transform active:scale-[0.99]"
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
  );
}

function AuthSlide({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#eef1f7] text-[#1a1c1d]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url("${AUTH_BG}")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#eef1f7]/30 pointer-events-none" />

      <main className="relative z-20 flex min-h-dvh items-end">
        <section className="w-full bg-white/72 px-4 pb-[42px] pt-[28px] backdrop-blur-[40px]">
          <div className="mx-auto flex max-w-[390px] flex-col gap-5 rounded-t-[32px] md:rounded-[32px] md:border md:border-white/60 md:shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1a1c1d]">
                Where is home?
              </h1>
              <p className="text-[16px] leading-[1.55] text-[#4d556a]">
                Set your primary departure hub for a frictionless experience.
              </p>
            </div>

            <div className="group relative w-full">
              <span className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#717786] transition-colors group-focus-within:text-[#1d5cc7]">
                <AppIcon name="flight_takeoff" className="h-6 w-6" />
              </span>
              <input
                type="text"
                placeholder="e.g., JFK, LHR, DXB"
                className="h-[60px] w-full rounded-xl border border-[#d7dbe6] bg-white/46 pl-[48px] pr-4 text-[16px] leading-[1.55] text-[#1a1c1d] shadow-inner outline-none transition-all placeholder:text-[#717786] focus:border-[#1d5cc7] focus:ring-1 focus:ring-[#1d5cc7]"
              />
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1d5cc7] text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_10px_24px_rgba(29,92,199,0.22)] transition-colors hover:bg-[#174cac]"
            >
              <span>Take Off</span>
              <AppIcon name="arrow_forward" className="h-[18px] w-[18px]" />
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-[#d7dbe6]/65" />
              <span className="text-[13px] leading-[1.4] text-[#717786]">or connect instantly</span>
              <div className="h-px flex-1 bg-[#d7dbe6]/65" />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-[15px] text-white transition-opacity hover:opacity-80"
              >
                <svg fill="none" height="24" viewBox="0 0 20 24" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13.2562 6.95312C14.075 5.96562 14.625 4.60312 14.475 3.23438C13.3125 3.28125 11.8938 4.00937 11.0438 4.99688C10.2938 5.85938 9.64375 7.24688 9.825 8.59688C11.1187 8.69688 12.4438 7.93437 13.2562 6.95312ZM14.1687 13.2875C14.1375 11.0187 15.9937 9.94063 16.0812 9.89062C15.0188 8.32812 13.3812 8.09687 12.8312 8.07812C11.4125 7.93437 10.0187 8.91875 9.2875 8.91875C8.55625 8.91875 7.425 8.09687 6.2375 8.11562C4.7 8.13438 3.2625 8.95938 2.45625 10.3656C0.825 13.2031 2.0375 17.4094 3.63125 19.7094C4.40625 20.8344 5.31875 22.1094 6.55625 22.0656C7.75625 22.0187 8.2125 21.2844 9.6625 21.2844C11.0938 21.2844 11.5125 22.0656 12.7687 22.0469C14.0625 22.0281 14.8687 20.9 15.6375 19.7531C16.5438 18.4281 16.9187 17.1344 16.9375 17.0656C16.9062 17.0531 14.2062 16.0344 14.1687 13.2875Z" fill="white" />
                </svg>
                Continue with Apple
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#d7dbe6] bg-white text-[15px] text-[#1a1c1d] shadow-sm transition-colors hover:bg-[#f3f5f9]"
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
      </main>
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
    return <GlobeIntroSlide onNext={() => setSlideIndex(1)} />;
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
