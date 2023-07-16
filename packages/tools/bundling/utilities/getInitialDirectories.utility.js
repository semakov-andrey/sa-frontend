import path from 'path';

export const getInitialDirectories = (params) => ({
  assets: 'assets',
  presentation: path.resolve(params.directories.source, 'presentation')
});
