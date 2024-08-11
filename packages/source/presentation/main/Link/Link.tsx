import React from 'react';

import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../common/hooks/useEvent.hook';
import { cn } from '../../common/utilities/cn.utility';
import { useHistory } from '../Router/Router.hooks/useHistory.hook/useHistory.hook';

import { css } from './Link.styles.css';

export interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  to: string;
  className?: string;
  children: OneOrMore<EntireElement | OneOrMore<EntireElement>>;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const Link = (props: LinkProps): JSX.Element => {
  const {
    to: href,
    className,
    children,
    disabled = false,
    onClick: externalOnClick,
    ...restProps
  } = props;

  const history = useHistory();

  const onClick = useEvent((event: React.MouseEvent) => {
    event.preventDefault();
    if (!isset(externalOnClick)) history.push(href);
    else externalOnClick(event);
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
