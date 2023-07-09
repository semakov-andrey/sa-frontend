import { deleteAsync } from 'del';
import webpack from 'webpack';

import { webpackConfig } from '../configs/webpack.prod.js';
import { STATS_OPTIONS } from '../constants/statsOptions.constant.js';

export const build = async (params) => {
  const { directories } = params;

  try {
    await deleteAsync(`${ directories.production }/**/*`);
  } catch {}

  return await new Promise((resolve, reject) => {
    console.info('Building...');
    const compiler = webpack(webpackConfig(params));

    compiler.run((_, stats) => {
      console.info(stats.toString(STATS_OPTIONS));
      if (stats.compilation.errors.length > 0) {
        reject(stats.compilation.errors);
        return;
      }

      console.info('Frontend was compiled');
      resolve();
    });
  });
};
