"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppIcon } from "@/components/ui/app-icon";
import { TopBar } from "@/components/ui/top-bar";

export default function FlightLogPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState("LHR");
  const [destination, setDestination] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [seat, setSeat] = useState("");
  const [isSliding, setIsSliding] = useState(false);

  const handleSlideToLog = () => {
    setIsSliding(true);
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-linear-to-b from-(--color-surface-container-lowest) to-(--color-surface-container-high)">
      <TopBar title="Log Flight" showBack backHref="/home" />

      <main className="flex min-h-screen max-w-md flex-col justify-center px-5 pb-[120px] pt-[100px]">
        <div className="relative flex flex-col overflow-hidden rounded-[24px] border border-white/50 bg-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-[25px]">
          <div className="border-b border-(--color-outline-variant)/30 bg-white/50 p-5">
            <div className="relative flex h-12 items-center rounded-full border border-white/80 bg-white/50 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-colors focus-within:border-[#007AFF]">
              <AppIcon name="search" className="mr-3 h-5 w-5 text-(--color-outline)" />
              <input
                className="w-full border-none bg-transparent p-0 text-body-lg text-foreground placeholder:text-(--color-outline)/70 focus:outline-none focus:ring-0"
                placeholder="Flight Number (e.g., BA117)"
                type="text"
                value={flightNumber}
                onChange={(event) => setFlightNumber(event.target.value)}
              />
            </div>
          </div>

          <div className="relative flex items-center justify-between p-5">
            <div className="z-10 flex w-1/3 flex-col items-start">
              <label className="mb-1 text-label-bold text-(--color-outline)">From</label>
              <input
                className="w-full border-b border-dashed border-(--color-outline-variant)/50 bg-transparent p-0 text-metric-display uppercase text-foreground transition-colors focus:border-[#007AFF] focus:outline-none focus:ring-0"
                type="text"
                value={origin}
                onChange={(event) => setOrigin(event.target.value.toUpperCase().slice(0, 3))}
                maxLength={3}
              />
              <span className="mt-1 text-body-sm text-(--color-on-surface-variant)">London</span>
            </div>

            <div className="z-0 flex flex-1 flex-col items-center justify-center px-2">
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 border-t border-dashed border-[#007AFF]" />
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#007AFF]/20 bg-white shadow-[0_2px_8px_rgba(0,122,255,0.15)]">
                <AppIcon name="flight" filled className="h-5 w-5 rotate-90 text-[#007AFF]" />
              </div>
            </div>

            <div className="z-10 flex w-1/3 flex-col items-end">
              <label className="mb-1 text-label-bold text-(--color-outline)">To</label>
              <input
                className="w-full border-b border-dashed border-(--color-outline-variant)/50 bg-transparent p-0 text-right text-metric-display uppercase text-foreground placeholder:text-(--color-outline-variant) transition-colors focus:border-[#007AFF] focus:outline-none focus:ring-0"
                placeholder="JFK"
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value.toUpperCase().slice(0, 3))}
                maxLength={3}
              />
              <span className="mt-1 text-body-sm text-(--color-on-surface-variant)">
                {destination ? "New York" : "\u00A0"}
              </span>
            </div>
          </div>

          <div className="px-5 pb-5 pt-0">
            <div className="h-px w-full bg-linear-to-r from-transparent via-(--color-outline-variant)/30 to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-4 px-5 pb-5 pt-0">
            <div className="flex flex-col">
              <label className="mb-2 flex items-center text-label-bold text-(--color-outline)">
                <AppIcon name="calendar_today" className="mr-1 h-[14px] w-[14px]" />
                Date
              </label>
              <input
                className="w-full rounded-lg border border-white/60 bg-white/50 p-2 text-body-sm text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#007AFF] focus:outline-none"
                type="date"
              />
            </div>

            <div className="relative flex flex-col">
              <label className="mb-2 flex items-center text-label-bold text-(--color-outline)">
                <AppIcon name="airline_seat_recline_extra" className="mr-1 h-[14px] w-[14px]" />
                Class
              </label>
              <select
                className="w-full appearance-none rounded-lg border border-white/60 bg-white/50 p-2 text-body-sm text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#007AFF] focus:outline-none"
                value={cabinClass}
                onChange={(event) => setCabinClass(event.target.value)}
              >
                <option>Economy</option>
                <option>Premium</option>
                <option>Business</option>
                <option>First</option>
              </select>
              <AppIcon name="expand_more" className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 text-(--color-outline)" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 flex items-center text-label-bold text-(--color-outline)">
                <AppIcon name="chair" className="mr-1 h-[14px] w-[14px]" />
                Seat
              </label>
              <input
                className="w-full rounded-lg border border-white/60 bg-white/50 p-2 text-body-sm text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] uppercase placeholder:text-(--color-outline)/50 transition-colors focus:border-[#007AFF] focus:outline-none"
                placeholder="12A"
                type="text"
                value={seat}
                onChange={(event) => setSeat(event.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="mt-2 bg-(--color-surface-container-highest)/20 p-5">
            <button
              onClick={handleSlideToLog}
              className="group relative flex h-[56px] w-full cursor-pointer items-center overflow-hidden rounded-full border border-[#007AFF]/20 bg-[#0070eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
            >
              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-headline-md tracking-wide text-white/80">
                Slide to Log
              </div>
              <div
                className={`relative z-10 ml-1 flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform duration-500 ${
                  isSliding ? "translate-x-[calc(100vw-120px)]" : "group-hover:translate-x-2"
                }`}
              >
                <AppIcon name="flight" filled className="h-6 w-6 rotate-90 text-[#0070eb]" />
              </div>
            </button>
          </div>

          <div className="absolute -left-3 top-1/2 h-6 w-6 rounded-full border-r border-white/50 bg-background shadow-[inset_2px_0_4px_rgba(0,0,0,0.02)]" />
          <div className="absolute -right-3 top-1/2 h-6 w-6 rounded-full border-l border-white/50 bg-background shadow-[inset_-2px_0_4px_rgba(0,0,0,0.02)]" />
        </div>
      </main>
    </div>
  );
}
