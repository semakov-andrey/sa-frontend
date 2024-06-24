import { isEmptyString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useInfluence } from '../../common/hooks/useInfluence.hook';
import { useHistory } from '../Router/Router.hooks/useHistory.hook/useHistory.hook';
import { useRoute } from '../Router/Router.hooks/useRoute.hook';

export interface RedirectProps {
  to: string;
}

export const Redirect = (props: RedirectProps): null => {
  const { to } = props;
  const history = useHistory();
  const route = useRoute();

  useInfluence(() => {
    if (isEmptyString(route)) history.push(to);
  }, [ to, history, route ]);

  return null;
};
