# Flight Path Code Style

## Naming

- Keep `src/app/**/page.tsx` as a thin route wrapper.
- Put the real screen component in `src/components/screens/<feature>/<feature>-page.tsx`.
- Use route-specific component names instead of `HomePage` or generic `Page` names.
- Prefer descriptive nouns for UI sections: `TravelStatCard`, `RecentFlightItem`, `PassportStampGrid`.
- Use verbs for actions and handlers: `handleAddFlight`, `handleRemoveFlight`, `handleSlideToLog`.
- Use `*Page` only for route-level screens.
- Use `*Modal`, `*Sheet`, `*Bar`, `*Nav`, `*Card`, and `*Item` only when the component actually matches that role.

## File Layout

- Keep `src/app/*/page.tsx` thin when possible.
- Put reusable UI in `src/components/ui/`.
- Put screen-specific components in `src/components/screens/`.
- Keep helper functions close to the component that uses them.

## Layout Rules

- Each screen should have one clear primary action.
- Use full-width sections for app screens instead of nested dashboard cards when possible.
- Keep surface hierarchy calm: background, section, content, action.
- Prefer clear labels and utility copy over decorative copy.

## New Code Checklist

- Name the component for the route or feature.
- Name the file after the component.
- Avoid ambiguous names like `data`, `item`, `stuff`, or `thing`.
- Keep icon and button labels readable without context.
- Run `npm run lint` before pushing.
