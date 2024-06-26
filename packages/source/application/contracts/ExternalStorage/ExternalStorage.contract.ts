export interface ExternalStorage {
  get: (name: string) => unknown;
  set: (name: string, value: unknown) => void;
  remove: (name: string) => void;
};
