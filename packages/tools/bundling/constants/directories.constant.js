import path from 'path';

import { ROOT } from './root.constant.js';

export const DIRECTORIES = {
  ASSETS: 'assets',
  APPLICATION: path.resolve(ROOT, 'app'),
  PRODUCTION: path.resolve(ROOT, 'app', 'frontend'),
  SOURCE: path.resolve(ROOT, 'src')
};
