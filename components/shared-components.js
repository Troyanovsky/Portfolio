/**
 * Shared Components Loader
 * Provides reusable navigation and footer components for the portfolio website.
 * Works with static site hosting (GitHub Pages) without a build system.
 */

(function() {
    'use strict';

    /**
     * Returns the URL of the directory containing this script.
     * This avoids hardcoding assumptions about whether the site is served from
     * the domain root (custom domain) or a subpath (GitHub Pages project URL).
     */
    function getComponentsDirectoryUrl() {
        const currentScriptSrc = document.currentScript && document.currentScript.src;
        if (currentScriptSrc) {
            return new URL('./', currentScriptSrc);
        }

        const fallbackScript = Array.from(document.scripts).find((script) =>
            typeof script.src === 'string' && script.src.includes('components/shared-components.js')
        );
        if (fallbackScript && fallbackScript.src) {
            return new URL('./', fallbackScript.src);
        }

        // Final fallback: assume script lives at ./components/shared-components.js relative to the page.
        return new URL('./components/', window.location.href);
    }

    function getPathSegments(pathname) {
        return pathname.split('/').filter(Boolean);
    }

    /**
     * Returns a relative URL path from one directory URL to another directory URL.
     * Example: /Portfolio/blog/ -> /Portfolio/ returns ../
     */
    function getRelativeDirectoryPath(fromDirectoryUrl, toDirectoryUrl) {
        const fromSegments = getPathSegments(fromDirectoryUrl.pathname);
        const toSegments = getPathSegments(toDirectoryUrl.pathname);

        let commonIndex = 0;
        while (
            commonIndex < fromSegments.length &&
            commonIndex < toSegments.length &&
            fromSegments[commonIndex] === toSegments[commonIndex]
        ) {
            commonIndex += 1;
        }

        const upLevels = fromSegments.length - commonIndex;
        const downSegments = toSegments.slice(commonIndex);

        const upPath = '../'.repeat(upLevels);
        const downPath = downSegments.length ? `${downSegments.join('/')}/` : '';
        return `${upPath}${downPath}`;
    }

    const componentsDirectoryUrl = getComponentsDirectoryUrl();
    const siteRootUrl = new URL('..', componentsDirectoryUrl);
    const currentPageDirectoryUrl = new URL('./', window.location.href);
    const basePath = getRelativeDirectoryPath(currentPageDirectoryUrl, siteRootUrl);

    /**
     * Fetch and inject component HTML
     */
    async function loadComponent(url, targetId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status}`);
            }
            let html = await response.text();
            // Replace {{BASE_PATH}} placeholder before injection
            html = html.replace(/\{\{BASE_PATH\}\}/g, basePath);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.innerHTML = html;
                return true;
            }
            console.warn(`Target element #${targetId} not found`);
            return false;
        } catch (error) {
            console.error(`Error loading component from ${url}:`, error);
            // Add fallback content for critical components
            if (targetId === 'navigation-container') {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.innerHTML = '<div class="h-16 bg-white border-b border-gray-100 flex items-center justify-center px-4"><span class="text-gray-600">Menu</span></div>';
                }
            }
            return false;
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        const menuButton = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', function() {
                const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', !isExpanded);

                // Toggle menu visibility
                if (isExpanded) {
                    mobileMenu.classList.add('hidden');
                } else {
                    mobileMenu.classList.remove('hidden');
                }

                // Toggle icon
                const barsIcon = menuButton.querySelector('.fa-bars');
                const timesIcon = menuButton.querySelector('.fa-times');
                if (barsIcon && timesIcon) {
                    barsIcon.classList.toggle('hidden');
                    timesIcon.classList.toggle('hidden');
                }
            });
        }
    }

    /**
     * Load navigation component
     */
    async function loadNavigation() {
        const navigationUrl = new URL('navigation.html', componentsDirectoryUrl).toString();
        const success = await loadComponent(navigationUrl, 'navigation-container');
        if (success) {
            initMobileMenu();
        }
        return success;
    }

    /**
     * Load footer component
     */
    async function loadFooter() {
        const footerUrl = new URL('footer.html', componentsDirectoryUrl).toString();
        return await loadComponent(footerUrl, 'footer-container');
    }

    /**
     * Load all components
     */
    async function loadAllComponents() {
        await Promise.all([
            loadNavigation(),
            loadFooter()
        ]);
    }

    // Export to global scope
    window.SharedComponents = {
        loadNavigation,
        loadFooter,
        loadAllComponents
    };

    // Auto-load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
        loadAllComponents();
    }
})();
