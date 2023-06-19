const { userAgent, platform } = navigator;

export const isAppleDevice = () =>
  platform.match(/(Mac|iPhone|iPod|iPad)/iu);

export const isWindows = () =>
  /Windows/u.test(userAgent);

export const isAndroid = () =>
  /Android/u.test(userAgent);
