import { spawn } from 'child_process';

import { deleteAsync } from 'del';

import { isset } from '../utilities/typeGuards.utility.js';

let electron;

export const spawnApplication = async (name, appPath, isWatch, isWindows) => {
  if (isWatch) {
    if (!isset(electron)) {
      electron = spawn('electron', [ '.' ], { shell: isWindows });
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
