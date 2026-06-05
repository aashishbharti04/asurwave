# Development Setup

## Prerequisites

- **Node.js 18 or newer** (`node --version`)
- **npm 9+** (ships with Node)
- A modern browser

## Getting started

```bash
git clone https://github.com/aashishbharti04/asurwave.git
cd asurwave
npm install
npm run dev
```

The dev server runs at **http://localhost:5173** with hot module replacement.

## Environment variables

Copy the example file and adjust as needed:

```bash
cp .env.example .env
```

Only variables prefixed with `VITE_` are exposed to the browser bundle. **Never
put secrets in `VITE_` variables** — they are embedded in the public build.

| Variable             | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `VITE_SITE_URL`      | Canonical site URL (SEO/meta).                  |
| `VITE_CONTACT_EMAIL` | Public contact email.                           |
| `BASE_PATH`          | Build-time deploy sub-path (e.g. `/asurwave/`). |

## Everyday commands

```bash
npm run dev          # Start dev server
npm run build        # Type-check + production build into dist/
npm run preview      # Serve the production build locally
npm run lint         # ESLint
npm run lint:fix     # ESLint with autofix
npm run format       # Prettier write
npm run typecheck    # TypeScript, no emit
npm test             # Unit tests (Vitest)
npm run test:watch   # Unit tests in watch mode
npm run check        # Everything CI runs, in order
```

> Run **`npm run check`** before pushing — it mirrors the CI pipeline exactly.

## Making changes

### Editing content

Page content is plain semantic HTML in `index.html`. Keep headings ordered,
add `alt` text to images, mark decorative icons `aria-hidden="true"`, and add
`rel="noopener noreferrer"` to any `target="_blank"` link.

### Styling

Use the semantic, theme-aware utilities so both themes keep working:

| Token utility  | Meaning            |
| -------------- | ------------------ |
| `bg-canvas`    | Page background    |
| `bg-surface`   | Card surface       |
| `bg-elevated`  | Elevated section   |
| `text-content` | Primary text       |
| `text-muted`   | Secondary text     |
| `text-subtle`  | Tertiary text      |
| `border-line`  | Borders / dividers |

Brand accents (`text-asur-red`, `text-asur-cyan`, `text-asur-purple`) are fixed
across themes. Reuse component classes (`.btn-primary`, `.creation-card`, …)
rather than repeating long utility chains.

### Adding behavior

1. Create `src/modules/myFeature.ts` exporting an `initMyFeature()` function.
2. Keep pure logic separate from DOM wiring so it can be unit-tested.
3. Import and call it from `src/main.ts`.
4. Add a test in `tests/`.

## Testing

Unit tests run on Vitest with a jsdom environment. Test pure functions directly
and DOM helpers against a simulated document:

```bash
npm test
```

## Troubleshooting

- **Styles missing in dev?** Ensure your classes appear in `tailwind.config.js`
  `content` globs (`index.html`, `src/**`).
- **Type errors on build?** Run `npm run typecheck` for the full report.
- **Wrong asset paths after deploy?** Set `BASE_PATH` correctly — see
  [DEPLOYMENT.md](DEPLOYMENT.md).
