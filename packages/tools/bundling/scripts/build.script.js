import { deleteAsync } from 'del';
import webpack from 'webpack';

import { webpackProdConfig } from '../configs/webpack.prod.js';
import { STATS_OPTIONS } from '../constants/statsOptions.constant.js';

export const build = async (config, params) => {
  const { directories, isCleanDirectory = true } = params;

  if (isCleanDirectory) {
    try {
      await deleteAsync(`${ directories.production }/**/*`);
    } catch {}
  }

  return await new Promise((resolve, reject) => {
    console.info('Building...');
    const compiler = webpack(webpackProdConfig(config, params));

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
