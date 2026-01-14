# AGENTS.md - Context & Instructions for Coding Agents

## Project Overview
This is a personal portfolio website for Guodong Zhao, hosted on **GitHub Pages**.
It is a **static website** built with Vite (multi-page build) and deployed via GitHub Actions.

### Key Technologies
- **HTML5**: The core structure of the pages.
- **Vite**: Multi-page build pipeline and dev server.
- **Vue.js 3**: Used for interactivity (mobile menu, modals, carousels, toggles).
- **Tailwind CSS (PostCSS build)**: Used for utility-first styling.
- **AOS (Animate On Scroll)**: Used for scroll animations.
- **Font Awesome**: Used for icons.

## Architecture & File Structure

### Core Files
- `src/pages/index.html`: The main landing page / "Selected Projects".
- `src/pages/OtherProjects.html`: A secondary listing page.
- `src/pages/[ProjectName].html`: Individual case study pages (e.g., `PineCones.html`, `LAUNCH.html`).
- `public/CNAME`: Configures the custom domain (copied to `dist/` during build).
- `public/.nojekyll`: Bypasses Jekyll processing on GitHub Pages.
- `vite.config.js`: Multi-page build config and HTML partial injection.

### Asset Organization
Assets are organized by project/context:
- `public/images/`: General assets (profile pic, icons, resume).
- `public/PineCones/`, `public/LAUNCH/`, `public/AirInPgh/`, etc.: Project-specific images and videos.
- `src/partials/`: Shared navigation and footer templates injected at build time.
- `src/scripts/`: Page-level Vue apps and shared logic.
- `src/pages/styles/`: Tailwind entry + site-specific CSS.

## Development Conventions

### 1. Vite Build Pipeline
Use Vite for local development and production builds.
- Run `npm install` once, then `npm run dev` for local work.
- Build output goes to `dist/` via `npm run build`.
- Preview the build with `npm run preview`.

### 2. Vue.js Implementation
- Vue is initialized per page from `src/scripts/pages/*.js`.
- Each page has its own isolated Vue app (`createApp`).
- **Data & Logic:** Component data (like carousel slides or modal states) is hardcoded directly in the `data()` function for that page.

### 3. Shared Components (Nav & Footer)
Navigation and footer are loaded from `src/partials/` and injected by `vite.config.js`.
Use the `<!-- NAVIGATION -->` and `<!-- FOOTER -->` placeholders in page HTML.

### 4. Styling
- Primarily **Tailwind CSS** classes.
- Tailwind is built from `src/pages/styles/tailwind.css` and imported in `src/pages/styles/main.css`.
- Each individual project page may have its own accent color.
- Custom styles live in `src/pages/styles/main.css`.
- Fonts are sourced from npm packages and copied into `src/pages/styles/files/` and `src/pages/webfonts/` by `scripts/copy-font-assets.js`.

## Building & Running

### Local Development
**Using Vite:**
```bash
npm run dev
```
Then visit the URL shown in the terminal.

**Build + Preview:**
```bash
npm run build
npm run preview
```

### Deployment
- The site is hosted on **GitHub Pages** via GitHub Actions.
- **Deploy:** Commit and push; the workflow in `.github/workflows/pages.yml` publishes `dist/`.
- **Pages Settings:** Set Source to **GitHub Actions** (not branch/root).

## Common Tasks

### Adding a New Project Page
1.  Copy an existing project page (e.g., `PineCones.html`) in `src/pages/`.
2.  Update the `<title>` and meta tags.
3.  Update the content sections.
4.  Update the matching script in `src/scripts/pages/` for the new page's Vue data.
5.  Add the page to `vite.config.js` `build.rollupOptions.input`.
6.  Add a link to the new page in `src/pages/index.html` or `src/pages/OtherProjects.html`.

