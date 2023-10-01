import { useEffect } from 'react';

import { useHistory } from '../Router/Router.hooks/useHistory.hook';

export interface RedirectProps {
  to: string;
}

export const Redirect = (props: RedirectProps): null => {
  const { to } = props;
  const history = useHistory();

  useEffect(() => {
    history.push(to);
  }, [ to, history ]);

  return null;
};
