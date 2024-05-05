import React from 'react';

import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { cn } from '@sa-frontend/presentation/common/utilities/cn.utility';

import { css } from './Text.styles.css';
import { type TextProps } from './Text.types';

export const Text = (
  props: TextProps
): JSX.Element => {
  const {
    className,
    style,
    font: {
      name,
      metrics: { emSquare, capHeight, ascender, descender },
      checkAlignment
    },
    lineHeight,
    children
  } = props;

  const computedFontSize = 'fontSize' in props
    ? props.fontSize
    : emSquare * props.capHeight / capHeight;
  const computedCapHeight = 'capHeight' in props
    ? props.capHeight
    : props.fontSize * capHeight / emSquare;
  const marginBottom = (ascender - capHeight - descender) * computedFontSize / emSquare / 2;
  const marginTop = marginBottom * -1;
  const isAlignment = checkAlignment?.(marginTop) ?? true;

  return (
    <div
      className={ cn(css.text, className) }
      style={ {
        ...style,
        '--font-family': name,
        '--font-size': `${ computedFontSize }px`,
        '--cap-height': `${ computedCapHeight }px`,
        '--line-height': isset(lineHeight) ? `${ lineHeight }px` : 'inherit',
        '--margin-top': `${ isAlignment ? marginTop : 0 }px`,
        '--margin-bottom': `${ isAlignment ? marginBottom : 0 }px`
      } }
    >
      { children }
    </div>
  );
};
