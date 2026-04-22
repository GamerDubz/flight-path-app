# Flight Path - Product Requirements Document (PRD)

## 1. App Overview & Core Loop
**Concept:** A travel journey tracker combining flight logging, gamified progression, and interactive 3D visualizations.
**Core Loop:**
1. User takes a flight.
2. User logs flight details (API or manual).
3. User earns "Air Miles" (XP) and materials.
4. User spends materials to unlock 3D landmarks on a globe and collects passport stamps.

## 2. Tech Stack Recommendations
*   **Frontend:** React Native (Expo) or Flutter.
*   **3D Rendering:** Three.js (react-three-fiber).
*   **Backend:** Supabase or Firebase.
*   **APIs:** AviationStack or FlightAware.

## 3. Design System & UI/UX Guidelines
*   **Visual Style:** "Apple-Premium Aero-Glass" (Native iOS feel, minimalist, depth, frosted glass).
*   **Color Palette:**
    *   **Background:** Pearl White (#F5F5F7).
    *   **Primary:** Azure Blue (#007AFF).
    *   **Typography:** Deep Midnight Blue (#0A1128).
*   **Glassmorphism:** Translucent panels, background blur (25px), 0.5px light-blue borders.
*   **Typography:** San Francisco (SF Pro) or Inter.
*   **Animations:** Fluid, spring-based (Apple HIG style).

## 4. Screen Breakdown
1.  **3D Globe Dashboard (Home):** 3D globe (upper 60%), frosted glass stats sheet (bottom 40%), "Log New Flight" button.
2.  **Flight Logger (Input):** Floating glass card (24px radius), Wallet-pass aesthetic, "Slide to Takeoff" toggle.
3.  **Virtual Passport (Profile):** Horizontal carousel of glass pages, stamp grid, material inventory, blueprint store.
4.  **Journey Timeline (Logbook):** Vertical list of glassmorphic cards, hero animation expansion for flight details.

## 5. Technical Considerations
*   Offline mode support.
*   Timezone handling (UTC vs. Local).
*   Performance optimization for 3D and blur effects.