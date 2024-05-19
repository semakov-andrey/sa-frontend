interface Window {
  electron: {
    send: (channel: string, ...args: unknown[]) => void,
    on: (channel: string, func: (...args: unknown[]) => void) => (() => void)
  };
}
