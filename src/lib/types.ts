// ================================================================
// Flight Path — Core TypeScript types
// ================================================================

export interface Flight {
  id: string;
  user_id: string;
  flight_number: string | null;
  origin_iata: string;
  origin_city: string | null;
  destination_iata: string;
  destination_city: string | null;
  departure_time: string | null;
  arrival_time: string | null;
  duration_minutes: number | null;
  distance_miles: number | null;
  cabin_class: string;
  seat: string | null;
  airline: string | null;
  notes: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  total_miles: number;
  total_countries: number;
  air_miles_xp: number;
  created_at: string;
}

export interface Stamp {
  id: string;
  user_id: string;
  airport_iata: string;
  continent: string | null;
  earned_at: string;
  icon: string;
}

export interface Material {
  id: string;
  user_id: string;
  material_type: string;
  quantity: number;
}

export interface Landmark {
  id: string;
  name: string;
  icon: string;
  cost_xp: number;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
}

export interface UserLandmark {
  id: string;
  user_id: string;
  landmark_id: string;
  unlocked_at: string;
}

// Globe component data types
export interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}
