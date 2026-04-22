// ================================================================
// Flight Path — Convert flight logs to Globe markers & arcs
// ================================================================

import type { Flight, GlobeMarker, GlobeArc } from "./types";
import { getAirportCoords, getAirportCity } from "./airports";

interface GlobeData {
  markers: GlobeMarker[];
  arcs: GlobeArc[];
}

/**
 * Converts an array of Flight records into Globe-compatible markers and arcs.
 * - Deduplicates airports into unique markers
 * - Creates an arc for each flight route
 */
export function flightsToGlobeData(flights: Flight[]): GlobeData {
  const airportSet = new Map<string, GlobeMarker>();
  const arcSet = new Map<string, GlobeArc>();

  for (const flight of flights) {
    const originCoords = getAirportCoords(flight.origin_iata);
    const destCoords = getAirportCoords(flight.destination_iata);

    // Add origin marker
    if (originCoords && !airportSet.has(flight.origin_iata)) {
      airportSet.set(flight.origin_iata, {
        id: flight.origin_iata.toLowerCase(),
        location: originCoords,
        label: `${flight.origin_iata} · ${
          flight.origin_city ?? getAirportCity(flight.origin_iata)
        }`,
      });
    }

    // Add destination marker
    if (destCoords && !airportSet.has(flight.destination_iata)) {
      airportSet.set(flight.destination_iata, {
        id: flight.destination_iata.toLowerCase(),
        location: destCoords,
        label: `${flight.destination_iata} · ${
          flight.destination_city ?? getAirportCity(flight.destination_iata)
        }`,
      });
    }

    // Add arc (deduplicate by route)
    if (originCoords && destCoords) {
      const arcKey = `${flight.origin_iata}-${flight.destination_iata}`;
      if (!arcSet.has(arcKey)) {
        arcSet.set(arcKey, {
          id: arcKey.toLowerCase(),
          from: originCoords,
          to: destCoords,
          label: `${flight.origin_iata} → ${flight.destination_iata}`,
        });
      }
    }
  }

  return {
    markers: Array.from(airportSet.values()),
    arcs: Array.from(arcSet.values()),
  };
}
