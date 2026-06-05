/**
 * Accessible mobile navigation menu.
 *
 * Manages `aria-expanded`, closes on Escape, on outside click, when a link is
 * activated, and when the viewport grows to the desktop breakpoint.
 */
export function initMobileMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-menu-button]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!button || !menu) return;

  const setOpen = (open: boolean): void => {
    menu.classList.toggle('hidden', !open);
    button.setAttribute('aria-expanded', String(open));
    const icon = button.querySelector('i');
    if (icon) {
      icon.className = open ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    }
  };

  const isOpen = (): boolean => !menu.classList.contains('hidden');

  button.addEventListener('click', () => setOpen(!isOpen()));

  // Close when a navigation link inside the menu is activated.
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close on Escape.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  // Close when clicking outside the menu/button.
  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (isOpen() && !menu.contains(target) && !button.contains(target)) {
      setOpen(false);
    }
  });

  // Reset when resizing up to desktop, where the menu is always visible.
  const desktop = window.matchMedia('(min-width: 768px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
