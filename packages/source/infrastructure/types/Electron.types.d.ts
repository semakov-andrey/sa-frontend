interface Window {
  electron: {
    send: (channel: string, ...args: unknown[]) => void,
    on: (channel: string, func: (...args: unknown[]) => void) => (() => void)
  };
}

declare const IS_PWA: boolean;
