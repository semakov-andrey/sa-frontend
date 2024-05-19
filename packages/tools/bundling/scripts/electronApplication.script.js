import { spawn } from 'child_process';

import { deleteAsync } from 'del';

import { getAppName } from '../utilities/getAppName.utility.js';
import { isset } from '../utilities/typeGuards.utility.js';

export let electron;

export const spawnApplication = async (name, appPath, isWatch, isWindows) => {
  if (isWatch) {
    if (!isset(electron)) {
      electron = spawn('electron', [ '.', '--inspect=9229' ], { shell: isWindows });
    }
    return;
  }

  const appName = getAppName(name, isWindows);
  await deleteAsync(`${ appName }-win32-x64`);
  await deleteAsync(`${ appName }-darwin-arm64`);
  electron = spawn('electron-packager', [
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
