const { userAgent, platform } = navigator;

export const isAppleDevice = (): boolean =>
  Boolean(/(Mac|iPhone|iPod|iPad)/iu.exec(platform));

export const isWindows = (): boolean =>
  userAgent.includes('Windows');

export const isAndroid = (): boolean =>
  userAgent.includes('Android');
