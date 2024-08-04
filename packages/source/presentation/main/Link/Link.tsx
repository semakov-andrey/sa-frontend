import React from 'react';

import { useEvent } from '../../common/hooks/useEvent.hook';
import { cn } from '../../common/utilities/cn.utility';
import { useHistory } from '../Router/Router.hooks/useHistory.hook/useHistory.hook';

import { css } from './Link.styles.css';

export interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  to: string;
  className?: string;
  children: OneOrMore<EntireElement | OneOrMore<EntireElement>>;
  disabled?: boolean;
}

export const Link = (props: LinkProps): JSX.Element => {
  const { to: href, className, children, disabled = false, ...restProps } = props;

  const history = useHistory();

  const onClick = useEvent((event: React.MouseEvent) => {
    event.preventDefault();
    history.push(href);
  });

  const cnDisabled = disabled ? css.disabled : undefined;

  return (
    <a
      { ...restProps }
      { ...!disabled ? { href, onClick } : {} }
      className={ cn(className, cnDisabled) }
      rel="noreferrer"
    >
      { children }
    </a>
  );
};
