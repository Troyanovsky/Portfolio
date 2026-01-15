/**
 * Copies font and icon assets from node_modules into public for Vite builds.
 */
import { access, copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const copyTargets = [
  {
    from: path.join(root, 'node_modules/@fontsource/raleway/files'),
    to: path.join(root, 'src/pages/styles/files')
  },
  {
    from: path.join(root, 'node_modules/@fontsource/poppins/files'),
    to: path.join(root, 'src/pages/styles/files')
  },
  {
    from: path.join(root, 'node_modules/@fortawesome/fontawesome-free/webfonts'),
    to: path.join(root, 'src/pages/webfonts')
  }
];

async function copyDir(sourceDir, targetDir) {
  await mkdir(targetDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
      continue;
    }

    try {
      await access(targetPath);
      continue;
    } catch {
      await copyFile(sourcePath, targetPath);
    }
  }
}

async function ensureSourceDirectory(sourceDir) {
  try {
    const sourceStats = await stat(sourceDir);
    if (!sourceStats.isDirectory()) {
      throw new Error(`${sourceDir} is not a directory.`);
    }
  } catch (error) {
    throw new Error(
      `Missing font assets at ${sourceDir}. Run "npm install" before running this script.`,
      { cause: error }
    );
  }
}

async function copyAssets() {
  for (const target of copyTargets) {
    await ensureSourceDirectory(target.from);
    await copyDir(target.from, target.to);
  }
}

copyAssets().catch((error) => {
  console.error('Failed to copy font assets:', error);
  process.exit(1);
});
