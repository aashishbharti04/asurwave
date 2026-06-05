/**
 * Reveal elements as they scroll into view.
 *
 * Elements opt in with the `.reveal` class. They are only visually hidden when
 * `html.js` is present (set synchronously in <head>), so content remains
 * visible if scripting is unavailable. Falls back to revealing everything when
 * IntersectionObserver is unsupported.
 */
export function initScrollReveal(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (elements.length === 0) return;

  const reveal = (el: Element): void => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
}
