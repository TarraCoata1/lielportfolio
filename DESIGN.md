---
name: Liel Wainberg
description: One personal identity across software, canine behavior, and hospitality.
colors:
  burgundy: "#7a0e1f"
  burgundy-hover: "#a91432"
  burgundy-light: "#dc9aab"
  digital-glow: "oklch(0.8 0.1 290)"
  canine-accent: "oklch(0.42 0.13 20)"
  liquid-amber: "oklch(0.76 0.14 65)"
  liquid-copper: "oklch(0.6 0.13 45)"
  black: "oklch(0.145 0.006 20)"
  charcoal: "oklch(0.175 0.007 20)"
  surface: "oklch(0.205 0.008 20)"
  surface-2: "oklch(0.24 0.009 20)"
  white: "#fafafa"
  silver: "#c8c8c8"
  silver-dim: "oklch(0.68 0.005 20)"
  control-border: "oklch(0.55 0.008 20)"
typography:
  display:
    fontFamily: 'Heebo, IBM Plex Sans Hebrew, system-ui, sans-serif'
    fontSize: 'clamp(4rem, 10vw, 9.5rem)'
    fontWeight: 900
    lineHeight: 0.82
  headline:
    fontFamily: 'Heebo, IBM Plex Sans Hebrew, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 5.7vw, 5.6rem)'
    fontWeight: 900
    lineHeight: 1.02
  body-lede:
    fontFamily: 'Heebo, IBM Plex Sans Hebrew, system-ui, sans-serif'
    fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)'
    lineHeight: 1.75
  object-caption:
    fontFamily: 'Heebo, IBM Plex Sans Hebrew, system-ui, sans-serif'
    fontSize: '0.8rem'
rounded:
  control: '4px'
  panel: '8px'
spacing:
  control: '12px'
components:
  action-primary:
    backgroundColor: '{colors.burgundy}'
    textColor: '{colors.white}'
    padding: '0.8rem 1.15rem'
    rounded: '3px'
  action-quiet:
    textColor: '{colors.white}'
    padding: '0.8rem 1.15rem'
    rounded: '3px'
  search:
    backgroundColor: '{colors.black}'
    textColor: '{colors.white}'
    rounded: '{rounded.control}'
  filter-selected:
    backgroundColor: '{colors.burgundy}'
    textColor: '{colors.white}'
    rounded: '2px'
---

# Design System: Liel Wainberg

## Overview

**Creative North Star: "One person, three authored chapters"**

A dark, burgundy-led personal portfolio uses a large name, real photography, and authored objects to connect three equally important practices. Each practice has contextual materials and accents while keeping the same primary identity and interaction rhythm.

Photographs, model studies, and copy occupy separate space. Motion follows natural scrolling inside the object stage; it does not require visitors to wait before reading or navigating. This record describes the implementation, not an award claim or a performance certification.

**Key Characteristics:**
- Warm dark surfaces and burgundy identity.
- Hebrew and English layouts with shared typography roles.
- Separate photo, object, and reading areas.
- Reversible scroll motion with explicit pause and reduced-motion support.

## Colors

### Primary

Burgundy is the identity accent; its lighter companion supports small accents and focus. Filled primary links retain the primary foreground rather than inheriting a chapter's text color.

### Secondary

Digital lavender, canine clay, and hospitality amber/copper describe their respective subject matter. Use the contextual CSS roles instead of introducing independent brand palettes.

### Neutral

Warm near-black, charcoal, and two raised surfaces provide the background hierarchy. White supplies primary text; silver supplies secondary text. The later precision-layer silver-dim definition is authoritative over the earlier legacy hex declaration.

**The Shared Identity Rule.** Contextual chapter accents never replace Liel's primary identity.

## Typography

Heebo with IBM Plex Sans Hebrew fallback supplies display and body text. Share Tech Mono with Hebrew and monospace fallbacks supplies technical labels and model counters. Frank Ruhl Libre with Heebo and serif fallbacks supplies the canine chapter's softer headings.

The frontmatter captures the desktop hero and common section ramp. At phone widths the hero uses `clamp(4rem, 20vw, 6.7rem)`. Chapter headings use their own responsive scale; digital headings are mono, canine headings are medium serif, and hospitality headings are light and spaced. Body introductions cap their measure at 46rem.

## Layout

The shared section container is `min(100% - 2rem, 82rem)`. The homepage remains one narrative with dedicated practice and project routes. At 960px and above, chapters use complementary 1.1fr/1fr columns with sticky copy at 7rem; alternating chapters reverse the visual side. Below 960px, copy, photography, and object studies flow vertically. Phone discipline navigation remains in document flow.

Photographs in the chapter visual column use a 5:4 aspect ratio with a 62svh height cap. Object canvases use `clamp(240px, 30vw, 390px)` on desktop and 280px below 960px. Their captions and controls stay outside the canvas.

**The Separate Stage Rule.** Keep 3D motion inside its allocated stage, clear of photographs, text, and controls.

## Elevation & Depth

Depth comes primarily from stepped dark surfaces, photography, and lit models. Panels use the precision-layer panel shadow; focus uses its dedicated glow. Chapter materials retain subtle inset highlights and soft shadows. Screen-blended lights and particles ignore pointer input; the particle mask reduces activity across central reading areas.

## Shapes

Controls and panels use the precision radii in the frontmatter. Chapter photographs and object stages use restrained edges; canine and hospitality action shapes may remain rounded. Do not infer a site-wide ban on circles from the removal of ornamental 3D rings.

## Components

### Actions

Primary actions use burgundy with white foreground; quiet actions use a border and dark hover surface. Shared actions have a 48px minimum height, press feedback, and visible keyboard focus. Use existing duration and easing tokens for state changes.

### Search and filters

Search uses the control border, control radius, 48px input height, and an outer focus outline. Selected filters use burgundy with white text. Phone filters wrap rather than requiring horizontal scrolling.

### Navigation

The main navigation uses a translucent dark surface, text links, and active underline. Reduced transparency makes supported navigation surfaces opaque. Disclosure behavior restores focus to its trigger on Escape.

### Authored object stage

A caption and numbered position identify the model. The segmented object chooser uses 44px targets, pressed states, and keyboard focus; manual choice exposes a return-to-scroll action. All 17 user models are distributed across the three practices and loaded on demand through LazyScene. No ornamental rings or substitute procedural models belong in this stage.

The renderer uses demand frames while visible, damped deterministic scroll transforms, and a static pose when motion is paused. The global motion control also governs background atmosphere and reveals. Reduced motion preserves readable content. A photographic fallback occupies the stage during initial loading or failure; it is not a substitute portfolio work.

## Do's and Don'ts

### Do:
- **Do** reuse contextual color roles and precision motion tokens.
- **Do** preserve separate reading and object regions at every viewport.
- **Do** retain Hebrew, English, keyboard, and reduced-motion paths.
- **Do** keep verified facts in the shared portfolio data source.

### Don't:
- **Don't** add ornamental 3D rings or unrelated procedural models.
- **Don't** preload all 17 models or require 3D before content is usable.
- **Don't** treat desktop screenshots as proof of runtime performance on all devices.

Existing legacy eyebrow styles and section labels are not canonized as a reusable design pattern. This document does not expand their use or repair unrelated legacy styling.
