---
name: Aero Premium
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#414755'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#575d78'
  on-secondary: '#ffffff'
  secondary-container: '#d8defe'
  on-secondary-container: '#5b617d'
  tertiary: '#5a5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#737575'
  on-tertiary-container: '#fcfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#bfc5e4'
  on-secondary-fixed: '#141a32'
  on-secondary-fixed-variant: '#3f465f'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  metric-display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 20px
  gutter: 12px
  card-gap: 16px
  section-margin: 32px
---

## Brand & Style
The brand personality is sophisticated, weightless, and precise. It targets high-frequency travelers who value clarity and a frictionless experience. The visual language evokes the feeling of looking through a cockpit windshield at high altitudes: crystalline, panoramic, and serene.

The design style is a refined **Apple-Premium Aero-Glass**. It relies on deep optical transparency, heavy atmospheric blurs, and ultra-sharp linework. The interface should feel like a series of suspended lenses, where depth is communicated through light refraction rather than heavy shadows. High-gloss finishes and fluid transitions are essential to maintain the premium, high-tech travel aesthetic.

## Colors
This design system utilizes a high-clarity palette centered on **Pearl White (#F5F5F7)** for expansive backgrounds, providing a clean, non-reflective canvas. **Azure Blue (#007AFF)** serves as the primary interactive signal, used exclusively for actionable elements, progress indicators, and pathfinding. 

**Deep Midnight Blue (#0A1128)** provides high-contrast grounding for all typography, ensuring legibility against translucent backgrounds. For glass surfaces, use a semi-transparent white fill combined with a 0.5pt stroke to define edges without adding visual weight.

## Typography
The typographic system uses **Inter** to achieve a technical, systematic look. It leverages dynamic weights to create a clear hierarchy within dense flight data. 

**Extra-bold weights** are reserved for "Metrics"—gate numbers, flight times, and seat assignments—to ensure they are glanceable. Body text remains at a medium weight for optimal readability against glass textures. All tracking (letter-spacing) is tightened for headlines and opened slightly for small labels to maintain a premium, modern feel.

## Layout & Spacing
The layout follows a **fluid grid** model with generous safe areas to prevent "visual turbulence." A standard 20px horizontal margin is maintained across all screens. 

Spacing follows an 8px rhythmic scale. Elements are grouped into high-radius containers with 16px vertical gaps, while internal padding within glass cards is set to a consistent 20px to allow the "Aero" effect enough surface area to be perceptible.

## Elevation & Depth
Depth in this design system is achieved through **Glassmorphism** rather than traditional elevation scales. Layers are defined by their backdrop-blur intensity and opacity:

1.  **Level 0 (Base):** Solid Pearl White background.
2.  **Level 1 (Cards):** 25px backdrop blur, 70% opacity Pearl White fill, and a 0.5px white border at 50% opacity.
3.  **Level 2 (Overlays/Bottom Sheets):** 40px backdrop blur, slightly higher opacity, and a very subtle ambient shadow (10% opacity Midnight Blue) to separate the sheet from the main canvas.

All glass elements must include a "hairline" 0.5px border to define the shape against the light background.

## Shapes
The shape language is defined by extreme smoothness. Primary containers and flight cards utilize a **24px corner radius**, creating a soft, friendly silhouette. 

Interactive elements like buttons and chips follow a **pill-shaped (999px)** geometry, which contrasts against the larger card shapes. Bottom sheets should have 24px top-corner radii and a recessed "grabber" that is also pill-shaped.

## Components
- **Buttons:** All primary actions are Azure Blue, pill-shaped, and use white text. Secondary buttons use a glass background with Azure Blue text.
- **Cards:** Flight and destination cards must use the 24px radius and 25px backdrop blur. Content inside should be padded by 20px.
- **Chips:** Small, pill-shaped indicators used for flight status (e.g., "On Time"). Use light Azure Blue tints for positive states and light grey glass for neutral states.
- **Bottom Sheets:** These should slide up over the main content with a 40px blur, acting as the primary container for filters, seat selection, or flight details.
- **Input Fields:** Semi-transparent glass wells with a 0.5px border. The active state is indicated by the border color switching to solid Azure Blue.
- **Lists:** Items within lists are separated by thin 0.5px Midnight Blue lines at 10% opacity, never reaching the full width of the container.
- **Progress Indicators:** Use ultra-thin Azure Blue lines for flight paths and boarding status to maintain the "Aero" aesthetic.
