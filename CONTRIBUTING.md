# Contributing to AsurWave

First off, thank you for considering contributing! 🌊 This project is open source
and welcomes contributions for education, learning, and community improvement.

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of Contents

- [Ways to contribute](#ways-to-contribute)
- [Development setup](#development-setup)
- [Project scripts](#project-scripts)
- [Coding guidelines](#coding-guidelines)
- [Commit convention](#commit-convention)
- [Pull request process](#pull-request-process)

## Ways to contribute

- 🐛 **Report bugs** using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml).
- ✨ **Request features** using the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml).
- 📝 **Improve documentation** — typos, clarifications, and examples are all welcome.
- 💻 **Submit code** — fix a bug or build a feature (please open an issue first for larger changes).

## Development setup

You need **Node.js 18+** and npm.

```bash
# 1. Fork and clone the repository
git clone https://github.com/<your-username>/asurwave.git
cd asurwave

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev
```

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for a deeper guide.

## Project scripts

| Script              | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload                     |
| `npm run build`     | Type-check and build the production bundle to `dist`          |
| `npm run preview`   | Preview the production build locally                          |
| `npm run lint`      | Run ESLint                                                    |
| `npm run format`    | Format all files with Prettier                                |
| `npm run typecheck` | Run the TypeScript compiler (no emit)                         |
| `npm test`          | Run the unit tests once                                       |
| `npm run check`     | Run **everything** CI runs (format, lint, types, test, build) |

## Coding guidelines

- **TypeScript** for all scripts, in `strict` mode. Avoid `any`.
- **Tailwind CSS** for styling. Reuse the semantic tokens (`bg-canvas`,
  `text-content`, `border-line`, …) and the component classes in
  `src/styles/main.css` instead of hard-coding colors, so both themes keep
  working.
- **Progressive enhancement.** Page content lives in `index.html` and must be
  usable without JavaScript. JS only _enhances_ (theme toggle, menu, reveal,
  video facades).
- **Accessibility first.** Keep semantic HTML, ARIA attributes, keyboard support,
  visible focus, and `prefers-reduced-motion` handling intact.
- Run `npm run check` before opening a PR — CI runs the same checks.

## Commit convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add newsletter signup section
fix: correct mobile menu focus trap
docs: clarify deployment steps
chore: bump dependencies
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.

## Pull request process

1. Create a branch from `main`: `git checkout -b feat/my-feature`.
2. Make your changes and add tests where it makes sense.
3. Ensure `npm run check` passes and test both **light and dark** themes.
4. Push and open a PR using the template; link the related issue.
5. A maintainer will review. Once approved and CI is green, it will be merged.

Thanks again for helping make AsurWave better! 🙌
