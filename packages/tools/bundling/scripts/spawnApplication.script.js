import { spawn } from 'child_process';

import { deleteAsync } from 'del';

import { isset } from '@sa-frontend/bundling/utilities/typeGuards.utility.js';

let electron;

export const spawnApplication = async (name, appPath, isWatch, isWindows) => {
  if (isWatch) {
    if (!isset(electron)) {
      electron = spawn('electron', [ '.' ], { shell: isWindows });
    }
    return;
  }

  await deleteAsync(`${ name }-win32-x64`);
  await deleteAsync(`${ name }-darwin-arm64`);
  electron = spawn('electron-packager', [
    appPath,
    name,
    `--icon=${ appPath }/icon.icns`,
    '--overwrite'
  ], { shell: isWindows });
  await new Promise((resolve) => {
    electron.on('close', resolve);
  });
  await deleteAsync(`${ appPath }/frontend`);
  console.info('Application was spawned');
};
