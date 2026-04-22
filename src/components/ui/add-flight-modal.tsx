"use client";

import { useState, useRef, useEffect } from "react";
import type { Flight } from "@/lib/types";
import { getAirportCity, AIRPORTS } from "@/lib/airports";
import { AppIcon } from "@/components/ui/app-icon";

function AirportCombobox({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAirports = Object.entries(AIRPORTS).filter(([iata, data]) => {
    const q = value.toLowerCase();
    return (
      iata.toLowerCase().includes(q) ||
      data.city.toLowerCase().includes(q) ||
      data.country.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="text-label-bold text-(--color-outline) mb-1 block">{label}</label>
      <input
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full border border-(--color-outline-variant) rounded-xl px-3 py-2.5 text-body-lg font-bold text-foreground focus:outline-none focus:border-[#007AFF] bg-(--color-surface-container-low)"
      />
      {open && value.length >= 1 && filteredAirports.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto bg-white border border-(--color-outline-variant) rounded-xl shadow-lg">
          {filteredAirports.map(([iata, data]) => (
            <li
              key={iata}
              onClick={() => {
                onChange(iata);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-[#007AFF]/10 cursor-pointer text-body-sm text-foreground border-b border-(--color-outline-variant)/40 last:border-none"
            >
              <div className="font-bold text-[14px]">{iata}</div>
              <div className="text-[12px] text-(--color-on-surface-variant)">{data.city}, {data.country}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AddFlightModal({
  onAdd,
  onClose,
}: {
  onAdd: (f: Partial<Flight>) => void;
  onClose: () => void;
}) {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [airline, setAirline] = useState("");
  const [flightNum, setFlightNum] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [cabin, setCabin] = useState("Economy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const originIata = origin.toUpperCase().slice(0, 3);
    const destIata = dest.toUpperCase().slice(0, 3);
    if (!originIata || !destIata) return;

    onAdd({
      id: `user-${Date.now()}`,
      user_id: "mock-user-001",
      flight_number: flightNum || null,
      origin_iata: originIata,
      origin_city: getAirportCity(originIata) || null,
      destination_iata: destIata,
      destination_city: getAirportCity(destIata) || null,
      departure_time: date ? `${date}T09:00:00Z` : null,
      arrival_time: null,
      duration_minutes: null,
      distance_miles: null,
      cabin_class: cabin,
      seat: null,
      airline: airline || null,
      notes: null,
      created_at: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 pb-10 sm:pb-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md text-foreground">Add Flight</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-(--color-surface-container) text-(--color-on-surface-variant) hover:bg-(--color-surface-container-high) transition-colors"
          >
            <AppIcon name="close" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Route row */}
          <div className="grid grid-cols-2 gap-3">
            <AirportCombobox
              label="From"
              placeholder="LHR or London"
              value={origin}
              onChange={setOrigin}
            />
            <AirportCombobox
              label="To"
              placeholder="NRT or Tokyo"
              value={dest}
              onChange={setDest}
            />
          </div>

          {/* Airline & flight number */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-label-bold text-(--color-outline) mb-1 block">Airline</label>
              <input
                placeholder="British Airways"
                value={airline}
                onChange={e => setAirline(e.target.value)}
                className="w-full border border-(--color-outline-variant) rounded-xl px-3 py-2.5 text-body-sm text-foreground focus:outline-none focus:border-[#007AFF] bg-(--color-surface-container-low)"
              />
            </div>
            <div>
              <label className="text-label-bold text-(--color-outline) mb-1 block">Flight No.</label>
              <input
                placeholder="BA117"
                value={flightNum}
                onChange={e => setFlightNum(e.target.value.toUpperCase())}
                className="w-full border border-(--color-outline-variant) rounded-xl px-3 py-2.5 text-body-sm text-foreground focus:outline-none focus:border-[#007AFF] bg-(--color-surface-container-low)"
              />
            </div>
          </div>

          {/* Date & Cabin */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-label-bold text-(--color-outline) mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border border-(--color-outline-variant) rounded-xl px-3 py-2.5 text-body-sm text-foreground focus:outline-none focus:border-[#007AFF] bg-(--color-surface-container-low)"
              />
            </div>
            <div>
              <label className="text-label-bold text-(--color-outline) mb-1 block">Cabin</label>
              <select
                value={cabin}
                onChange={e => setCabin(e.target.value)}
                className="w-full border border-(--color-outline-variant) rounded-xl px-3 py-2.5 text-body-sm text-foreground focus:outline-none focus:border-[#007AFF] bg-(--color-surface-container-low)"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-[#007AFF] text-white rounded-xl py-3.5 font-semibold text-[16px] hover:bg-[#0070eb] transition-colors"
          >
            Add to History
          </button>
        </form>
      </div>
    </div>
  );
}
