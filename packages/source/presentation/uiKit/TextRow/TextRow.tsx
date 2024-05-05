import React from 'react';

import { ALIGNMENTS } from './TextRow.constants';
import { css } from './TextRow.styles.css';

export interface TextRowProps {
  align: 'top' | 'middle' | 'bottom';
  children: EntireElement;
}

export const TextRow = (props: TextRowProps): JSX.Element => {
  const { align, children } = props;

  return (
    <div
      className={ css.textRow }
      style={ {
        '--align-items': ALIGNMENTS[align]
      } }
    >
      { children }
    </div>
  );
};
