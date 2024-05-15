import { type ExternalStorage } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.contract';

export class SessionStorage implements ExternalStorage {
  public get = (name: string): unknown => {
    try {
      const value = window.sessionStorage.getItem(name);
      return value !== null ? JSON.parse(value) : undefined;
    } catch {
      return undefined;
    }
  };

  public set = (name: string, value: unknown): void => {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  };
}
