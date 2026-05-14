/**
 * Wires the mobile navigation toggle button to show/hide the menu.
 */
export function initMobileMenu() {
  const menuButton = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    const nextExpanded = !isExpanded;

    menuButton.setAttribute('aria-expanded', String(nextExpanded));
    mobileMenu.classList.toggle('hidden', !nextExpanded);

    const openIcon = menuButton.querySelector('[data-mobile-menu-open-icon]');
    const closeIcon = menuButton.querySelector('[data-mobile-menu-close-icon]');
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden', nextExpanded);
      closeIcon.classList.toggle('hidden', !nextExpanded);
    }
  });
}
