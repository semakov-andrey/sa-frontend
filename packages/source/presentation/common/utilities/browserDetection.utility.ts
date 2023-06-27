const { userAgent, vendor } = navigator;

export const isIE10 = (): boolean =>
  /MSIE 10/iu.test(userAgent);

export const isIE11 = (): boolean =>
  /rv:11.0/iu.test(userAgent);

export const isOldEdge = (): boolean =>
  /Edge\/\d./iu.test(userAgent);

export const isEdge = (): boolean =>
  userAgent.includes('Edg/');

export const isIE10Plus = (): boolean =>
  isIE10() || isIE11();

export const isIEOrOldEdge = (): boolean =>
  isIE10() || isIE11() || isEdge();

export const isSafari = (): boolean =>
  /^((?!chrome|android).)*safari/iu.test(navigator.userAgent);

export const isFirefox = (): boolean =>
  userAgent.includes('Firefox');

export const isChrome = (): boolean =>
  userAgent.includes('Chrome') && vendor.includes('Google Inc');

export const isOpera = (): boolean =>
  userAgent.includes('OPR/');
