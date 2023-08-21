import { isTypeObject, isexists } from '@sa-frontend/application/utilities/typeGuards.utilities';

export const toJSXArray = (children?: OneOrMore<EntireElement>): Array<JSX.Element> =>
  (Array.isArray(children) ? children : [ children ])
    .filter((children?: EntireElement): children is JSX.Element =>
      isexists(children) && isTypeObject(children));
