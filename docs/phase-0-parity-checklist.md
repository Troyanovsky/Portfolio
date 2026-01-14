# Phase 0 Parity Checklist

Purpose: Capture the current page inventory and interactive behaviors so Phase 1+ changes can be verified against known-good parity.

## Page Inventory
- `index.html`
- `OtherProjects.html`
- `PineCones.html`
- `LAUNCH.html`
- `InvisibleThreats.html`
- `Recharge.html`
- `LinguaSwap.html`
- `IDToolkit.html`
- `blog/blinking-for-eye-health.html`
- `blog/water-breaks-stay-hydrated.html`

## Shared Runtime Behaviors (All Pages)
- Navigation and footer are injected by `components/shared-components.js` into `#navigation-container` and `#footer-container`.
- Base path replacement via `{{BASE_PATH}}` works for root pages and nested `blog/*` pages.
- Mobile menu toggles from the navigation component (button toggles `aria-expanded`, icon swap, and `hidden` class).
- AOS animations initialize on page load.
- Canonical/meta tags and structured data (if present) remain unchanged.

## Per-Page Acceptance Criteria

### `index.html`
- Layout renders correctly across breakpoints.
- Scroll-to-view actions (buttons/links calling `scrollToView`) scroll to the intended sections.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `OtherProjects.html`
- Layout renders correctly across breakpoints.
- Modals open for: `scenario`, `whitewhale`, `vuejs`, `fragments`.
- Modal close behaviors work: close button, click on backdrop, and ESC key.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `PineCones.html`
- Layout renders correctly across breakpoints.
- Collapsible sections toggle open/closed with correct button text:
  - Project background
  - Preliminary research
  - MARS flow
  - Teacher flow
- Modals open/close correctly for the project videos and matrices (concept video, matrix, waste feature).
- Carousels work for preliminary research, MARS flow, and teacher flow:
  - Next/previous controls
  - Dot navigation (set slide)
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `LAUNCH.html`
- Layout renders correctly across breakpoints.
- Detail toggles work for:
  - Diagnostic details
  - Speed dating details
  - Paper details
- Diagnostic map selection updates the displayed image.
- Carousels work for student context, learning experiences, and Wizard of Oz:
  - Next/previous controls
  - Dot navigation (set slide)
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `InvisibleThreats.html`
- Layout renders correctly across breakpoints.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `Recharge.html`
- Layout renders correctly across breakpoints.
- FAQ accordion works with the first item open by default.
- Accordion open/close toggles the caret icon and answer visibility.
- Embedded feedback form loads.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `LinguaSwap.html`
- Layout renders correctly across breakpoints.
- FAQ accordion works with the first item open by default.
- Accordion open/close toggles the caret icon and answer visibility.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `IDToolkit.html`
- Layout renders correctly across breakpoints.
- Navigation and footer load correctly.
- AOS animations trigger as before.

### `blog/blinking-for-eye-health.html`
- Layout renders correctly across breakpoints.
- Navigation and footer load correctly from a nested path.
- AOS animations trigger as before.

### `blog/water-breaks-stay-hydrated.html`
- Layout renders correctly across breakpoints.
- Navigation and footer load correctly from a nested path.
- AOS animations trigger as before.
