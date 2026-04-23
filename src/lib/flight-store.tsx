"use client";

// ================================================================
// Flight Path — Shared flight state (React Context + localStorage)
//
// Every page that reads or mutates flights should use the
// `useFlights()` hook.  The underlying state is kept in
// localStorage so it survives page refreshes, and shared via
// React Context so every mounted component stays in sync.
// ================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Flight } from "./types";
import { MOCK_FLIGHTS } from "./mock-data";

const FLIGHTS_STORAGE_KEY = "flight-path-flights";

// --------------- helpers ------------------------------------------------

function readStoredFlights(): Flight[] {
  if (typeof window === "undefined") return MOCK_FLIGHTS;

  try {
    const raw = window.localStorage.getItem(FLIGHTS_STORAGE_KEY);
    if (!raw) return MOCK_FLIGHTS;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return MOCK_FLIGHTS;

    const valid = parsed.filter((f): f is Flight => {
      if (typeof f !== "object" || f === null) return false;
      const c = f as Partial<Flight>;
      return (
        typeof c.id === "string" &&
        typeof c.origin_iata === "string" &&
        typeof c.destination_iata === "string" &&
        typeof c.cabin_class === "string" &&
        typeof c.created_at === "string" &&
        typeof c.user_id === "string"
      );
    });

    return valid.length > 0 ? valid : MOCK_FLIGHTS;
  } catch {
    return MOCK_FLIGHTS;
  }
}

function persistFlights(flights: Flight[]): void {
  try {
    window.localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(flights));
  } catch {
    // storage quota exceeded – ignore silently
  }
}

// --------------- context ------------------------------------------------

interface FlightContextValue {
  flights: Flight[];
  addFlight: (flight: Partial<Flight>) => void;
  removeFlight: (id: string) => void;
}

const FlightContext = createContext<FlightContextValue | null>(null);

export function FlightProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);

  // Hydrate from localStorage after mount to avoid SSR hydration mismatches
  useEffect(() => {
    setFlights(readStoredFlights());
    setMounted(true);
  }, []);

  // Persist to localStorage whenever the list changes
  useEffect(() => {
    if (mounted) {
      persistFlights(flights);
    }
  }, [flights, mounted]);

  // Sync across tabs (StorageEvent fires in *other* tabs)
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === FLIGHTS_STORAGE_KEY) {
        setFlights(readStoredFlights());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addFlight = useCallback((partial: Partial<Flight>) => {
    const id =
      partial.id ??
      (globalThis.crypto?.randomUUID?.() ?? `flight-${Date.now()}`);
    setFlights((prev) => [{ ...partial, id } as Flight, ...prev]);
  }, []);

  const removeFlight = useCallback((id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const value = useMemo<FlightContextValue>(
    () => ({ flights, addFlight, removeFlight }),
    [flights, addFlight, removeFlight],
  );

  return (
    <FlightContext.Provider value={value}>{children}</FlightContext.Provider>
  );
}

export function useFlights(): FlightContextValue {
  const ctx = useContext(FlightContext);
  if (!ctx) {
    throw new Error("useFlights() must be used inside <FlightProvider>");
  }
  return ctx;
}
