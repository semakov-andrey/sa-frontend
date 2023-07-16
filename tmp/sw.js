const numeralSystem = 36;
const hashLength = 5;
const hash = Math.random().toString(numeralSystem).replace(/[^a-z]+/gu, '').substr(0, hashLength);
const CACHE_NAME = `sa-life-${ hash }`;
const isMac = /(Mac|iPhone|iPod|iPad)/iu.test(navigator.platform);
const isWin = /Win/iu.test(navigator.platform);

self.assets = self.assets.filter((asset) => {
  if (asset.includes('ios') && !isMac) return false;
  if (asset.includes('macos') && !isMac) return false;
  if (asset.includes('windows') && !isWin) return false;

  return true;
});

const isFile = (url) => {
  const splittedPath = url.split('/').pop().split('.');
  const extensionMaxLength = 5;

  return splittedPath.length > 1
    ? splittedPath.slice(-1)[0].length > 1 && splittedPath.slice(-1)[0].length < extensionMaxLength
    : false;
};

const installAsync = async () =>
  (await caches.open(CACHE_NAME)).addAll(self.assets);

const activateAsync = async () => (await caches.keys())
  .filter((cacheName) => cacheName !== CACHE_NAME)
  .map((cacheName) => caches.delete(cacheName));

const fetchAsync = async ({ request, request: { mode, url } }) => {
  const isIndex = mode === 'navigate' && !isFile(url);

  const response = await caches.match(isIndex ? '/index.html' : request);

  return response ? response : fetch(request);
};

self.addEventListener('install', (event) => {
  event.waitUntil(installAsync());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(activateAsync(), self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetchAsync(event));
});
