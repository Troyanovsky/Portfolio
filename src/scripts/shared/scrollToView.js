/**
 * Smoothly scrolls to a DOM element by id.
 */
export function scrollToView(viewId) {
  const element = document.getElementById(viewId);
  if (!element) {
    return;
  }

  element.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
}
