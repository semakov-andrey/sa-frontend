export const register = async (url: string = '/sw.js'): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;

  try {
    await navigator.serviceWorker.register(url);
  } catch {
    console.error('Service worker registration error');
  }
};

export const unregister = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  await registration.unregister();
};
