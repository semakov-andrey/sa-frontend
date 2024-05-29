import { useInfluence } from '../../common/hooks/useInfluence.hook';
import { useHistory } from '../Router/Router.hooks/useHistory.hook/useHistory.hook';

export interface RedirectProps {
  to: string;
}

export const Redirect = (props: RedirectProps): null => {
  const { to } = props;
  const history = useHistory();

  useInfluence(() => {
    history.push(to);
  }, [ to, history ]);

  return null;
};
