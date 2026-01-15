/**
 * Shared Tailwind CSS configuration for both Vite and PostCSS builds.
 */
const path = require('node:path');
const aspectRatio = require('@tailwindcss/aspect-ratio');

const projectRoot = path.resolve(__dirname);
const srcRoot = path.join(projectRoot, 'src');

module.exports = {
  content: [
    path.join(srcRoot, 'pages/**/*.html'),
    path.join(srcRoot, 'pages/**/*.js'),
    path.join(srcRoot, 'scripts/**/*.js'),
    path.join(srcRoot, 'partials/**/*.html')
  ],
  theme: {
    extend: {}
  },
  plugins: [aspectRatio]
};
