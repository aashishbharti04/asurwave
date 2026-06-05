# Security Policy

## Supported versions

The latest released version on the `main` branch is actively supported with
security fixes.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you believe you have found a security vulnerability, report it privately:

- 📧 Email **aashish@marketdoctorsonline.com** with the details, or
- Use GitHub's [private vulnerability reporting](https://github.com/aashishbharti04/asurwave/security/advisories/new).

Please include:

- A description of the vulnerability and its impact.
- Steps to reproduce or a proof of concept.
- Any suggested remediation, if known.

You can expect an initial response within **72 hours**. We will keep you
informed of the progress toward a fix and full announcement, and may ask for
additional information or guidance.

## Security considerations for this project

AsurWave is a static, client-side site. It has no backend, database, or
authenticated user data. The most relevant security practices applied here are:

- **No secrets in the client.** Only `VITE_`-prefixed environment variables are
  exposed to the bundle, and none of them contain secrets. Never commit a real
  `.env` file (it is git-ignored).
- **Outbound links** use `rel="noopener noreferrer"` to prevent reverse
  tabnabbing.
- **Third-party embeds** use the privacy-friendly `youtube-nocookie.com` domain
  and are only loaded on explicit user interaction.
- **Dependencies** are kept up to date via Dependabot, and CI runs on every PR.

### Hardening recommendations for self-hosters

- Serve the site over HTTPS only.
- Add a Content-Security-Policy header at your host/CDN (a starting policy is
  documented in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)).
- Consider self-hosting fonts and icons to remove third-party CDN dependencies
  and enable Subresource Integrity.
