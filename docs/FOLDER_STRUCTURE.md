# Folder Structure

```
asurwave/
├── .github/                     # GitHub config
│   ├── ISSUE_TEMPLATE/          # Bug report & feature request forms
│   ├── workflows/               # CI and GitHub Pages deploy workflows
│   ├── dependabot.yml           # Automated dependency updates
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                        # Project documentation
│   ├── screenshots/             # README screenshots
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── DEVELOPMENT.md
│   └── FOLDER_STRUCTURE.md
├── public/                      # Static assets copied verbatim to dist/
│   ├── favicon.svg
│   ├── og-image.svg             # Social share image
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── src/
│   ├── data/
│   │   └── site.ts              # Runtime site constants (single source of truth)
│   ├── modules/                 # Focused, testable behavior modules
│   │   ├── mobileMenu.ts
│   │   ├── scrollReveal.ts
│   │   ├── smoothScroll.ts
│   │   ├── theme.ts
│   │   └── videoFacade.ts
│   ├── styles/
│   │   └── main.css             # Tailwind layers, tokens, components, effects
│   ├── types/
│   │   └── index.ts             # Shared TypeScript types
│   ├── main.ts                  # App entry point — bootstraps modules
│   └── vite-env.d.ts            # Vite client type references
├── tests/                       # Vitest unit tests
│   ├── theme.test.ts
│   └── videoFacade.test.ts
├── index.html                   # App shell & semantic page content
├── .editorconfig                # Editor defaults
├── .env.example                 # Documented environment variables
├── .gitignore
├── .prettierignore
├── .prettierrc.json             # Prettier config (+ Tailwind class sorting)
├── eslint.config.js             # Flat ESLint config
├── postcss.config.js            # Tailwind + Autoprefixer
├── tailwind.config.js           # Theme tokens, fonts, animations
├── tsconfig.json                # Strict TypeScript config
├── vite.config.ts               # Build & test (Vitest) config
└── package.json
```

## Where things live

- **Add or edit page content** → `index.html` (keep it semantic and accessible).
- **Add interactive behavior** → a new module in `src/modules/`, wired up in
  `src/main.ts`.
- **Change colors / spacing / fonts** → tokens in `src/styles/main.css` and the
  theme in `tailwind.config.js`. Avoid hard-coded colors.
- **Add a reusable UI class** → the `@layer components` block in
  `src/styles/main.css`.
- **Add a static file** (image, icon) → `public/` (served from the site root).
- **Add a unit test** → `tests/*.test.ts`.
