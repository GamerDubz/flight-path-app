"use client";

import { useState, useMemo } from "react";
import { TopBar } from "@/components/ui/top-bar";
import { BottomNav } from "@/components/ui/bottom-nav";
import { MOCK_FLIGHTS } from "@/lib/mock-data";
import type { Flight } from "@/lib/types";
import { AddFlightModal } from "@/components/ui/add-flight-modal";
import { AppIcon } from "@/components/ui/app-icon";

function formatDuration(minutes: number | null): string {
  if (!minutes) return "--";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const cabinColors: Record<string, string> = {
  First: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Business: "bg-blue-100 text-blue-700 border-blue-200",
  Economy: "bg-gray-100 text-gray-600 border-gray-200",
};

type FilterType = "All" | "Business" | "Economy" | "First";

export default function TripsPage() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [filter, setFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddFlight = (f: Partial<Flight>) => {
    setFlights(prev => [f as Flight, ...prev]);
  };

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setFlights(prev => prev.filter(f => f.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const sorted = useMemo(() =>
    [...flights]
      .sort((a, b) =>
        new Date(b.departure_time ?? 0).getTime() -
        new Date(a.departure_time ?? 0).getTime()
      )
      .filter(f => {
        if (filter !== "All" && f.cabin_class !== filter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            f.origin_iata.toLowerCase().includes(q) ||
            f.destination_iata.toLowerCase().includes(q) ||
            (f.airline ?? "").toLowerCase().includes(q) ||
            (f.flight_number ?? "").toLowerCase().includes(q)
          );
        }
        return true;
      }),
  [flights, filter, search]);

  const totalMiles = flights.reduce((s, f) => s + (f.distance_miles ?? 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {showAddModal && (
        <AddFlightModal
          onAdd={handleAddFlight}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <TopBar />
      <BottomNav />

      <main className="pt-[60px] pb-[80px]">
        {/* ── Page Header ── */}
        <div className="bg-white px-5 pt-6 pb-5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-headline-lg text-foreground">Travel History</h1>
              <div className="flex gap-4 mt-3 text-[13px] text-(--color-on-surface-variant)">
                <span><strong className="text-foreground">{flights.length}</strong> flights</span>
                <span>·</span>
                <span><strong className="text-foreground">{totalMiles.toLocaleString()}</strong> miles</span>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#007AFF] text-white rounded-full p-2.5 shadow-md flex items-center justify-center hover:bg-[#0070eb] transition-colors"
            >
              <AppIcon name="add" filled className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <AppIcon name="search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-outline)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by airport, airline…"
              className="w-full pl-10 pr-4 py-2.5 border border-(--color-outline-variant) rounded-xl bg-(--color-surface-container-low) text-[14px] text-foreground placeholder:text-(--color-outline) focus:outline-none focus:border-[#007AFF]"
            />
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-0.5">
            {(["All", "First", "Business", "Economy"] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-colors ${
                  filter === f
                    ? "bg-[#007AFF] text-white border-[#007AFF]"
                    : "bg-white text-(--color-on-surface-variant) border-(--color-outline-variant) hover:border-[#007AFF] hover:text-[#007AFF]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Flight List ── */}
        <div className="px-4 py-4 flex flex-col gap-3">
          {sorted.length === 0 && (
            <div className="py-16 flex flex-col items-center text-center text-(--color-on-surface-variant)">
              <AppIcon name="flight_land" className="mb-3 h-12 w-12 opacity-20" />
              <p className="font-medium text-[16px]">No flights match</p>
              <p className="text-[13px] mt-1">Try adjusting your search or filter.</p>
            </div>
          )}

          {sorted.map((flight) => (
            <div
              key={flight.id}
              className={`bg-white rounded-2xl border border-(--color-outline-variant) overflow-hidden transition-all duration-300 ${
                removingId === flight.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {/* Route header */}
              <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center">
                    <AppIcon name="flight" filled className="h-5 w-5 rotate-45 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[20px] tracking-tight text-foreground flex items-center gap-2">
                      {flight.origin_iata}
                      <span className="text-(--color-outline) font-normal text-[16px]">→</span>
                      {flight.destination_iata}
                    </div>
                    <div className="text-[12px] text-(--color-on-surface-variant)">
                      {formatDate(flight.departure_time)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${cabinColors[flight.cabin_class] ?? cabinColors.Economy}`}>
                    {flight.cabin_class}
                  </span>
                  <button
                    onClick={() => handleRemove(flight.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-(--color-outline) hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Remove flight"
                  >
                    <AppIcon name="delete" className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>

              {/* Divider line */}
              <div className="mx-4 h-px bg-linear-to-r from-transparent via-[#007AFF]/30 to-transparent" />

              {/* Details row */}
              <div className="px-4 py-3 flex justify-between text-[13px]">
                <div>
                  <div className="text-label-bold text-(--color-outline) mb-0.5">Airline</div>
                  <div className="font-semibold text-foreground">
                    {flight.airline ?? "—"}{flight.flight_number ? ` · ${flight.flight_number}` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-bold text-(--color-outline) mb-0.5">Duration</div>
                  <div className="font-semibold text-foreground">
                    {formatDuration(flight.duration_minutes)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-bold text-(--color-outline) mb-0.5">Distance</div>
                  <div className="font-semibold text-foreground">
                    {flight.distance_miles ? `${flight.distance_miles.toLocaleString()} mi` : "—"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
