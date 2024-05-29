import React from 'react';

import { useEvent } from '../../common/hooks/useEvent.hook';
import { useHistory } from '../Router/Router.hooks/useHistory.hook/useHistory.hook';

export interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  to: string;
  children: OneOrMore<EntireElement | OneOrMore<EntireElement>>;
}

export const Link = (props: LinkProps): JSX.Element => {
  const { to, children, ...restProps } = props;

  const history = useHistory();

  const onClick = useEvent((event: React.MouseEvent) => {
    event.preventDefault();
    history.push(to);
  });

  return (
    <a { ...restProps } href={ to } onClick={ onClick } rel="noreferrer">
      { children }
    </a>
  );
};
