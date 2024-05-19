import { webpackElectronMainProdConfig } from '../configs/webpack.electron.main.prod';

import { startApplication, killApplication } from './application.script';
import { start } from './start.script';

export const startElectron = async (params) => {
  const {
    isCompileMain,
    mainConfig,
    mainParams,
    rendererConfig,
    rendererParams,
    devMiddlewares
  } = params;

  if (isCompileMain) {
    const mainCompiler = await start({ ...webpackElectronMainProdConfig, ...mainConfig() }, mainParams);
    mainCompiler.hooks.afterDone.tap('electron-main', () => {
      killApplication();
      startApplication();
    });
  }
  const rendererCompiler = await start(rendererConfig(), rendererParams, devMiddlewares);
  rendererCompiler.hooks.afterDone.tap('electron-renderer', () => {
    startApplication();
  });
};
