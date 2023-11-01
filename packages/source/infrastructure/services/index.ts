import { iocInstance } from '@sa-frontend/application/components/IoCInstance/IoCInstance';
import { localStorageUnique, sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';

import { LocalStorage } from './LocalStorage/LocalStorage.service';
import { SessionStorage } from './SessionStorage/SessionStorage.service';

iocInstance.set(localStorageUnique, new LocalStorage());
iocInstance.set(sessionStorageUnique, new SessionStorage());

