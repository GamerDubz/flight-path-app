"use client";

import { useMemo, useState } from "react";
import { AddFlightModal } from "@/components/ui/add-flight-modal";
import { AppIcon } from "@/components/ui/app-icon";
import { BottomNav } from "@/components/ui/bottom-nav";
import { TopBar } from "@/components/ui/top-bar";
import { MOCK_FLIGHTS } from "@/lib/mock-data";
import type { Flight } from "@/lib/types";

function formatDuration(minutes: number | null): string {
  if (!minutes) return "--";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function formatDate(dateValue: string | null): string {
  if (!dateValue) return "--";
  return new Date(dateValue).toLocaleDateString("en-US", {
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

type CabinFilter = "All" | "Business" | "Economy" | "First";

export default function TravelHistoryPage() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [filter, setFilter] = useState<CabinFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [removingFlightId, setRemovingFlightId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddFlight = (flight: Partial<Flight>) => {
    const id = flight.id ?? (globalThis.crypto?.randomUUID?.() ?? `flight-${Date.now()}`);
    setFlights((prevFlights) => [{ ...flight, id } as Flight, ...prevFlights]);
  };

  const handleRemoveFlight = (flightId: string) => {
    setRemovingFlightId(flightId);
    setTimeout(() => {
      setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId));
      setRemovingFlightId(null);
    }, 300);
  };

  const visibleFlights = useMemo(
    () =>
      [...flights]
        .sort((a, b) => new Date(b.departure_time ?? 0).getTime() - new Date(a.departure_time ?? 0).getTime())
        .filter((flight) => {
          if (filter !== "All" && flight.cabin_class !== filter) return false;

          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
              flight.origin_iata.toLowerCase().includes(query) ||
              flight.destination_iata.toLowerCase().includes(query) ||
              (flight.airline ?? "").toLowerCase().includes(query) ||
              (flight.flight_number ?? "").toLowerCase().includes(query)
            );
          }

          return true;
        }),
    [filter, flights, searchQuery]
  );

  const totalMiles = flights.reduce((sum, flight) => sum + (flight.distance_miles ?? 0), 0);

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

      <main className="pb-[80px] pt-[60px]">
        <div className="bg-white px-5 pb-5 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-headline-lg text-foreground">Travel History</h1>
              <div className="mt-3 flex gap-4 text-[13px] text-(--color-on-surface-variant)">
                <span>
                  <strong className="text-foreground">{flights.length}</strong> flights
                </span>
                <span>·</span>
                <span>
                  <strong className="text-foreground">{totalMiles.toLocaleString()}</strong> miles
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center rounded-full bg-[#007AFF] p-2.5 text-white shadow-md transition-colors hover:bg-[#0070eb]"
            >
              <AppIcon name="add" filled className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-4">
            <AppIcon name="search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-outline)" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by airport, airline..."
              className="w-full rounded-xl border border-(--color-outline-variant) bg-(--color-surface-container-low) py-2.5 pl-10 pr-4 text-[14px] text-foreground placeholder:text-(--color-outline) focus:border-[#007AFF] focus:outline-none"
            />
          </div>

          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-0.5">
            {(["All", "First", "Business", "Economy"] as CabinFilter[]).map((cabinFilter) => (
              <button
                key={cabinFilter}
                onClick={() => setFilter(cabinFilter)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
                  filter === cabinFilter
                    ? "border-[#007AFF] bg-[#007AFF] text-white"
                    : "border-(--color-outline-variant) bg-white text-(--color-on-surface-variant) hover:border-[#007AFF] hover:text-[#007AFF]"
                }`}
              >
                {cabinFilter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 py-4">
          {visibleFlights.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center text-(--color-on-surface-variant)">
              <AppIcon name="flight_land" className="mb-3 h-12 w-12 opacity-20" />
              <p className="text-[16px] font-medium">No flights match</p>
              <p className="mt-1 text-[13px]">Try adjusting your search or filter.</p>
            </div>
          )}

          {visibleFlights.map((flight) => (
            <div
              key={flight.id}
              className={`overflow-hidden rounded-2xl border border-(--color-outline-variant) bg-white transition-all duration-300 ${
                removingFlightId === flight.id ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <div className="flex items-center justify-between px-4 pb-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007AFF]">
                    <AppIcon name="flight" filled className="h-5 w-5 rotate-45 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[20px] font-extrabold tracking-tight text-foreground">
                      {flight.origin_iata}
                      <span className="text-[16px] font-normal text-(--color-outline)">→</span>
                      {flight.destination_iata}
                    </div>
                    <div className="text-[12px] text-(--color-on-surface-variant)">
                      {formatDate(flight.departure_time)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${cabinColors[flight.cabin_class] ?? cabinColors.Economy}`}>
                    {flight.cabin_class}
                  </span>
                  <button
                    onClick={() => handleRemoveFlight(flight.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-outline) transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Remove flight"
                  >
                    <AppIcon name="delete" className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>

              <div className="mx-4 h-px bg-linear-to-r from-transparent via-[#007AFF]/30 to-transparent" />

              <div className="flex justify-between px-4 py-3 text-[13px]">
                <div>
                  <div className="mb-0.5 text-label-bold text-(--color-outline)">Airline</div>
                  <div className="font-semibold text-foreground">
                    {flight.airline ?? "—"}
                    {flight.flight_number ? ` · ${flight.flight_number}` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-0.5 text-label-bold text-(--color-outline)">Duration</div>
                  <div className="font-semibold text-foreground">{formatDuration(flight.duration_minutes)}</div>
                </div>
                <div className="text-right">
                  <div className="mb-0.5 text-label-bold text-(--color-outline)">Distance</div>
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
