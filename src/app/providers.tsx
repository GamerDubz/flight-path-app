"use client";

import { FlightProvider } from "@/lib/flight-store";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <FlightProvider>{children}</FlightProvider>;
}
