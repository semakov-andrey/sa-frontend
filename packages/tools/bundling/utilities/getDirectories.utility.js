import path from 'path';

export const getDirectories = (rootDirectory, directories) => ({
  sourceDirectory: directories?.source
    ?? path.resolve(rootDirectory, 'src'),
  htmlFileDirectory: directories?.htmlFile
    ?? path.resolve(directories?.source
      ?? path.resolve(rootDirectory, 'src'), 'presentation'),
  assetsDirectory: directories?.assets
    ?? 'assets',
  developmentDirectory: directories?.development
    ?? path.resolve(rootDirectory, 'tmp'),
  productionDirectory: directories?.production
    ?? path.resolve(rootDirectory, 'build')
});
