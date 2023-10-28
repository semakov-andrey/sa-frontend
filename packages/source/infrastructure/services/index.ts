import { iocInstance } from '@sa-frontend/application/components/IoCInstance/IoCInstance';
import { externalStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';

import { LocalStorage } from './LocalStorage/LocalStorage.service';

iocInstance.set(externalStorageUnique, new LocalStorage());

