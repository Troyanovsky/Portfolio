/**
 * Tailwind CSS configuration for the multi-page portfolio site.
 */
import aspectRatio from '@tailwindcss/aspect-ratio';
import path from 'node:path';

const projectRoot = path.resolve('.');
const srcRoot = path.join(projectRoot, 'src');

export default {
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
