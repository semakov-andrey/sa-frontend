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
    aliases
  } = params;

  if (isCompileServer) {
    await build({ ...aliases, ...webpackElectronServerProdConfig, ...serverConfig() }, serverParams);
  }
  await build({ ...aliases, ...webpackElectronClientProdConfig, ...clientConfig() }, clientParams);
  await buildApplication(appName, serverProductionDirectory);
};
