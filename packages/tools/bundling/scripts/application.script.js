import { spawn } from 'child_process';

import { deleteAsync } from 'del';

import { getAppName } from '../utilities/getAppName.utility.js';
import { isset } from '../utilities/typeGuards.utility.js';

const isWindows = process.platform === 'win32';

export let electron;

export const startApplication = () => {
  if (!isset(electron)) {
    electron = spawn('electron', [ '.', '--inspect=9229' ], { shell: isWindows });
  }
};

export const buildApplication = async (name, appPath) => {
  const appName = getAppName(name, isWindows);
  await deleteAsync(`${ appName }-win32-x64`);
  await deleteAsync(`${ appName }-darwin-arm64`);
  electron = spawn('npx', [
    '@electron/packager',
    appPath,
    appName,
    `--icon=${ appPath }/icon.icns`,
    '--overwrite'
  ], { shell: isWindows });
  await new Promise((resolve) => {
    electron.on('close', resolve);
  });
  await deleteAsync(`${ appPath }/frontend`);
  console.info('Application was spawned');
};

export const killApplication = () => {
  if (!isset(electron)) return;
  electron.kill();
  electron = undefined;
};
