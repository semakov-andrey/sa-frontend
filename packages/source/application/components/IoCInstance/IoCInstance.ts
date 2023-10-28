import { IoCContainer } from '@sa-frontend/application/components/IoCContainer/IoCContainer';

import type { externalStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import type { ExternalStorage } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.contract';

export interface IoCInstances {
  [externalStorageUnique]: ExternalStorage;
}

export const iocInstance = new IoCContainer<IoCInstances>();
