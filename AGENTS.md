# Architecture rules

- Keep verified portfolio facts centralized in `src/lib/portfolio-data.ts` so homepage and case studies cannot drift.
- Keep the homepage as one authored scrolling narrative; retain dedicated `/web`, `/dogs`, `/bar`, and `/projects/$slug` routes for deep links and search.
- Use semantic design tokens from `src/styles.css`; each world changes contextual accents without creating a separate brand.
- Treat Liel Wainberg as the stable primary entity (`https://www.lielwainberg.com/#liel-wainberg`) in structured data.
- Interaction states, motion easing/durations and elevation come from the precision-layer tokens in src/styles.css; reuse them instead of ad-hoc transitions so controls share one rhythm.
- Shared scroll reveals use CSS transitions with an intersection visibility signal; keep content visible under reduced motion and use full transform strings for motion-driven portrait movement to avoid per-frame React renders.
- Filled contact links use the primary foreground role rather than contextual surface text; this preserves contrast when a discipline changes its surface palette.
- Navigation disclosures must restore focus to their trigger on Escape; phone discipline navigation stays in document flow to avoid obscuring content.
- 3D scenes (three/fiber/drei) live in src/components/three and mount only via LazyScene, client-side and near the viewport, so pages stay fast and SSR-safe; the full-page particle network and drifting lights are screen-blended overlays that never take pointer input.
