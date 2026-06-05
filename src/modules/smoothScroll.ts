/**
 * Progressive-enhancement smooth scrolling for same-page anchor links.
 *
 * Honors `prefers-reduced-motion`, and moves keyboard focus to the target so
 * screen-reader and keyboard users land in the right place (native anchor
 * behaviour that JS scrolling otherwise breaks). Vertical offset for the fixed
 * header is handled in CSS via `scroll-padding-top`.
 */
export function initSmoothScroll(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      // Move focus for accessibility without adding a permanent tabindex.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), {
        once: true,
      });

      // Reflect the destination in the URL without a second jump.
      history.replaceState(null, '', hash);
    });
  });
}
