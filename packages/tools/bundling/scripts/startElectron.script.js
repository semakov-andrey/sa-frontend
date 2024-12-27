import { networkInterfaces } from 'node:os';

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
    isPWA
  } = params;

  if (isCompileServer && !isPWA) {
    const serverCompiler = await start({ ...webpackElectronServerProdConfig, ...serverConfig() }, serverParams, undefined, isPWA);
    serverCompiler.hooks.afterDone.tap('electron-main', () => {
      killApplication();
      startApplication();
    });
  }
  const clientCompiler = await start(clientConfig(), clientParams, devMiddlewares, isPWA);
  clientCompiler.hooks.afterDone.tap('electron-renderer', () => {
    if (!isPWA) {
      startApplication();
    } else {
      const address = networkInterfaces().en0.find(({ family }) => family === 'IPv4')?.address;
      console.info('PWA started at:');
      console.info(`https://localhost:${ clientParams.port }`);
      if (address) console.info(`https://${ address }:${ clientParams.port }`);
    }
  });
};
