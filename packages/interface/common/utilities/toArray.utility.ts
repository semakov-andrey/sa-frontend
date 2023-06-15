import { isexists } from '@sa-frontend/application/utilities/typeGuards.utility';

export const toArray = (children?: OneOrMore<EntireElement>): Array<ExistElement> =>
  (Array.isArray(children) ? children : [ children ])
    .filter((children?: EntireElement): children is ExistElement => isexists(children));
