import fs from 'node:fs/promises';
import path from 'node:path';

import { webpackElectronMainProdConfig } from '../configs/webpack.electron.main.prod.js';
import { webpackElectronRendererProdConfig } from '../configs/webpack.electron.renderer.prod.js';
import { devMiddleware } from '../middlewares/devMiddleware.js';
import { generateAllDeclarations } from '../utilities/generateAllDeclarations.utility.js';
import { tryCatch, hasData } from '../utilities/tryCatch.utility.js';

import { build } from './build.script.js';
import { spawnApplication, killApplication } from './electronApplication.script.js';
import { start } from './start.script.js';

export const compileElectronApplication = async (params) => {
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
      development: mainProductionDirectory,
      production: mainProductionDirectory
    },
    isCleanDirectory: false,
    isHTML: false,
    isSourceMap: false,
    isHMR: false,
    isAnalyzeBundle: false,
    tsConfigOverwrite: {
      include: [
        './main/**/*',
        './node_modules/@sa-frontend/application/types',
        './node_modules/@sa-frontend/presentation/common/types'
      ]
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
      include: [
        './src/**/*',
        './node_modules/@sa-frontend/application/types',
        './node_modules/@sa-frontend/presentation/common/types'
      ]
    },
    ...restRendererParams
  };

  await generateAllDeclarations([ rendererSourceDirectory ]);

  const watchIt = async () => {
    if (isCompileMain) {
      const mainCompiler = await start({ ...webpackElectronMainProdConfig, ...mainConfig() }, mainParams);
      mainCompiler.hooks.afterDone.tap('electron-main', () => {
        killApplication();
        spawnApplication(appName, mainProductionDirectory, true, isWindows);
      });
    }
    const rendererCompiler = await start(rendererConfig(), rendererParams, devMiddlewares);
    rendererCompiler.hooks.afterDone.tap('electron-renderer', () => {
      spawnApplication(appName, mainProductionDirectory, true, isWindows);
    });
  };

  const buildIt = async () => {
    if (isCompileMain) {
      await build({ ...webpackElectronMainProdConfig, ...mainConfig() }, mainParams);
    }
    await build({ ...webpackElectronRendererProdConfig, ...rendererConfig() }, rendererParams);
    await spawnApplication(appName, mainProductionDirectory, false, isWindows);
  };

  try {
    if (isWatch) watchIt();
    else buildIt();
  } catch (error) {
    console.error(error);
  }
};
