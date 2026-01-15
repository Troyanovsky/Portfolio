/**
 * Vite configuration for the multi-page portfolio build output.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';

const root = path.resolve(__dirname, 'src/pages');
const partialsDir = path.resolve(__dirname, 'src/partials');

function htmlPartialsPlugin() {
  let cachedPartials = null;

  async function loadPartials() {
    if (cachedPartials) {
      return cachedPartials;
    }

    const [navigation, footer] = await Promise.all([
      readFile(path.join(partialsDir, 'navigation.html'), 'utf-8'),
      readFile(path.join(partialsDir, 'footer.html'), 'utf-8')
    ]);

    cachedPartials = { navigation, footer };
    return cachedPartials;
  }

  function getBasePathForPage(pagePath) {
    const directory = path.posix.dirname(pagePath || '/');
    const depth = directory.split('/').filter(Boolean).length;
    return depth === 0 ? '' : '../'.repeat(depth);
  }

  return {
    name: 'html-partials',
    enforce: 'pre',
    async transformIndexHtml(html, ctx) {
      const partials = await loadPartials();
      const basePath = getBasePathForPage(ctx.path);
      const navigation = partials.navigation.replace(/\{\{BASE_PATH\}\}/g, basePath);
      const footer = partials.footer.replace(/\{\{BASE_PATH\}\}/g, basePath);

      return html.replace('<!-- NAVIGATION -->', navigation).replace('<!-- FOOTER -->', footer);
    }
  };
}

export default defineConfig({
  root,
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '/scripts': path.resolve(__dirname, 'src/scripts')
    }
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
    }
  },
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [htmlPartialsPlugin()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(root, 'index.html'),
        OtherProjects: path.resolve(root, 'OtherProjects.html'),
        PineCones: path.resolve(root, 'PineCones.html'),
        LAUNCH: path.resolve(root, 'LAUNCH.html'),
        InvisibleThreats: path.resolve(root, 'InvisibleThreats.html'),
        Recharge: path.resolve(root, 'Recharge.html'),
        LinguaSwap: path.resolve(root, 'LinguaSwap.html'),
        IDToolkit: path.resolve(root, 'IDToolkit.html'),
        blinkingForEyeHealth: path.resolve(root, 'blog/blinking-for-eye-health.html'),
        waterBreaksStayHydrated: path.resolve(root, 'blog/water-breaks-stay-hydrated.html')
      }
    }
  }
});
