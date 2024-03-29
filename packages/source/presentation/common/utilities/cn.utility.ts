import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

export const cn = <T>(...classNames: T[]): string =>
  classNames
    .filter((value: T) => isset(value))
    .join(' ');
