import './styles/main.css';

import { SITE } from './data/site';
import { initMobileMenu } from './modules/mobileMenu';
import { initScrollReveal } from './modules/scrollReveal';
import { initSmoothScroll } from './modules/smoothScroll';
import { initThemeToggle } from './modules/theme';
import { initVideoFacades } from './modules/videoFacade';

/** Render an always-current copyright year (or range) into the footer. */
function setCopyrightYear(): void {
  const el = document.querySelector<HTMLElement>('[data-year]');
  if (!el) return;
  const current = new Date().getFullYear();
  el.textContent = current > SITE.startYear ? `${SITE.startYear}–${current}` : `${SITE.startYear}`;
}

function init(): void {
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initVideoFacades();
  setCopyrightYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
