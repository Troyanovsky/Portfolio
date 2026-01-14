# AGENTS.md - Context & Instructions

## Project Overview
This is a personal portfolio website for Guodong Zhao, hosted on **GitHub Pages**.
It is a **static website** that uses modern frontend libraries via CDN without a build step.

### Key Technologies
- **HTML5**: The core structure of the pages.
- **Vue.js 3 (CDN)**: Used for interactivity (mobile menu, modals, carousels, toggles).
- **Tailwind CSS (CDN)**: Used for utility-first styling.
- **AOS (Animate On Scroll)**: Used for scroll animations.
- **Font Awesome**: Used for icons.

## Architecture & File Structure

### Core Files
- `index.html`: The main landing page / "Selected Projects".
- `OtherProjects.html`: A secondary listing page.
- `[ProjectName].html`: Individual case study pages (e.g., `PineCones.html`, `LAUNCH.html`).
- `CNAME`: Configures the custom domain.
- `.nojekyll`: Bypasses Jekyll processing on GitHub Pages (allowing folders starting with `_` or just ensuring standard static serving).

### Asset Organization
Assets are organized by project/context:
- `images/`: General assets (profile pic, icons, resume).
- `PineCones/`, `LAUNCH/`, `AirInPgh/`, etc.: Project-specific images and videos.
- `aos/`: Local copies of AOS library files.

## Development Conventions

### 1. No Build System
**There is no `npm run build` or webpack configuration.**
- All libraries are imported via `<script>` or `<link>` tags in the `<head>` or body.
- You edit the HTML files directly.
- **Tailwind CSS** is loaded via the standalone script tag, which processes classes in the browser.

### 2. Vue.js Implementation
- Vue is initialized at the bottom of each HTML page within a `<script>` tag.
- Each page has its own isolated Vue instance (`createApp`).
- **Data & Logic:** Component data (like carousel slides or modal states) is hardcoded directly in the `data()` function of that page's Vue instance.

### 4. Styling
- Primarily **Tailwind CSS** classes.
- Custom styles are defined in the `<style>` block in the `<head>` (e.g., font families, custom animations, specific overrides).
- Google Fonts (Raleway, Poppins) are used.

## Building & Running

### Local Development
Since it is a static site, you can serve it using any simple HTTP server.

**Using Python:**
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using VS Code:**
- Use the "Live Server" extension if available.

### Deployment
- The site is hosted on **GitHub Pages**.
- **Deploy:** Simply commit and push changes to the `main` (or `master`) branch.
- Changes usually go live within a few minutes.

## Common Tasks

### Adding a New Project Page
1.  Copy an existing project page (e.g., `PineCones.html`) to use as a template.
2.  Update the `<title>` and meta tags.
3.  Update the content sections.
4.  Update the Vue `data()` to reflect the new project's images/slides.
5.  Add a link to the new page in `index.html` or `OtherProjects.html`.

