"use client";

import { useEffect, useMemo, useState } from "react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { AddFlightModal } from "@/components/ui/add-flight-modal";
import { AppIcon, type AppIconName } from "@/components/ui/app-icon";
import { TopBar } from "@/components/ui/top-bar";
import { Globe } from "@/components/ui/cobe-globe";
import { flightsToGlobeData } from "@/lib/flights-to-globe";
import { MOCK_FLIGHTS, MOCK_PROFILE } from "@/lib/mock-data";
import type { Flight } from "@/lib/types";
import {
  FirstVisitOnboarding,
  ONBOARDING_STORAGE_KEY,
} from "@/components/screens/onboarding/first-visit-onboarding";

function TravelStatCard({
  icon,
  label,
  value,
  sublabel,
}: {
  icon: string;
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="stat-badge flex items-center gap-3 px-4 py-3">
      <AppIcon name={icon as AppIconName} filled className="h-6 w-6 shrink-0 text-[#007AFF]" />
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-(--color-on-surface-variant)">
          {label}
        </div>
        <div className="text-xl font-extrabold leading-tight text-foreground">
          {value}
        </div>
        {sublabel && <div className="mt-0.5 text-[11px] text-(--color-on-surface-variant)/70">{sublabel}</div>}
      </div>
    </div>
  );
}

function RecentFlightItem({
  flight,
  onRemove,
}: {
  flight: Flight;
  onRemove: (id: string) => void;
}) {
  const date = flight.departure_time
    ? new Date(flight.departure_time).toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    : "--";

  const cabinColors: Record<string, string> = {
    First: "bg-yellow-100 text-yellow-700",
    Business: "bg-blue-100 text-blue-700",
    Economy: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="group flex items-center justify-between border-b border-(--color-outline-variant)/40 py-3 last:border-none">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#007AFF]/10">
          <AppIcon name="flight" filled className="h-[18px] w-[18px] rotate-45 text-[#007AFF]" />
        </div>
        <div>
          <div className="text-[15px] font-bold text-foreground">
            {flight.origin_iata} → {flight.destination_iata}
          </div>
          <div className="text-[12px] text-(--color-on-surface-variant)">
            {flight.airline || "Unknown"} · {date}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${cabinColors[flight.cabin_class] ?? cabinColors.Economy}`}>
          {flight.cabin_class}
        </span>
        <button
          onClick={() => onRemove(flight.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-(--color-on-surface-variant)/40 transition-colors hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100"
          title="Remove flight"
        >
          <AppIcon name="delete" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllFlights, setShowAllFlights] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { markers, arcs } = useMemo(() => flightsToGlobeData(flights), [flights]);
  const globeKey = useMemo(
    () => flights.map((flight) => `${flight.id}:${flight.origin_iata}-${flight.destination_iata}`).join("|"),
    [flights]
  );
  const totalMiles = flights.reduce((sum, flight) => sum + (flight.distance_miles ?? 0), 0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const dismissed = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
        setShowOnboarding(!dismissed);
      } catch {
        setShowOnboarding(true);
      } finally {
        setIsReady(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleAddFlight = (flight: Partial<Flight>) => {
    const id = flight.id ?? (globalThis.crypto?.randomUUID?.() ?? `flight-${Date.now()}`);
    setFlights((prevFlights) => [{ ...flight, id } as Flight, ...prevFlights]);
  };

  const handleRemoveFlight = (flightId: string) => {
    setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId));
  };

  const recentFlights = [...flights]
    .sort((a, b) => new Date(b.departure_time ?? 0).getTime() - new Date(a.departure_time ?? 0).getTime())
    .slice(0, 5);

  const visibleFlights = showAllFlights
    ? [...flights].sort((a, b) => new Date(b.departure_time ?? 0).getTime() - new Date(a.departure_time ?? 0).getTime())
    : recentFlights;

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#061126] via-[#0c1730] to-[#050814] text-white">
        <div className="animate-fp-fade-up flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <AppIcon name="flight_takeoff" filled className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Flight Path</div>
            <div className="text-sm text-white/75">Preparing your journey</div>
          </div>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <FirstVisitOnboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showAddModal && (
        <AddFlightModal
          onAdd={handleAddFlight}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <TopBar />

      <main className="flex-1 pb-24 pt-16">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-(--color-primary-fixed)/20 via-transparent to-background/90" />

          <div className="relative flex items-center justify-center overflow-hidden px-0 pb-6 pt-6">
            <div className="mx-auto w-[92vw] max-w-[520px]">
              <Globe
                key={globeKey}
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

        <section className="bg-white px-5 py-5">
          <div className="grid grid-cols-3 gap-2">
            <TravelStatCard icon="flight_takeoff" label="Flights" value={String(flights.length)} sublabel="logged" />
            <TravelStatCard
              icon="route"
              label="Miles"
              value={totalMiles > 0 ? `${(totalMiles / 1000).toFixed(0)}k` : `${(MOCK_PROFILE.total_miles / 1000).toFixed(0)}k`}
              sublabel="total"
            />
            <TravelStatCard icon="public" label="Countries" value={String(MOCK_PROFILE.total_countries)} sublabel="visited" />
          </div>
        </section>

        <section className="mt-3 bg-white px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-headline-md text-foreground">Recent Flights</h3>
              <p className="mt-0.5 text-[13px] text-(--color-on-surface-variant)">
                {flights.length} flight{flights.length !== 1 ? "s" : ""} · updates the globe live
              </p>
            </div>
            <button
              onClick={() => setShowAllFlights((value) => !value)}
              className="text-[13px] font-semibold text-[#007AFF] hover:underline"
            >
              {showAllFlights ? "Hide" : "Show all"}
            </button>
          </div>

          <div>
            {visibleFlights.map((flight) => (
              <RecentFlightItem key={flight.id} flight={flight} onRemove={handleRemoveFlight} />
            ))}
          </div>

          {flights.length === 0 && (
            <div className="flex flex-col items-center py-10 text-center text-(--color-on-surface-variant)">
              <AppIcon name="flight_land" className="mb-3 h-12 w-12 opacity-30" />
              <p className="text-body-lg font-medium">No flights yet</p>
              <p className="mt-1 text-body-sm">Add your first flight to see it on the globe.</p>
            </div>
          )}
        </section>

        <section className="mt-3 border-y border-(--color-outline-variant) bg-white px-5 py-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-foreground">Air Miles XP</h3>
              <p className="text-[13px] text-(--color-on-surface-variant)">Level 4 Explorer</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-[#007AFF]">
                {MOCK_PROFILE.air_miles_xp.toLocaleString()}
              </span>
              <span className="text-[13px] text-(--color-on-surface-variant)"> XP</span>
            </div>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-(--color-surface-container)">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#007AFF] to-[#00C6FF] transition-all duration-700"
              style={{ width: `${((MOCK_PROFILE.air_miles_xp % 15000) / 15000) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[12px] text-(--color-on-surface-variant)">
            <span>Level 4</span>
            <span>{(15000 - (MOCK_PROFILE.air_miles_xp % 15000)).toLocaleString()} XP to Level 5</span>
          </div>
        </section>

        <section className="flex flex-col gap-3 px-4 py-5">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#007AFF] py-4 text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(0,122,255,0.35)] transition-colors hover:bg-[#0070eb] active:scale-[0.98]"
          >
            <AppIcon name="add_circle" filled className="h-5 w-5" />
            Add New Flight to Globe
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="/passport"
              className="flex items-center justify-center gap-2 rounded-2xl border border-(--color-outline-variant) bg-white py-3.5 text-[14px] font-semibold text-foreground transition-colors hover:bg-(--color-surface-container-low)"
            >
              <AppIcon name="book" filled className="h-5 w-5 text-[#FF9500]" />
              Passport
            </a>
            <a
              href="/trips"
              className="flex items-center justify-center gap-2 rounded-2xl border border-(--color-outline-variant) bg-white py-3.5 text-[14px] font-semibold text-foreground transition-colors hover:bg-(--color-surface-container-low)"
            >
              <AppIcon name="history" filled className="h-5 w-5 text-[#34C759]" />
              All Trips
            </a>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
