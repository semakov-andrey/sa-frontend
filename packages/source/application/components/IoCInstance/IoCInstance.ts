import { IoCContainer } from '@sa-frontend/application/components/IoCContainer/IoCContainer';

import type { localStorageUnique, sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import type { ExternalStorage } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.contract';

export interface IoCInstances {
  [localStorageUnique]: ExternalStorage;
  [sessionStorageUnique]: ExternalStorage;
}

export const iocInstance = new IoCContainer<IoCInstances>();
