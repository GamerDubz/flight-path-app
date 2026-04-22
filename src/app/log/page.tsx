"use client";

import { useState } from "react";
import { TopBar } from "@/components/ui/top-bar";
import { useRouter } from "next/navigation";

export default function LogFlightPage() {
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
    <div className="min-h-screen bg-linear-to-b from-(--color-surface-container-lowest) to-(--color-surface-container-high) relative overflow-x-hidden">
      <TopBar title="Log Flight" showBack backHref="/" />

      <main className="pt-[100px] pb-[120px] px-5 max-w-md mx-auto min-h-screen flex flex-col justify-center">
        {/* Wallet Pass Glass Card */}
        <div className="relative bg-white/70 backdrop-blur-[25px] rounded-[24px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          {/* Flight Number Search */}
          <div className="p-5 border-b border-(--color-outline-variant)/30 bg-white/50">
            <div className="relative flex items-center bg-white/50 rounded-full border border-white/80 focus-within:border-[#007AFF] transition-colors h-12 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              <span className="material-symbols-outlined text-(--color-outline) mr-3">
                search
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-body-lg text-foreground placeholder:text-(--color-outline)/70 p-0"
                placeholder="Flight Number (e.g., BA117)"
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Origin → Destination */}
          <div className="p-5 flex justify-between items-center relative">
            {/* Origin */}
            <div className="flex flex-col items-start w-1/3 z-10">
              <label className="text-label-bold text-(--color-outline) mb-1">
                From
              </label>
              <input
                className="bg-transparent border-b border-dashed border-(--color-outline-variant)/50 focus:border-[#007AFF] focus:ring-0 focus:outline-none text-metric-display text-foreground w-full p-0 text-left transition-colors uppercase"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase().slice(0, 3))}
                maxLength={3}
              />
              <span className="text-body-sm text-(--color-on-surface-variant) mt-1">
                London
              </span>
            </div>

            {/* Flight path connector */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-2 z-0">
              <div className="w-full h-px border-t border-dashed border-[#007AFF] absolute top-1/2 left-0 -translate-y-1/2" />
              <div className="w-8 h-8 rounded-full bg-white border border-[#007AFF]/20 flex items-center justify-center relative z-10 shadow-[0_2px_8px_rgba(0,122,255,0.15)]">
                <span className="material-symbols-outlined text-[#007AFF] rotate-90 text-[20px]">
                  flight
                </span>
              </div>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-end w-1/3 z-10">
              <label className="text-label-bold text-(--color-outline) mb-1">
                To
              </label>
              <input
                className="bg-transparent border-b border-dashed border-(--color-outline-variant)/50 focus:border-[#007AFF] focus:ring-0 focus:outline-none text-metric-display text-foreground w-full p-0 text-right placeholder:text-(--color-outline-variant) transition-colors uppercase"
                placeholder="JFK"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase().slice(0, 3))}
                maxLength={3}
              />
              <span className="text-body-sm text-(--color-on-surface-variant) mt-1">
                {destination ? "New York" : "\u00A0"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="px-5 pb-5 pt-0">
            <div className="w-full h-px bg-linear-to-r from-transparent via-(--color-outline-variant)/30 to-transparent" />
          </div>

          {/* Details Grid */}
          <div className="px-5 pb-5 pt-0 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-label-bold text-(--color-outline) mb-2 flex items-center">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  calendar_today
                </span>
                Date
              </label>
              <input
                className="bg-white/50 border border-white/60 focus:border-[#007AFF] focus:outline-none rounded-lg text-body-sm text-foreground p-2 w-full transition-colors shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                type="date"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-label-bold text-(--color-outline) mb-2 flex items-center">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  airline_seat_recline_extra
                </span>
                Class
              </label>
              <select
                className="bg-white/50 border border-white/60 focus:border-[#007AFF] focus:outline-none rounded-lg text-body-sm text-foreground p-2 w-full transition-colors shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] appearance-none"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
              >
                <option>Economy</option>
                <option>Premium</option>
                <option>Business</option>
                <option>First</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 bottom-2 text-(--color-outline) pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>

            <div className="flex flex-col">
              <label className="text-label-bold text-(--color-outline) mb-2 flex items-center">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  chair
                </span>
                Seat
              </label>
              <input
                className="bg-white/50 border border-white/60 focus:border-[#007AFF] focus:outline-none rounded-lg text-body-sm text-foreground p-2 w-full transition-colors shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-(--color-outline)/50 uppercase"
                placeholder="12A"
                type="text"
                value={seat}
                onChange={(e) => setSeat(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          {/* Slide to Log */}
          <div className="p-5 bg-(--color-surface-container-highest)/20 mt-2">
            <button
              onClick={handleSlideToLog}
              className="relative w-full h-[56px] bg-[#0070eb] rounded-full overflow-hidden flex items-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer border border-[#007AFF]/20 group"
            >
              <div className="absolute inset-0 flex items-center justify-center text-headline-md text-white/80 z-0 pointer-events-none tracking-wide">
                Slide to Log
              </div>
              <div
                className={`h-[48px] w-[48px] bg-white rounded-full ml-1 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 border border-white/50 relative transition-transform duration-500 ${
                  isSliding ? "translate-x-[calc(100vw-120px)]" : "group-hover:translate-x-2"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[#0070eb] rotate-90 text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flight
                </span>
              </div>
            </button>
          </div>

          {/* Wallet pass edge cuts */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background rounded-full border-r border-white/50 shadow-[inset_2px_0_4px_rgba(0,0,0,0.02)]" />
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background rounded-full border-l border-white/50 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.02)]" />
        </div>
      </main>
    </div>
  );
}
