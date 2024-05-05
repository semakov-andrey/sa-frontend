export const getAppName = (name, isWindows) => name.replaceAll(' ', isWindows ? '_' : '');
