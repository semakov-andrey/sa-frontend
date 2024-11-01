import path from 'path';

export const getDirectories = (rootDirectory, directories) => ({
  sourceDirectory: directories?.source
    ?? path.resolve(rootDirectory, 'src'),
  htmlFileDirectory: directories?.htmlFile
    ?? path.resolve(directories?.source ?? path.resolve(rootDirectory, 'src'), 'presentation'),
  faviconsDirectory: directories?.favicons
    ?? path.resolve(directories?.source ?? path.resolve(rootDirectory, 'src'), 'presentation', 'common', 'assets'),
  assetsDirectory: directories?.assets
    ?? 'assets',
  developmentDirectory: directories?.development
    ?? path.resolve(rootDirectory, 'tmp'),
  productionDirectory: directories?.production
    ?? path.resolve(rootDirectory, 'build')
});
