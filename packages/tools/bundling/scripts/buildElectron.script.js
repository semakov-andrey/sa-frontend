import { webpackElectronClientProdConfig } from '../configs/webpack.electron.client.prod.js';
import { webpackElectronServerProdConfig } from '../configs/webpack.electron.server.prod.js';

import { buildApplication } from './application.script.js';
import { build } from './build.script.js';

export const buildElectron = async (params) => {
  const {
    appName,
    serverProductionDirectory,
    isCompileServer,
    serverConfig,
    serverParams,
    clientConfig,
    clientParams,
  } = params;

  if (isCompileServer) {
    await build({ ...webpackElectronServerProdConfig, ...serverConfig() }, serverParams);
  }
  await build({ ...webpackElectronClientProdConfig, ...clientConfig() }, clientParams);
  await buildApplication(appName, serverProductionDirectory);
};
