# Liel Wainberg: precision without identity drift

## Taste analysis
Reading this as a bilingual personal portfolio for prospective clients, with quiet dark refinement and technical precision, not a SaaS dashboard.

The existing identity and real photography remain the foundation. Adopt Stackbyte's craft ambition rather than its branding: controlled hierarchy, purposeful boundaries, efficient navigation and responsive feedback. Keep the homepage human; let the three disciplines change material and accent without becoming unrelated sites.

The current opening renders without horizontal overflow or page errors at 1280px and 628px. This is a baseline observation, not a complete accessibility or performance certification.

## Reference alignment and limits
- The original uploaded `lovable-design-master` archive has been located and extracted for reference reading: 186 files (about 7.28 MB), including 76 brand, 12 stack, 18 UX, 32 Impeccable, 16 Emil and 30 Taste files, plus its main guide and index.
- The active library separately contains 451 files (about 8.65 MB). It does not include an activated `lovable-design-master`; the uploaded pack is being studied as reference material, not silently installed as a skill.
- Core Taste, UX, motion, mobile, component and Impeccable craft guidance has been reviewed, with follow-up reads for initially truncated long files. The exhaustive-reading request is not yet complete: most master brand files, the native/other-stack compilation, and large catalogues remain unread or partially read. No permanent memorization is claimed.
- The active Impeccable pack is an amber/cream brand template. The uploaded master contains the actual broader Impeccable craft-floor, shape, audit and polish playbooks. Apply those mechanics without importing unrelated template palettes.
- Stackbyte's captured first frame shows restrained navigation, a dark cool canvas, cyan accents and a circular layered mark, but its main content was not visible in that capture. Do not claim exact measured typography, motion timings or a complete visual audit from it. The other benchmarks were researched through page text and secondary descriptions, not pixel-level inspection.
- Conflicting generic bans on purple, hairlines, serif or motion counts do not override established project requirements. Preserve identity and purposeful effects; judge every animation by frequency, purpose and usability.

## Planning Block
| Field | Direction |
| --- | --- |
| Brief | Refine precision, readability, interaction quality and consistency while preserving verified content. |
| Mode | Experience, with a clear contact outcome; preserve-and-polish, no new identity, pages, business claims or navigation structure. |
| Lane | Minimal/editorial-clean inside the existing public-facing portfolio, not an application dashboard or native mobile app. |
| Direction | Quiet instrument with human editorial photography. |
| Dials | DESIGN_VARIANCE 6/10, MOTION_INTENSITY 4/10, VISUAL_DENSITY 3/10. |
| Type | Preserve Heebo and IBM Plex Sans Hebrew; clarify display/body roles, readable 16px-or-larger body text, balanced headings, tabular figures where compared. Zero letter spacing. |
| Color | Warm-tinted near-black and burgundy personal identity; TarraCoata purple, Canine burgundy, LW.LIQUID copper/amber remain contextual. Distinguish accent fills from accessible accent text. |
| Layout | Preserve the authored narrative and dedicated phone compositions; stable media ratios, deliberate image focal points and content-led breakpoints. |
| Motion | Subtle press feedback, trigger-origin menus and selective once-only reveals; instant frequent/keyboard actions, no decorative motion quota. |

## Proposed implementation scope
1. Consolidate semantic surface, text, border, focus, spacing, radius, elevation and motion roles in the existing stylesheet; first establish whether documented precision tokens actually exist.
2. Apply shared controls consistently to navigation, inquiry selection, project filters/search and links without changing their destinations or copy.
3. Cover default, hover, focus-visible, active and disabled controls. Implement loading, error, empty and success states where a real operation or data boundary needs them; the master lists nine conditions despite the earlier eight-state shorthand. Do not invent fake waiting or success states for outbound links.
4. Retain purposeful hairlines despite the generic Taste pack's blanket ban. Preserve brand colours despite generic purple bans. Do not import unrelated theme-pack fonts or palettes.
5. Keep existing imagery and logos intact. Image-generation, native Swift/Expo, chart and prototype workflows are not deliverables for this alignment phase.

## Acceptance checks
- Text contrast at least 4.5:1; large text and essential control indicators at least 3:1. Check each contextual surface separately.
- 48px primary phone targets; visible, unobscured keyboard focus; accessible names and states; no colour-only meaning.
- Verify Hebrew/RTL and English/LTR, desktop, 375px, 430px, 628px and landscape, including 200% text scaling and long labels.
- Exercise real menu, filter/search, case-study and contact flows, including no-results and applicable failure paths.
- Check reduced-motion and pointer capability gating; content must remain readable without entrance motion.
- Measure performance rather than promising zero lag or CLS=0. Targets: CLS below 0.1, INP below 200ms and LCP below 2.5s.
- Preserve routes, case-study facts, metadata, favicons, inquiry destinations and the phone spread sequence.

## Technical details
- Keep React 19, TanStack Start and Tailwind v4. Tokens belong in `src/styles.css` with `@theme inline`; do not create legacy `tailwind.config.ts` or `src/index.css`.
- Keep existing component primitives and installed libraries; no dependency churn to imitate references.
- Reuse existing motion tokens when available. If absent, define one shared set: ease-out `cubic-bezier(0.23,1,0.32,1)`, ease-in-out `cubic-bezier(0.77,0,0.175,1)`, drawer `cubic-bezier(0.32,0.72,0,1)`; press 140ms, hover 180ms, menus 200ms, occasional overlays 250ms, purposeful reveals 500ms with 50ms stagger.
- Animate transform and opacity for UI; transitions for interruptible toggles, springs only where gestures justify them. Reduced motion drops travel and scale; fine-pointer hover is capability-gated.
- Source facts remain centralized in `src/lib/portfolio-data.ts`; no backend or business-rule changes.

No application code has been changed in this alignment phase. Implementation follows review of the plan.
