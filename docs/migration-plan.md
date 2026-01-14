# Migration Plan: CDN-Based Static Site → Local, Deterministic Build

## Purpose
This document proposes a migration plan to move this portfolio from a CDN-driven static site (Tailwind/Vue/AOS/Font Awesome/Google Fonts loaded at runtime) to a modern, fully local build pipeline that is deterministic, reproducible, and still deployable to GitHub Pages.

## Goals
- Eliminate reliance on CDN-hosted frontend dependencies (CSS/JS/fonts/icons frameworks and libraries).
- Introduce a clean, deterministic local build (lockfile + pinned toolchain).
- Preserve existing routes, page structure, and behavior (multi-page `.html` site).
- Keep GitHub Pages deployment straightforward (including custom domain support via `CNAME`).

## Non-goals
- Redesigning the site or changing content.
- Converting the site into a backend app (assumed frontend-only).
- Rewriting all interactive behavior; prioritize parity first, then refactor iteratively.

---

## Decisions (Locked for This Migration)
The plan below assumes the following choices and is written to minimize disruption while meeting the “no CDN frontend dependencies” requirement.

- Deployment: primary target is the custom domain at root (`/`), but keep the build `base` configurable so the same output can be deployed under `/<repo>/` if needed later.
- Vue: keep in-DOM templates initially by using Vue’s runtime-compiler build for parity; then migrate page-by-page to runtime-only Vue as a later optimization.
- Page composition: keep plain multi-page HTML and replace nav/footer runtime injection with build-time HTML includes; consider Astro later only if further layout consolidation is desired.
- Fonts/icons: use `@fontsource/raleway` + `@fontsource/poppins` (self-hosted via npm) and keep Font Awesome installed locally.
- Language/tooling: JavaScript-only initially; add ESLint + Prettier after per-page scripts are extracted (quality gates in Phase 5).
- Analytics: keep Google Analytics as-is (explicitly accepted as an external runtime script outside “frontend dependency” scope).

---

## Current-State Analysis (Repository Snapshot)

### Page inventory (multi-page static HTML)
Top-level HTML pages:
- `index.html`, `OtherProjects.html`, `PineCones.html`, `LAUNCH.html`, `InvisibleThreats.html`, `Recharge.html`, `LinguaSwap.html`, `IDToolkit.html`

Blog pages:
- `blog/blinking-for-eye-health.html`, `blog/water-breaks-stay-hydrated.html`

Shared UI partials:
- `components/navigation.html`, `components/footer.html`
- `components/shared-components.js` injects navigation/footer via `fetch()` with a `{{BASE_PATH}}` placeholder to support nested paths (e.g., `blog/`).

### Runtime dependency model today (CDNs + in-browser compilation)
Across pages, the current pattern is:
- Tailwind via `@tailwindcss/browser` (compiled in the browser at runtime).
- Vue 3 via `vue.global.min.js` (global `Vue`, includes runtime template compiler).
- AOS via `unpkg` (global `AOS`).
- Font Awesome via `cdnjs` CSS.
- Google Fonts via `fonts.googleapis.com` (remote fonts).
- Google Analytics via `googletagmanager.com` (external script).

Interactive behaviors are embedded per-page using inline Vue apps (`createApp({ ... }).mount('#app')`), Options API, and in-DOM directives (e.g., `v-if`, `@click`), plus `AOS.init(...)` in `mounted()`.

### Key maintainability/reproducibility issues driving the migration
- **Non-determinism**: runtime CDN versions can change or be blocked; builds are not reproducible.
- **Runtime Tailwind compilation**: slower page load + opaque production output; hard to audit “what CSS shipped”.
- **Duplicated page scaffolding**: repeated `<head>` CSS and scripts across pages; theme color changes are copy/pasted.
- **Harder dependency management**: no lockfile, no pinned Node/toolchain, no CI verification.

---

## Recommended Target Architecture (Primary Proposal)

### Summary
Adopt a modern frontend toolchain that still supports a multi-page static site:
- **Bundler/dev server**: Vite (multi-page build).
- **Dependency management**: npm (or pnpm) with lockfile; use `npm ci` in CI for determinism.
- **CSS**: Tailwind CSS (local) + PostCSS + Autoprefixer, compiled at build time.
- **JS**: Local ESM bundles; keep Vue 3 for existing interactions initially.
- **Animations**: AOS from npm, imported per page (or centrally).
- **Icons**: Font Awesome installed locally (or migrate to inline SVG later).
- **Fonts**: self-hosted fonts via `@fontsource/*` packages or locally vendored font files (no Google Fonts CDN).
- **Deployment**: GitHub Actions → `dist/` → GitHub Pages (supports custom domains by copying `CNAME` into output).

### Why Vite for this project
Vite is a good fit because it:
- Builds and deploys static assets cleanly, works well with GitHub Pages.
- Supports **multi-page applications** (multiple `.html` entry points) without forcing a SPA rewrite.
- Produces deterministic outputs when paired with a lockfile and pinned toolchain.
- Makes it easy to incrementally migrate (minimal “big bang” rewrites).

### Critical Vue detail: runtime template compiler vs runtime-only build
Today, pages rely on **in-DOM templates** (Vue directives inside HTML). In a bundler setup:
- **Default** Vue bundler builds are runtime-only and will not compile templates in HTML at runtime.
- To preserve current behavior with minimal rewriting, the build must either:
  - **Option A (recommended for migration parity)**: configure bundler aliasing to use Vue’s build with the runtime compiler (heavier bundle, minimal code churn), or
  - **Option B (long-term)**: migrate each page’s Vue usage to build-compiled templates (Vue SFCs or precompiled templates), allowing runtime-only Vue and smaller bundles.

This choice should be made explicitly in the migration phases.

---

## Tooling Plan (Build Process and Commands)

### Toolchain
- Node.js LTS (recommend pinning via `.nvmrc` or `.tool-versions`).
- Package manager: `npm` (simplest for contributors + GitHub Actions), with `package-lock.json`.

### Proposed scripts (conceptual)
- `npm run dev`: start Vite dev server.
- `npm run build`: production build to `dist/`.
- `npm run preview`: serve `dist/` locally for validation.
- Optional:
  - `npm run lint`: JS linting (ESLint).
  - `npm run format`: formatting (Prettier).

### Build output expectations
- `dist/` should contain:
  - All final `.html` pages (same names/paths as today, including `blog/*.html`).
  - One or more compiled CSS files (Tailwind output).
  - One or more bundled JS entrypoints (per-page or shared chunks).
  - Static assets copied verbatim (images/videos/PDFs/etc).
  - `CNAME` and `.nojekyll` copied through for GitHub Pages.

---

## GitHub Pages Deployment Plan

### Recommended deployment approach
Use GitHub Actions to:
1. Install dependencies with `npm ci`.
2. Build the site (`npm run build`).
3. Upload `dist/` as a Pages artifact and deploy.

### GitHub Pages settings
After migrating to the Vite build:
- Go to **Settings -> Pages** and set **Source** to **GitHub Actions**.
- This replaces the previous "Deploy from a branch (root)" mode because the site is now built to `dist/`.
- No other Pages changes are required for a custom domain (keep `public/CNAME` and `public/.nojekyll`).

### Base path handling (custom domain vs project pages)
GitHub Pages can serve either:
- Custom domain at root (current repo includes `CNAME`), or
- Project pages at `/<repo-name>/`.

To keep this flexible and avoid broken asset paths:
- Configure Vite `base` via environment:
  - `base: '/'` for custom domain.
  - `base: '/Portfolio/'` (example) for project pages.
- Keep internal links relative whenever practical.

---

## Proposed Updated Folder Structure

This structure keeps the site multi-page and minimizes path churn while enabling a build step.

```
.
├─ public/                         # Static files copied as-is to dist/
│  ├─ CNAME
│  ├─ .nojekyll
│  ├─ images/
│  ├─ PineCones/  LAUNCH/  AirInPgh/  OtherProjects/ ...
│  └─ blog/                         # Optional: if blog assets exist
├─ src/
│  ├─ pages/
│  │  ├─ index.html
│  │  ├─ OtherProjects.html
│  │  ├─ PineCones.html
│  │  ├─ LAUNCH.html
│  │  ├─ InvisibleThreats.html
│  │  ├─ Recharge.html
│  │  ├─ LinguaSwap.html
│  │  ├─ IDToolkit.html
│  │  └─ blog/
│  │     ├─ blinking-for-eye-health.html
│  │     └─ water-breaks-stay-hydrated.html
│  ├─ styles/
│  │  └─ main.css                   # Tailwind entrypoint + shared site styles
│  ├─ scripts/
│  │  ├─ shared/                    # shared utilities (AOS init, scroll helpers, etc.)
│  │  └─ pages/                     # per-page entrypoints replacing inline scripts
│  └─ partials/                     # navigation/footer source (see below)
├─ docs/
├─ package.json
├─ package-lock.json
├─ tailwind.config.*
├─ postcss.config.*
└─ vite.config.*
```

### Rationale for major moves
- `public/`: preserves existing asset paths so pages can keep referencing `images/...`, `PineCones/...`, etc., reducing migration risk.
- `src/pages/`: clarifies what is authored source vs built output; enables a true “source → build” flow.
- `src/styles/main.css`: centralizes Tailwind entry + shared styles currently duplicated per page.
- `src/scripts/pages/*`: removes inline scripts from HTML and enables linting/testing/maintenance.
- `src/partials/`: provides a place to migrate `components/navigation.html` + `components/footer.html` into **build-time** includes (see phases).

---

## Migration Phases (Task Boundaries and Exit Criteria)

### Phase 0 — Baseline and acceptance criteria
**Goal**: lock in what “parity” means before tooling changes.
- Inventory all pages and interactive behaviors (menus, modals, carousels, collapsibles, AOS animations).
- Define acceptance criteria for each page:
  - Layout renders correctly.
  - Navigation and footer load on root pages and nested blog pages.
  - Vue-driven interactions behave as before.
  - AOS animations initialize.
  - Canonical/meta tags remain correct.

Exit criteria:
- A written parity checklist exists for each page.
Done:
- Checklist at docs\phase-0-parity-checklist.md

### Phase 1 — Introduce local toolchain without changing runtime behavior yet
**Goal**: create a deterministic build that still outputs the same pages.
- Add `package.json` + lockfile and pin Node version.
- Add Vite config for multi-page builds (`build.rollupOptions.input` listing all HTML entries).
- Add GitHub Actions workflow for Pages build + deploy.
- Add `public/` and copy through `CNAME`/`.nojekyll` and assets.

Exit criteria:
- `npm run build` generates `dist/` containing all pages and assets.
- GitHub Pages deployment works from `dist/` (still using existing CDNs is acceptable in this phase).

### Phase 2 — Remove CDN dependencies (core requirement)
**Goal**: eliminate CDN reliance while preserving functionality.
- Tailwind:
  - Install Tailwind locally and compile `src/styles/main.css` to output CSS.
  - Replace `@tailwindcss/browser` with built CSS link(s).
  - Ensure Tailwind content scanning includes `src/pages/**/*.html` and partials.
- Vue:
  - Install Vue locally.
  - Use Vue’s runtime-compiler build to preserve current in-DOM templates with minimal changes.
- AOS:
  - Install AOS locally and import its CSS/JS via modules.
- Font Awesome:
  - Install locally (or vendor) and include CSS.
- Fonts:
  - Self-host fonts via `@fontsource/raleway` and `@fontsource/poppins`.
  - Remove `fonts.googleapis.com` usage.

Exit criteria:
- No pages load Tailwind/Vue/AOS/Font Awesome/fonts from CDNs.
- All pages pass Phase 0 parity checklist.

### Phase 3 — Extract per-page inline scripts into modules
**Goal**: improve maintainability without changing visible behavior.
- Move each page’s inline Vue app code into `src/scripts/pages/<page>.ts|js`.
- Introduce shared utilities:
  - `initAos()` (single place to configure AOS defaults).
  - `scrollToView()` helper.
  - Shared modal/carousel helpers where appropriate.

Exit criteria:
- No inline JS blocks remain except structured data (`application/ld+json`) and minimal bootstrapping.
- Linting can be enabled without excessive exceptions.

### Phase 4 — Replace runtime component injection with build-time composition
**Goal**: eliminate runtime `fetch()` for nav/footer and reduce duplicated `<head>` scaffolding.
Approach:
- Use a Vite-compatible HTML include mechanism (e.g., PostHTML includes) to inject navigation/footer at build time.
- Defer any static site generator adoption (Astro/Eleventy) unless additional layout consolidation is desired after parity is achieved.

Tasks:
- Convert `components/navigation.html` and `components/footer.html` into build-time partials.
- Remove `components/shared-components.js` and any `{{BASE_PATH}}` replacement logic.
- Centralize repeated theme/typography CSS into shared CSS (use CSS variables or Tailwind theme tokens).

Exit criteria:
- Navigation/footer are present in built HTML without client-side fetching.
- Minimal page-level boilerplate duplication remains.

### Phase 5 — Hardening and quality gates
**Goal**: ensure long-term maintainability.
- Add CI checks:
  - `npm ci`
  - `npm run build`
- Add lint/format checks:
  - ESLint
  - Prettier
- Add a lightweight link checker (optional) and basic HTML validation (optional).
- Add performance checks (optional) and image optimization policy (documented).

Exit criteria:
- CI consistently builds and deploys; contributors can reproduce locally.

---

## Risks, Trade-offs, and Alternatives

### Key risks
- **GitHub Pages base path**: incorrect `base` configuration can break asset URLs; needs explicit handling.
- **Vue compiler build size**: keeping runtime template compilation increases bundle size; acceptable short-term, but plan for long-term refactor.
- **Tailwind purge/content scanning**: missing globs can drop required classes in production output; must include all HTML/partials and any class-generating JS.
- **Asset path churn**: moving asset directories can cause widespread link breakage; prefer copying into `public/` with current paths first.
- **Third-party scripts**: Google Analytics remains an external runtime script unless removed; it’s not a “frontend dependency” per se, but it is a runtime network dependency.

### Trade-offs and alternatives
- **Vite MPA (recommended)**:
  - Pros: incremental migration, minimal disruption, modern bundling.
  - Cons: still “hand-authored HTML pages” unless Phase 4 adopts templating/SSG.
- **Astro**:
  - Pros: excellent for content-heavy sites, componentized layouts, easy partial reuse.
  - Cons: larger conceptual shift; requires rewriting page templates into Astro components.
- **Eleventy (11ty)**:
  - Pros: very good for multi-page static sites, simple templating, small runtime.
  - Cons: templating migration effort; still need bundler for Tailwind/JS (often paired with Vite).
- **Remove Vue entirely**:
  - Pros: fewer dependencies, simpler build.
  - Cons: requires rewriting all interactive behavior (modals/carousels/collapsibles) and retesting.

---

## Explicit Assumptions
- The site is frontend-only; there is no server-side rendering requirement.
- The existing `.html` routes (including `blog/*.html`) should remain stable to avoid breaking backlinks and SEO.
- Contributors can use a Node-based toolchain (Node LTS available).
- The project should prefer “parity first” migration to reduce risk, then refactor for maintainability.
- The requirement to remove CDN dependencies includes Tailwind, Vue, AOS, Font Awesome, and fonts; analytics scripts are treated as a separate decision (keep/remove) and should be documented explicitly if retained.
