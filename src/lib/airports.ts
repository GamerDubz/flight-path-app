// ================================================================
// Flight Path — IATA airport code → [latitude, longitude] lookup
// ================================================================

export const AIRPORTS: Record<string, { lat: number; lng: number; city: string; country: string }> = {
  // North America
  JFK: { lat: 40.6413, lng: -73.7781, city: "New York", country: "US" },
  LAX: { lat: 33.9425, lng: -118.4081, city: "Los Angeles", country: "US" },
  SFO: { lat: 37.6213, lng: -122.379, city: "San Francisco", country: "US" },
  ORD: { lat: 41.9742, lng: -87.9073, city: "Chicago", country: "US" },
  ATL: { lat: 33.6407, lng: -84.4277, city: "Atlanta", country: "US" },
  MIA: { lat: 25.7959, lng: -80.287, city: "Miami", country: "US" },
  DFW: { lat: 32.8998, lng: -97.0403, city: "Dallas", country: "US" },
  DEN: { lat: 39.8561, lng: -104.6737, city: "Denver", country: "US" },
  SEA: { lat: 47.4502, lng: -122.3088, city: "Seattle", country: "US" },
  BOS: { lat: 42.3656, lng: -71.0096, city: "Boston", country: "US" },
  EWR: { lat: 40.6895, lng: -74.1745, city: "Newark", country: "US" },
  IAD: { lat: 38.9531, lng: -77.4565, city: "Washington DC", country: "US" },
  YYZ: { lat: 43.6777, lng: -79.6248, city: "Toronto", country: "CA" },
  YVR: { lat: 49.1947, lng: -123.1792, city: "Vancouver", country: "CA" },
  MEX: { lat: 19.4363, lng: -99.0721, city: "Mexico City", country: "MX" },
  CUN: { lat: 21.0365, lng: -86.877, city: "Cancún", country: "MX" },

  // Europe
  LHR: { lat: 51.47, lng: -0.4543, city: "London", country: "GB" },
  LGW: { lat: 51.1537, lng: -0.1821, city: "London Gatwick", country: "GB" },
  CDG: { lat: 49.0097, lng: 2.5479, city: "Paris", country: "FR" },
  AMS: { lat: 52.3105, lng: 4.7683, city: "Amsterdam", country: "NL" },
  FRA: { lat: 50.0379, lng: 8.5622, city: "Frankfurt", country: "DE" },
  MUC: { lat: 48.3537, lng: 11.775, city: "Munich", country: "DE" },
  MAD: { lat: 40.4983, lng: -3.5676, city: "Madrid", country: "ES" },
  BCN: { lat: 41.2974, lng: 2.0833, city: "Barcelona", country: "ES" },
  FCO: { lat: 41.8003, lng: 12.2389, city: "Rome", country: "IT" },
  IST: { lat: 41.2753, lng: 28.7519, city: "Istanbul", country: "TR" },
  ZRH: { lat: 47.4647, lng: 8.5492, city: "Zurich", country: "CH" },
  VIE: { lat: 48.1103, lng: 16.5697, city: "Vienna", country: "AT" },
  CPH: { lat: 55.618, lng: 12.656, city: "Copenhagen", country: "DK" },
  OSL: { lat: 60.1976, lng: 11.1004, city: "Oslo", country: "NO" },
  ARN: { lat: 59.6519, lng: 17.9186, city: "Stockholm", country: "SE" },
  HEL: { lat: 60.3172, lng: 24.9633, city: "Helsinki", country: "FI" },
  LIS: { lat: 38.7756, lng: -9.1354, city: "Lisbon", country: "PT" },
  DUB: { lat: 53.4264, lng: -6.2499, city: "Dublin", country: "IE" },
  ATH: { lat: 37.9364, lng: 23.9445, city: "Athens", country: "GR" },

  // Middle East
  DXB: { lat: 25.2528, lng: 55.3644, city: "Dubai", country: "AE" },
  AUH: { lat: 24.4539, lng: 54.6512, city: "Abu Dhabi", country: "AE" },
  DOH: { lat: 25.2609, lng: 51.6138, city: "Doha", country: "QA" },
  JED: { lat: 21.6796, lng: 39.1565, city: "Jeddah", country: "SA" },
  RUH: { lat: 24.9576, lng: 46.6988, city: "Riyadh", country: "SA" },
  TLV: { lat: 32.0055, lng: 34.8854, city: "Tel Aviv", country: "IL" },

  // Asia
  NRT: { lat: 35.7647, lng: 140.3864, city: "Tokyo Narita", country: "JP" },
  HND: { lat: 35.5533, lng: 139.7811, city: "Tokyo Haneda", country: "JP" },
  PEK: { lat: 40.0799, lng: 116.6031, city: "Beijing", country: "CN" },
  PVG: { lat: 31.1443, lng: 121.8083, city: "Shanghai", country: "CN" },
  HKG: { lat: 22.308, lng: 113.9185, city: "Hong Kong", country: "HK" },
  SIN: { lat: 1.3644, lng: 103.9915, city: "Singapore", country: "SG" },
  BKK: { lat: 13.69, lng: 100.7501, city: "Bangkok", country: "TH" },
  ICN: { lat: 37.4602, lng: 126.4407, city: "Seoul Incheon", country: "KR" },
  DEL: { lat: 28.5562, lng: 77.1, city: "New Delhi", country: "IN" },
  BOM: { lat: 19.0896, lng: 72.8656, city: "Mumbai", country: "IN" },
  KUL: { lat: 2.7456, lng: 101.7099, city: "Kuala Lumpur", country: "MY" },

  // Oceania
  SYD: { lat: -33.9461, lng: 151.1772, city: "Sydney", country: "AU" },
  MEL: { lat: -37.6733, lng: 144.8433, city: "Melbourne", country: "AU" },
  AKL: { lat: -37.0082, lng: 174.7917, city: "Auckland", country: "NZ" },

  // Africa
  JNB: { lat: -26.1392, lng: 28.246, city: "Johannesburg", country: "ZA" },
  CPT: { lat: -33.9715, lng: 18.6021, city: "Cape Town", country: "ZA" },
  CAI: { lat: 30.1219, lng: 31.4056, city: "Cairo", country: "EG" },
  NBO: { lat: -1.3192, lng: 36.9278, city: "Nairobi", country: "KE" },
  CMN: { lat: 33.3675, lng: -7.5898, city: "Casablanca", country: "MA" },

  // South America
  GRU: { lat: -23.4356, lng: -46.4731, city: "São Paulo", country: "BR" },
  GIG: { lat: -22.8099, lng: -43.2506, city: "Rio de Janeiro", country: "BR" },
  EZE: { lat: -34.8222, lng: -58.5358, city: "Buenos Aires", country: "AR" },
  SCL: { lat: -33.393, lng: -70.7858, city: "Santiago", country: "CL" },
  BOG: { lat: 4.7016, lng: -74.1469, city: "Bogotá", country: "CO" },
  LIM: { lat: -12.0219, lng: -77.1143, city: "Lima", country: "PE" },
};

/**
 * Get coordinates for an IATA airport code.
 * Returns [latitude, longitude] or null if unknown.
 */
export function getAirportCoords(iata: string): [number, number] | null {
  const airport = AIRPORTS[iata.toUpperCase()];
  if (!airport) return null;
  return [airport.lat, airport.lng];
}

/**
 * Get city name for an IATA code.
 */
export function getAirportCity(iata: string): string {
  return AIRPORTS[iata.toUpperCase()]?.city ?? iata;
}
