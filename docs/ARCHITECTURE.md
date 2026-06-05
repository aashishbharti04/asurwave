# Architecture

AsurWave is a **static, single-page marketing site** built with a modern
front-end toolchain. It has no backend and no runtime framework — the shipped
output is plain HTML, CSS, and a tiny amount of JavaScript.

## Guiding principles

1. **Progressive enhancement.** All content is authored as semantic HTML in
   `index.html`, so it is fully indexable and usable without JavaScript.
   JavaScript only _enhances_ the experience.
2. **Theme-able by design.** Colors are semantic CSS-variable tokens, so a
   single class on `<html>` switches the entire site between light and dark.
3. **Performance by default.** No render-blocking framework, lazy third-party
   embeds, compiled & purged CSS, and content-hashed, cache-friendly assets.
4. **Accessibility is not optional.** Semantic landmarks, ARIA state, keyboard
   support, focus management, and reduced-motion support are first-class.

## High-level diagram

```
                ┌──────────────────────────────────────────────┐
                │                 index.html                    │
                │  semantic content + SEO meta + inline theme   │
                │  bootstrap (no-flash) + <script type=module>  │
                └───────────────┬───────────────┬──────────────┘
                                │               │
                  imports CSS   │               │  imports modules
                                ▼               ▼
                ┌───────────────────────┐  ┌─────────────────────────┐
                │  src/styles/main.css  │  │       src/main.ts       │
                │  Tailwind layers +    │  │  bootstraps all modules │
                │  semantic tokens +    │  └───────────┬─────────────┘
                │  component classes    │              │
                └───────────────────────┘              ▼
                                          ┌──────────────────────────┐
                                          │      src/modules/*        │
                                          │  theme · mobileMenu ·     │
                                          │  smoothScroll ·           │
                                          │  scrollReveal ·           │
                                          │  videoFacade              │
                                          └──────────────────────────┘
```

## Runtime modules (`src/modules/`)

Each module is small, single-purpose, side-effect-free at import time, and
exposes an `init*()` function called once from `src/main.ts`. Pure logic is
extracted from DOM wiring so it can be unit-tested.

| Module            | Responsibility                                                         |
| ----------------- | ---------------------------------------------------------------------- |
| `theme.ts`        | Resolve, apply, persist, and toggle the light/dark theme.              |
| `mobileMenu.ts`   | Accessible mobile nav: `aria-expanded`, Escape, outside-click, resize. |
| `smoothScroll.ts` | Smooth in-page scrolling with focus management and reduced-motion.     |
| `scrollReveal.ts` | Reveal `.reveal` elements on scroll via `IntersectionObserver`.        |
| `videoFacade.ts`  | Replace eager iframes with click-to-load YouTube facades.              |

## Theme system

The dark theme is the default and lives in `:root`; the `.light` class on
`<html>` overrides the tokens. Tokens are stored as space-separated RGB triplets
so Tailwind's opacity modifiers (`bg-canvas/80`) keep working.

```css
:root {
  --c-canvas: 5 5 5; /* dark */
}
.light {
  --c-canvas: 250 250 250; /* light */
}
```

```js
// tailwind.config.js
canvas: 'rgb(var(--c-canvas) / <alpha-value>)';
```

An inline script in `<head>` sets the theme class **before first paint** to
avoid a flash of the wrong theme (FOUC).

## Build pipeline

`npm run build` runs `tsc --noEmit` (type safety) then `vite build`, which:

- Compiles and **purges** Tailwind to only the classes used.
- Bundles, tree-shakes, and minifies TypeScript and CSS.
- Emits content-hashed assets into `dist/` and copies `public/` verbatim.

See [DEPLOYMENT.md](DEPLOYMENT.md) for how `dist/` is published.
