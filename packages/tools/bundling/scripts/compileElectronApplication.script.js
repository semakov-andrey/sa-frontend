import fs from 'node:fs/promises';
import path from 'node:path';

import { webpackElectronMainProdConfig } from '../configs/webpack.electron.main.prod.js';
import { webpackElectronRendererProdConfig } from '../configs/webpack.electron.renderer.prod.js';
import { devMiddleware } from '../middlewares/devMiddleware.js';
import { generateAllDeclarations } from '../utilities/generateAllDeclarations.utility.js';
import { tryCatch, hasData } from '../utilities/tryCatch.utility.js';

import { build } from './build.script.js';
import { spawnApplication } from './spawnApplication.script.js';
import { start } from './start.script.js';

export const compileElectronApplication = async (params) => {
  const {
    appName,
    rootDirectory,
    mainDirectories,
    rendererDirectories,
    rendererConfig = () => ({}),
    rendererParams: restRendererParams = {},
    devMiddlewares = [ devMiddleware ]
  } = params;

  const isWatch = process.argv[2] === '--watch';
  const isWindows = process.platform === 'win32';
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

  const mainParams = {
    rootDirectory,
    directories: {
      source: mainSourceDirectory,
      production: mainProductionDirectory
    },
    isCleanDirectory: false,
    isHTML: false,
    isAnalyzeBundle: false
  };

  const rendererParams = {
    rootDirectory,
    directories: {
      source: rendererSourceDirectory,
      production: rendererProductionDirectory
    },
    isAnalyzeBundle: false,
    ...restRendererParams
  };

  await generateAllDeclarations([ rendererSourceDirectory ]);

  try {
    if (isWatch) {
      if (isCompileMain) await tryCatch(build(webpackElectronMainProdConfig, mainParams));
      const compiler = await start(rendererConfig(), rendererParams, devMiddlewares);
      compiler.hooks.afterDone.tap('electron', () => {
        spawnApplication(appName, mainProductionDirectory, true, isWindows);
      });
    } else {
      if (isCompileMain) await build(webpackElectronMainProdConfig, mainParams);
      await build({ ...webpackElectronRendererProdConfig, ...rendererConfig() }, rendererParams);
      await spawnApplication(appName, mainProductionDirectory, false, isWindows);
    };
  } catch (error) {
    console.error(error);
  }
};
