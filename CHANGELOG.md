# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-05

The first production-ready, open-source release. The original single-file
landing page was transformed into a maintainable, accessible, and performant
project while **preserving the exact visual design and all functionality**.

### Added

- ⚙️ **Build system**: Vite + TypeScript + compiled Tailwind CSS (replacing the
  in-browser Tailwind CDN), with code splitting, minification, and tree-shaking.
- 🌗 **Light & dark themes** via a semantic CSS-variable token system, a header
  toggle, OS-preference detection, persistence, and a no-flash inline loader.
- 🎬 **Click-to-load YouTube facades** — embeds now load only on interaction,
  removing three third-party iframes from the critical path.
- ♿ **Accessibility**: skip link, `aria-expanded`/`aria-controls` on the menu,
  keyboard support (Escape/outside-click), focus management on anchor scroll,
  visible focus styles, and `prefers-reduced-motion` support.
- 🔍 **SEO**: canonical URL, corrected Open Graph/Twitter tags, JSON-LD,
  `robots.txt`, `sitemap.xml`, web manifest, and an SVG favicon & OG image.
- 🧪 **Tooling**: ESLint, Prettier (with Tailwind class sorting), Vitest unit
  tests, EditorConfig, and a `check` script mirroring CI.
- 🤖 **GitHub Actions**: CI (lint, format, typecheck, multi-Node test, build)
  and automated GitHub Pages deployment; Dependabot; issue/PR templates.
- 📚 **Documentation**: README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, plus
  architecture, folder-structure, deployment, and development guides.
- 🦶 **Professional footer** with brand, navigation, contact email, social
  links, dynamic copyright year, and an open-source notice.

### Changed

- Refactored the monolithic 552-line HTML file into semantic HTML, modular
  TypeScript (`src/modules`), and a structured stylesheet.
- Replaced hard-coded colors with theme-aware semantic tokens.
- Scroll-reveal now hides content only when JS is active, so the page is fully
  readable without JavaScript.

### Fixed

- Removed placeholder/"Rick Roll" demo videos.
- Added `rel="noopener noreferrer"` to all external links (anti-tabnabbing).
- Replaced dead `#` footer links and inconsistent branding.
- Fixed broken Open Graph image and placeholder social URLs.

### Security

- No secrets are exposed to the client; `.env` is git-ignored with an
  `.env.example` template.
- Third-party video embeds use the privacy-friendly `youtube-nocookie.com`.

[1.0.0]: https://github.com/aashishbharti04/asurwave/releases/tag/v1.0.0
