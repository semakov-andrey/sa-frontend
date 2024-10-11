import { webpackElectronServerProdConfig } from '../configs/webpack.electron.server.prod.js';

import { startApplication, killApplication } from './application.script.js';
import { start } from './start.script.js';

export const startElectron = async (params) => {
  const {
    isCompileServer,
    serverConfig,
    serverParams,
    clientConfig,
    clientParams,
    devMiddlewares,
    isWatchBuilded
  } = params;

  if (isCompileServer) {
    const serverCompiler = await start({ ...webpackElectronServerProdConfig, ...serverConfig() }, serverParams, undefined, isWatchBuilded);
    serverCompiler.hooks.afterDone.tap('electron-main', () => {
      killApplication();
      startApplication();
    });
  }
  const clientCompiler = await start(clientConfig(), clientParams, devMiddlewares, isWatchBuilded);
  clientCompiler.hooks.afterDone.tap('electron-renderer', () => {
    startApplication();
  });
};
