import { isexists } from '@sa-frontend/application/utilities/typeGuards.utilities';

export const toArray = (children?: OneOrMore<EntireElement>): ExistElement[] =>
  (Array.isArray(children) ? children : [ children ])
    .filter((children?: EntireElement): children is ExistElement => isexists(children));
