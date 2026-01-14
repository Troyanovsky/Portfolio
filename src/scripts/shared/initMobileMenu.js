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
    menuButton.setAttribute('aria-expanded', String(!isExpanded));

    if (isExpanded) {
      mobileMenu.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
    }

    const barsIcon = menuButton.querySelector('.fa-bars');
    const timesIcon = menuButton.querySelector('.fa-times');
    if (barsIcon && timesIcon) {
      barsIcon.classList.toggle('hidden');
      timesIcon.classList.toggle('hidden');
    }
  });
}
