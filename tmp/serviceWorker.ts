export function register(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((error: string): void => {
        console.error(`Error during service worker registration: ${ error }`);
      });
  }
};

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(async (registration: ServiceWorkerRegistration): Promise<boolean> =>
      await registration.unregister());
  }
};
