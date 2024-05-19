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
    aliases,
    devMiddlewares
  } = params;

  if (isCompileServer) {
    const serverCompiler = await start({ ...aliases, ...webpackElectronServerProdConfig, ...serverConfig() }, serverParams);
    serverCompiler.hooks.afterDone.tap('electron-main', () => {
      killApplication();
      startApplication();
    });
  }
  const clientCompiler = await start({ ...aliases, ...clientConfig() }, clientParams, devMiddlewares);
  clientCompiler.hooks.afterDone.tap('electron-renderer', () => {
    startApplication();
  });
};
