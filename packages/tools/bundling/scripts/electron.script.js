import fs from 'node:fs/promises';
import path from 'node:path';

import { webpackElectronCommonConfig } from '../configs/webpack.electron.common.js';
import { devMiddleware } from '../middlewares/devMiddleware.js';
import { generateAllDeclarations } from '../utilities/generateAllDeclarations.utility.js';
import { tryCatch, hasData } from '../utilities/tryCatch.utility.js';
import { tryParseJSON } from '../utilities/tryParseJSON.utility.js';
import { isset } from '../utilities/typeGuards.utility.js';

import { buildElectron } from './buildElectron.script.js';
import { startElectron } from './startElectron.script.js';

export const electron = async (params) => {
  const {
    appName,
    rootDirectory,
    serverDirectories,
    serverConfig = () => ({}),
    clientDirectories,
    clientConfig = () => ({}),
    clientParams: restClientParams = {},
    devMiddlewares = [ devMiddleware ]
  } = params;

  const isWatch = process.argv[2] === '--watch';
  const serverSourceDirectory = serverDirectories?.source
    ?? path.resolve(rootDirectory, 'srcServer');
  const serverProductionDirectory = serverDirectories?.production
    ?? path.resolve(rootDirectory, 'app');
  const clientSourceDirectory = clientDirectories?.source
    ?? path.resolve(rootDirectory, 'srcClient');
  const clientProductionDirectory = clientDirectories?.production
    ?? path.resolve(rootDirectory, 'app', 'frontend');
  const statsOfServerDirectory = await tryCatch(fs.stat(serverSourceDirectory));
  const isCompileServer = hasData(statsOfServerDirectory) && statsOfServerDirectory.data.isDirectory();
  const tsConfig = await tryCatch(fs.readFile(path.resolve(rootDirectory, 'tsconfig.json')));
  const tsConfigData = hasData(tsConfig) ? tryParseJSON(tsConfig.data) : undefined;
  const tsConfigInclude = isset(tsConfigData) && hasData(tsConfigData) ? tsConfigData.data?.include : undefined;

  const serverParams = {
    rootDirectory,
    directories: {
      source: serverSourceDirectory,
      development: serverProductionDirectory,
      production: serverProductionDirectory
    },
    isCleanDirectory: false,
    isHTML: false,
    isSourceMap: false,
    isHMR: false,
    isAnalyzeBundle: false,
    tsConfigOverwrite: {
      ...Array.isArray(tsConfigInclude)
        ? { include: tsConfigInclude.filter((item) => !item.includes('./srcClient/')) }
        : {}
    },
    aliases: {
      '@/srcClient': clientSourceDirectory,
      '@/srcServer': serverSourceDirectory
    }
  };

  const clientParams = {
    rootDirectory,
    directories: {
      source: clientSourceDirectory,
      production: clientProductionDirectory
    },
    isAnalyzeBundle: false,
    tsConfigOverwrite: {
      ...Array.isArray(tsConfigInclude)
        ? { include: tsConfigInclude.filter((item) => !item.includes('./srcServer/')) }
        : {}
    },
    aliases: {
      '@/srcClient': clientSourceDirectory,
      '@/srcServer': serverSourceDirectory
    },
    ...restClientParams
  };

  const aliases = webpackElectronCommonConfig(serverParams.directories.source, clientParams.directories.source);

  await generateAllDeclarations([ clientSourceDirectory ]);

  try {
    const params = {
      appName,
      serverProductionDirectory,
      isCompileServer,
      serverConfig,
      serverParams,
      clientConfig,
      clientParams,
      aliases,
      devMiddlewares
    };
    if (isWatch) startElectron(params);
    else buildElectron(params);
  } catch (error) {
    console.error(error);
  }
};
