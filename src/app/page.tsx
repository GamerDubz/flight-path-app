"use client";

import { useState, useMemo } from "react";
import { Globe } from "@/components/ui/cobe-globe";
import { TopBar } from "@/components/ui/top-bar";
import { BottomNav } from "@/components/ui/bottom-nav";
import { OnboardingModal } from "@/components/ui/onboarding-modal";
import { MOCK_FLIGHTS, MOCK_PROFILE } from "@/lib/mock-data";
import { flightsToGlobeData } from "@/lib/flights-to-globe";
import type { Flight } from "@/lib/types";

import { AddFlightModal } from "@/components/ui/add-flight-modal";

// ─── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div className="stat-badge px-4 py-3 flex items-center gap-3">
      <span
        className="material-symbols-outlined text-[#007AFF] text-2xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <div>
        <div className="text-(--color-on-surface-variant) text-[11px] font-bold uppercase tracking-wider">{label}</div>
        <div className="text-foreground font-extrabold text-xl leading-tight">{value}</div>
        {sub && <div className="text-(--color-on-surface-variant)/70 text-[11px] mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Recent Flight Row ────────────────────────────────────────────
function RecentFlightRow({ flight, onRemove }: { flight: Flight; onRemove: (id: string) => void }) {
  const date = flight.departure_time
    ? new Date(flight.departure_time).toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    : "--";

  const cabinColors: Record<string, string> = {
    First: "bg-yellow-100 text-yellow-700",
    Business: "bg-blue-100 text-blue-700",
    Economy: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-(--color-outline-variant)/40 last:border-none group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#007AFF] text-[18px] rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
        </div>
        <div>
          <div className="font-bold text-[15px] text-foreground">
            {flight.origin_iata} → {flight.destination_iata}
          </div>
          <div className="text-[12px] text-(--color-on-surface-variant)">
            {flight.airline || "Unknown"} · {date}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${cabinColors[flight.cabin_class] ?? cabinColors.Economy}`}>
          {flight.cabin_class}
        </span>
        <button
          onClick={() => onRemove(flight.id)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-(--color-on-surface-variant)/40 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          title="Remove flight"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function HomePage() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFlights, setShowFlights] = useState(false);

  const { markers, arcs } = useMemo(() => flightsToGlobeData(flights), [flights]);

  const totalMiles = flights.reduce((sum, f) => sum + (f.distance_miles ?? 0), 0);

  const handleAddFlight = (f: Partial<Flight>) => {
    setFlights(prev => [f as Flight, ...prev]);
  };

  const handleRemove = (id: string) => {
    setFlights(prev => prev.filter(f => f.id !== id));
  };

  const recent = [...flights]
    .sort((a, b) => new Date(b.departure_time ?? 0).getTime() - new Date(a.departure_time ?? 0).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OnboardingModal />

      {showAddModal && (
        <AddFlightModal
          onAdd={handleAddFlight}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <TopBar />

      <main className="flex-1 pb-24 pt-16">
        {/* ── HERO — Globe Section ─────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-(--color-primary-fixed)/20 via-transparent to-background/90 pointer-events-none" />

          {/* Globe canvas — padded so full sphere visible */}
          <div className="relative flex items-center justify-center pt-6 pb-6 px-0 overflow-hidden">

            {/* Globe sized to fit fully — 92vw capped at 520px so sphere edges always show */}
            <div className="w-[92vw] max-w-[520px] mx-auto">
              <Globe
                markers={markers}
                arcs={arcs}
                markerColor={[0.0, 0.48, 1.0]}
                baseColor={[1, 1, 1]}
                arcColor={[0.0, 0.48, 1.0]}
                glowColor={[0.96, 0.96, 0.97]}
                dark={0}
                mapBrightness={10}
                markerSize={0.018}
                speed={0.0008}
                theta={0.1}
                diffuse={1.2}
              />
            </div>
          </div>
        </section>

        {/* ── OVERVIEW STATS ──────────────────────────────────────── */}
        <section className="bg-white px-5 py-5">
          <div className="grid grid-cols-3 gap-2">
            <StatCard icon="flight_takeoff" label="Flights" value={String(flights.length)} sub="logged" />
            <StatCard icon="route" label="Miles" value={totalMiles > 0 ? `${(totalMiles / 1000).toFixed(0)}k` : `${(MOCK_PROFILE.total_miles / 1000).toFixed(0)}k`} sub="total" />
            <StatCard icon="public" label="Countries" value={String(MOCK_PROFILE.total_countries)} sub="visited" />
          </div>
        </section>

        {/* ── RECENT FLIGHTS ────────────────────────────────────── */}
        <section className="bg-white mt-3 px-5 py-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-headline-md text-foreground">Recent Flights</h3>
              <p className="text-[13px] text-(--color-on-surface-variant) mt-0.5">
                {flights.length} flight{flights.length !== 1 ? "s" : ""} · updates the globe live
              </p>
            </div>
            <button
              onClick={() => setShowFlights(v => !v)}
              className="text-[#007AFF] text-[13px] font-semibold hover:underline"
            >
              {showFlights ? "Hide" : "Show all"}
            </button>
          </div>

          <div>
            {(showFlights ? flights.slice().sort((a, b) =>
              new Date(b.departure_time ?? 0).getTime() - new Date(a.departure_time ?? 0).getTime()
            ) : recent).map(f => (
              <RecentFlightRow key={f.id} flight={f} onRemove={handleRemove} />
            ))}
          </div>

          {flights.length === 0 && (
            <div className="py-10 flex flex-col items-center text-center text-(--color-on-surface-variant)">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-30">flight_land</span>
              <p className="text-body-lg font-medium">No flights yet</p>
              <p className="text-body-sm mt-1">Add your first flight to see it on the globe.</p>
            </div>
          )}
        </section>

        {/* ── XP PROGRESS ──────────────────────────────────────── */}
        <section className="bg-white mt-3 border-y border-(--color-outline-variant) px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-[16px] text-foreground">Air Miles XP</h3>
              <p className="text-[13px] text-(--color-on-surface-variant)">Level 4 Explorer</p>
            </div>
            <div className="text-right">
              <span className="text-[#007AFF] font-extrabold text-xl">{MOCK_PROFILE.air_miles_xp.toLocaleString()}</span>
              <span className="text-(--color-on-surface-variant) text-[13px]"> XP</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-(--color-surface-container) rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#007AFF] to-[#00C6FF] rounded-full transition-all duration-700"
              style={{ width: `${((MOCK_PROFILE.air_miles_xp % 15000) / 15000) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[12px] text-(--color-on-surface-variant)">
            <span>Level 4</span>
            <span>{(15000 - (MOCK_PROFILE.air_miles_xp % 15000)).toLocaleString()} XP to Level 5</span>
          </div>
        </section>

        {/* ── QUICK ACTIONS ────────────────────────────────────── */}
        <section className="px-4 py-5 flex flex-col gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-[#007AFF] text-white rounded-2xl py-4 font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#0070eb] transition-colors shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            Add New Flight to Globe
          </button>
          <div className="grid grid-cols-2 gap-3">
            <a href="/passport" className="bg-white border border-(--color-outline-variant) rounded-2xl py-3.5 font-semibold text-[14px] flex items-center justify-center gap-2 text-foreground hover:bg-(--color-surface-container-low) transition-colors">
              <span className="material-symbols-outlined text-[#FF9500] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>book</span>
              Passport
            </a>
            <a href="/trips" className="bg-white border border-(--color-outline-variant) rounded-2xl py-3.5 font-semibold text-[14px] flex items-center justify-center gap-2 text-foreground hover:bg-(--color-surface-container-low) transition-colors">
              <span className="material-symbols-outlined text-[#34C759] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              All Trips
            </a>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
