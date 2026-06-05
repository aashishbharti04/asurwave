# Deployment

AsurWave builds to a fully static `dist/` folder, so it can be hosted anywhere
that serves static files. The repository ships with an automated **GitHub Pages**
workflow.

## Build output

```bash
npm run build      # → dist/
npm run preview    # preview dist/ locally
```

`dist/` contains `index.html`, content-hashed `assets/`, and everything from
`public/`. Upload it to any static host.

## The `BASE_PATH` variable

Assets are referenced relative to `BASE_PATH` (defaults to `/`):

| Hosting scenario                                      | `BASE_PATH`   |
| ----------------------------------------------------- | ------------- |
| Custom domain or user/organization page (root)        | `/` (default) |
| GitHub Pages **project** site (`user.github.io/repo`) | `/repo/`      |

```bash
BASE_PATH=/asurwave/ npm run build
```

## GitHub Pages (automated)

The included [`deploy.yml`](../.github/workflows/deploy.yml) builds and publishes
on every push to `main`.

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Build and deployment** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site is published at
   `https://<user>.github.io/<repo>/`.

`BASE_PATH` is set automatically from the repository name, so asset paths just
work.

## Vercel / Netlify / Cloudflare Pages

Use these build settings:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Install command  | `npm ci`        |

For a custom domain served at the root, leave `BASE_PATH` unset.

## Manual / any static host

```bash
npm ci
npm run build
# then copy the contents of dist/ to your web root
```

## Recommended security headers

This is a static site, but configure these headers at your host/CDN for defense
in depth:

```
Content-Security-Policy: default-src 'self';
  img-src 'self' https://images.unsplash.com data:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
  frame-src https://www.youtube-nocookie.com;
  script-src 'self' 'unsafe-inline';
  base-uri 'self';
  frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

> The inline theme bootstrap requires `'unsafe-inline'` for `script-src`. To use
> a strict CSP, replace it with a nonce/hash for that one inline script.
