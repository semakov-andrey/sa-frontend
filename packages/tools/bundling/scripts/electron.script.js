import fs from 'node:fs/promises';
import path from 'node:path';

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
    mainDirectories,
    mainConfig = () => ({}),
    rendererDirectories,
    rendererConfig = () => ({}),
    rendererParams: restRendererParams = {},
    devMiddlewares = [ devMiddleware ]
  } = params;

  const isWatch = process.argv[2] === '--watch';
  const mainSourceDirectory = mainDirectories?.source
    ?? path.resolve(rootDirectory, 'main');
  const mainProductionDirectory = mainDirectories?.production
    ?? path.resolve(rootDirectory, 'app');
  const rendererSourceDirectory = rendererDirectories?.source
    ?? path.resolve(rootDirectory, 'src');
  const rendererProductionDirectory = rendererDirectories?.production
    ?? path.resolve(rootDirectory, 'app', 'frontend');
  const statsOfMainDirectory = await tryCatch(fs.stat(mainSourceDirectory));
  const isCompileMain = hasData(statsOfMainDirectory) && statsOfMainDirectory.data.isDirectory();
  const tsConfig = await tryCatch(fs.readFile(path.resolve(rootDirectory, 'tsconfig.json')));
  const tsConfigData = hasData(tsConfig) ? tryParseJSON(tsConfig.data) : undefined;
  const tsConfigInclude = isset(tsConfigData) && hasData(tsConfigData) ? tsConfigData.data?.include : undefined;

  const mainParams = {
    rootDirectory,
    directories: {
      source: mainSourceDirectory,
      development: mainProductionDirectory,
      production: mainProductionDirectory
    },
    isCleanDirectory: false,
    isHTML: false,
    isSourceMap: false,
    isHMR: false,
    isAnalyzeBundle: false,
    tsConfigOverwrite: {
      ...Array.isArray(tsConfigInclude)
        ? { include: tsConfigInclude.filter((item) => !item.includes('./src/')) }
        : {}
    }
  };

  const rendererParams = {
    rootDirectory,
    directories: {
      source: rendererSourceDirectory,
      production: rendererProductionDirectory
    },
    isAnalyzeBundle: false,
    tsConfigOverwrite: {
      ...Array.isArray(tsConfigInclude)
        ? { include: tsConfigInclude.filter((item) => !item.includes('./main/')) }
        : {}
    },
    ...restRendererParams
  };

  await generateAllDeclarations([ rendererSourceDirectory ]);

  try {
    const params = {
      appName,
      mainProductionDirectory,
      isCompileMain,
      mainConfig,
      mainParams,
      rendererConfig,
      rendererParams,
      devMiddlewares
    };
    if (isWatch) startElectron(params);
    else buildElectron(params);
  } catch (error) {
    console.error(error);
  }
};
