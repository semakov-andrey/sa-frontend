import { webpackElectronMainProdConfig } from '../configs/webpack.electron.main.prod.js';
import { webpackElectronRendererProdConfig } from '../configs/webpack.electron.renderer.prod.js';

import { buildApplication } from './application.script.js';
import { build } from './build.script.js';

export const buildElectron = async (params) => {
  const {
    appName,
    mainProductionDirectory,
    isCompileMain,
    mainConfig,
    mainParams,
    rendererConfig,
    rendererParams
  } = params;

  if (isCompileMain) {
    await build({ ...webpackElectronMainProdConfig, ...mainConfig() }, mainParams);
  }
  await build({ ...webpackElectronRendererProdConfig, ...rendererConfig() }, rendererParams);
  await buildApplication(appName, mainProductionDirectory);
};
