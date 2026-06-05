import type { Theme } from '../types';

const STORAGE_KEY = 'asurwave-theme';

/**
 * Decide the initial theme from a stored preference and the OS setting.
 * Pure and side-effect free so it can be unit-tested in isolation.
 *
 * The brand is dark-first: we only fall back to light when the user has
 * explicitly stored "light" or their system requests a light scheme.
 */
export function resolveInitialTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersLight ? 'light' : 'dark';
}

/** Reflect a theme onto the document root. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.dataset.theme = theme;
}

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function persist(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (e.g. private mode) — ignore */
  }
}

function syncToggleButton(button: HTMLElement, theme: Theme): void {
  const isLight = theme === 'light';
  button.setAttribute('aria-pressed', String(isLight));
  button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  const icon = button.querySelector('i');
  if (icon) {
    icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

/**
 * Wire up the theme toggle button and keep it in sync with OS changes.
 * The initial theme class is set by an inline script in <head> to avoid a
 * flash of the wrong theme; here we only handle interaction.
 */
export function initThemeToggle(): void {
  const button = document.querySelector<HTMLElement>('[data-theme-toggle]');
  const current = (document.documentElement.dataset.theme as Theme) ?? 'dark';

  if (button) {
    syncToggleButton(button, current);
    button.addEventListener('click', () => {
      const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      persist(next);
      syncToggleButton(button, next);
    });
  }

  // Follow the OS scheme while the user has not made an explicit choice.
  const media = window.matchMedia('(prefers-color-scheme: light)');
  media.addEventListener('change', (event) => {
    if (readStored()) return;
    const next: Theme = event.matches ? 'light' : 'dark';
    applyTheme(next);
    if (button) syncToggleButton(button, next);
  });
}
