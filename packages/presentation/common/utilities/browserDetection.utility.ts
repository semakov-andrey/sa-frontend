const { userAgent, vendor } = navigator;

export const isIE10 = () =>
  /MSIE 10/iu.test(userAgent);
  
export const isIE11 = () =>
  /rv:11.0/iu.test(userAgent);
  
export const isOldEdge = () =>
  /Edge\/\d./iu.test(userAgent);

export const isEdge = () =>
  /Edg\//u.test(userAgent);

export const isIE10Plus = () =>
  isIE10() || isIE11();

export const isIEOrOldEdge = () =>
  isIE10() || isIE11() || isEdge();

export const isSafari = () =>
  /Safari/u.test(userAgent) && !/Chrome/u.test(userAgent);

export const isFirefox = () =>
  /Firefox/u.test(userAgent);

export const isChrome = () =>
  /Chrome/u.test(userAgent) && /Google Inc/u.test(vendor);

export const isOpera = () =>
  /OPR\//u.test(userAgent);
