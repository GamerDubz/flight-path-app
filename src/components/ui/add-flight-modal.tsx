"use client";

import { useState, useRef, useEffect } from "react";
import type { Flight } from "@/lib/types";
import { getAirportCity, AIRPORTS } from "@/lib/airports";
import { AppIcon } from "@/components/ui/app-icon";
import Image from "next/image";

function AirportCombobox({
  label,
  value,
  onChange,
  placeholder,
  align = "left",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  align?: "left" | "right";
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

  const filteredAirports = Object.entries(AIRPORTS)
    .filter(([iata, data]) => {
      const q = value.toLowerCase();
      return (
        iata.toLowerCase().includes(q) ||
        data.city?.toLowerCase().includes(q) ||
        data.country?.toLowerCase().includes(q) ||
        data.name?.toLowerCase().includes(q)
      );
    })
    .slice(0, 20);

  const airportData = value ? AIRPORTS[value] : null;

  return (
    <div className={`relative flex-1 flex flex-col justify-center ${align === 'right' ? 'pl-4' : 'pr-4'}`} ref={wrapperRef}>
      <label className="text-[11px] text-[#5b617d] mb-0.5">{label}</label>
      <div className="flex items-center justify-between w-full">
        <input
          required
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value.toUpperCase());
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="bg-transparent border-none p-0 focus:ring-0 text-[20px] font-medium text-[#0a1128] placeholder-[#a0a8ba] w-16"
          maxLength={3}
        />
        <AppIcon name="map_pin" className="w-4 h-4 text-[#a0a8ba]" />
      </div>
      <div className="text-[11px] text-[#5b617d] truncate mt-0.5">
         {airportData ? `${airportData.city}, ${airportData.country}` : "City, Country"}
      </div>
      {open && value.length >= 1 && filteredAirports.length > 0 && (
        <ul className={`absolute top-full z-50 w-64 mt-2 max-h-56 overflow-y-auto bg-white rounded-2xl shadow-xl border border-[#edf0f7] ${align === 'right' ? 'right-0 text-left' : 'left-0 text-left'}`}>
          {filteredAirports.map(([iata, data]) => (
            <li
              key={iata}
              onClick={() => {
                onChange(iata);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-[#f7f8fb] cursor-pointer border-b border-[#edf0f7] last:border-none"
            >
              <div className="font-medium text-sm text-[#0a1128] flex items-center justify-between">
                <span>{iata}</span>
                <span className="font-normal text-xs text-[#5b617d] truncate ml-2 text-right">{data.name}</span>
              </div>
              <div className="text-xs text-[#5b617d] mt-1">{data.city}, {data.country}</div>
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
  const [origin, setOrigin] = useState("SFO");
  const [dest, setDest] = useState("JFK");
  const [airline, setAirline] = useState("");
  const [flightNum, setFlightNum] = useState("");
  const [date, setDate] = useState("2025-05-24");
  const [returnDate, setReturnDate] = useState("2025-05-28");
  const [cabin] = useState("Economy");
  
  // Functional state
  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [passengers, setPassengers] = useState(1);
  const [flightAlerts, setFlightAlerts] = useState(true);

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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f2f5fd] overflow-hidden animate-in fade-in duration-200">
      
      {/* Background with Image and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          alt="Airplane Wing" 
          fill 
          className="object-cover object-top-right opacity-[0.85]" 
          src="https://images.unsplash.com/photo-1541447271487-09612b3e4e1e?q=80&w=1000&auto=format&fit=crop" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#f2f5fd]/60 via-[#f2f5fd]/90 to-[#f9fafc]"></div>
      </div>

      <div className="w-full h-full flex flex-col relative z-10 overflow-hidden">
        
        {/* Header */}
        <header className="w-full px-5 pt-12 sm:pt-10 pb-2 shrink-0 flex flex-col relative sm:max-w-[600px] sm:mx-auto">
          <button 
            type="button" 
            onClick={onClose} 
            className="absolute left-5 sm:left-5 top-12 sm:top-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0a1128] hover:opacity-80 active:scale-95 transition-all"
          >
            <AppIcon name="arrow_back" className="w-5 h-5" />
          </button>
          
          <div className="text-center mt-2">
            <h1 className="text-[22px] font-semibold text-[#0a1128]">Add Flight</h1>
            <p className="text-[13px] text-[#5b617d] mt-2 max-w-[240px] mx-auto leading-relaxed">
              Add your trip details to get real-time updates and alerts.
            </p>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-5 pb-6 pt-4 flex flex-col no-scrollbar">
          <form id="add-flight-form" onSubmit={handleSubmit} className="w-full lg:max-w-[900px] sm:max-w-[600px] mx-auto">
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/60 flex flex-col gap-5 lg:gap-6">
              
              {/* TOP ROW: Trip Type & Passengers */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[#edf0f7]">
                <div className="bg-[#f7f8fb] border border-[#edf0f7] rounded-xl p-1 flex w-full sm:w-auto">
                  <button 
                    type="button" 
                    onClick={() => setTripType("round")}
                    className={`flex-1 sm:flex-none py-2 px-6 rounded-lg text-[13px] font-medium transition-all ${tripType === "round" ? "bg-white shadow-sm border border-[#edf0f7] text-[#007AFF]" : "text-[#5b617d] hover:bg-white/50"}`}
                  >
                    Round Trip
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setTripType("one")}
                    className={`flex-1 sm:flex-none py-2 px-6 rounded-lg text-[13px] font-medium transition-all ${tripType === "one" ? "bg-white shadow-sm border border-[#edf0f7] text-[#007AFF]" : "text-[#5b617d] hover:bg-white/50"}`}
                  >
                    One Way
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto px-1">
                  <span className="text-[12px] font-medium text-[#5b617d] sm:hidden">Passengers</span>
                  <div className="flex items-center gap-3 bg-[#f7f8fb] border border-[#edf0f7] rounded-xl p-1">
                    <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-8 h-8 rounded-lg bg-white border border-[#edf0f7] flex items-center justify-center text-[#5b617d] shadow-sm hover:text-[#007AFF] transition-colors">
                      <AppIcon name="remove" className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5 px-2">
                       <AppIcon name="person" className="w-3.5 h-3.5 text-[#007AFF]" />
                       <span className="text-[14px] font-semibold text-[#0a1128] min-w-[1ch] text-center">{passengers}</span>
                    </div>
                    <button type="button" onClick={() => setPassengers(passengers + 1)} className="w-8 h-8 rounded-lg bg-white border border-[#edf0f7] flex items-center justify-center text-[#5b617d] shadow-sm hover:text-[#007AFF] transition-colors">
                      <AppIcon name="add" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* HORIZONTAL GRID FOR ROUTE & DATES */}
              <div className="flex flex-col lg:flex-row gap-3">
                
                {/* Route Fields */}
                <div className="bg-[#f7f8fb] border border-[#edf0f7] rounded-2xl p-2 flex-1 flex items-center justify-between relative min-h-[68px]">
                  <AirportCombobox label="From" value={origin} onChange={setOrigin} placeholder="SFO" align="left" />
                  <div className="w-px bg-[#edf0f7] h-10 absolute left-1/2 -translate-x-1/2"></div>
                  <button type="button" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-[#edf0f7] text-[#007AFF] shadow-sm z-10 hover:bg-[#f2f5fd] transition-colors" onClick={() => {
                      const temp = origin;
                      setOrigin(dest);
                      setDest(temp);
                  }}>
                    <AppIcon name="swap_horiz" className="w-4 h-4" />
                  </button>
                  <AirportCombobox label="To" value={dest} onChange={setDest} placeholder="JFK" align="right" />
                </div>

                {/* Dates */}
                <div className="bg-[#f7f8fb] border border-[#edf0f7] rounded-2xl flex-1 flex items-center min-h-[68px]">
                  <div className="flex-1 p-3 pl-4 relative">
                    <label className="text-[11px] text-[#5b617d] mb-0.5 block">Departure</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-transparent border-none p-0 text-[14px] font-medium focus:ring-0 text-[#0a1128] w-full" />
                  </div>
                  {tripType === "round" && (
                    <>
                      <div className="w-px bg-[#edf0f7] h-10"></div>
                      <div className="flex-1 p-3 pl-4 relative animate-in fade-in duration-200">
                        <label className="text-[11px] text-[#5b617d] mb-0.5 block">Return</label>
                        <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="bg-transparent border-none p-0 text-[14px] font-medium focus:ring-0 text-[#0a1128] w-full" />
                      </div>
                    </>
                  )}
                </div>

              </div>

              {/* SECOND ROW OF FIELDS */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Airline & Flight Number */}
                <div className="bg-[#f7f8fb] border border-[#edf0f7] rounded-2xl flex-[0.8] flex items-center min-h-[68px]">
                  <div className="flex-1 p-3 pl-4 flex flex-col">
                    <label className="text-[11px] text-[#5b617d] mb-0.5">Airline</label>
                    <input value={airline} onChange={e => setAirline(e.target.value)} placeholder="e.g. Delta" className="bg-transparent border-none p-0 text-[14px] font-medium text-[#0a1128] placeholder-[#a0a8ba] focus:ring-0 w-full" />
                  </div>
                  <div className="w-px bg-[#edf0f7] h-10"></div>
                  <div className="flex-1 p-3 pl-4 flex flex-col">
                    <label className="text-[11px] text-[#5b617d] mb-0.5">Flight No.</label>
                    <input value={flightNum} onChange={e => setFlightNum(e.target.value.toUpperCase())} className="bg-transparent border-none p-0 text-[14px] font-medium focus:ring-0 text-[#0a1128] placeholder-[#a0a8ba] w-full uppercase" placeholder="e.g., DL123" />
                  </div>
                </div>

                {/* Confirmation */}
                <div className="bg-[#f7f8fb] border border-[#edf0f7] rounded-2xl flex-[0.7] flex items-center min-h-[68px]">
                  <div className="flex-1 p-3 pl-4 flex flex-col">
                    <label className="text-[11px] text-[#5b617d] mb-0.5">Confirmation Code (Optional)</label>
                    <input className="bg-transparent border-none p-0 text-[14px] font-medium focus:ring-0 text-[#0a1128] placeholder-[#a0a8ba] w-full uppercase" placeholder="e.g., ABC123" />
                  </div>
                </div>
              </div>

              {/* FLIGHT ALERTS */}
              <div className="flex items-center justify-between mt-1 pt-4 border-t border-[#edf0f7]">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2f5fd] border border-[#e2e8f0] flex items-center justify-center text-[#007AFF]">
                    <AppIcon name="notifications" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#0a1128]">Flight Alerts</div>
                    <div className="text-[11px] text-[#5b617d] leading-snug">Get updates for delays, gate changes, and boarding.</div>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFlightAlerts(!flightAlerts)}
                  className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${flightAlerts ? "bg-[#007AFF]" : "bg-[#e2e8f0]"}`}
                >
                  <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${flightAlerts ? "right-1" : "left-1"}`}></span>
                </button>
              </div>

            </div>
          </form>
        </main>

        {/* Bottom Bar */}
        <div className="w-full bg-[#f2f5fd] md:bg-transparent md:bg-linear-to-t md:from-[#f2f5fd] md:via-[#f2f5fd]/95 md:to-[#f2f5fd]/0 shrink-0 pt-4 px-5 pb-8 sm:pb-12 flex justify-center relative z-40">
          <button form="add-flight-form" type="submit" className="w-full lg:max-w-[900px] sm:max-w-[600px] bg-[#007AFF] text-white font-medium text-[16px] py-4 rounded-[20px] shadow-[0_4px_14px_rgba(0,122,255,0.3)] hover:opacity-90 active:scale-[0.98] transition-all">
              Add Flight
          </button>
        </div>

      </div>
    </div>
  );
}
