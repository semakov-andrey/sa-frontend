import { type CSSProperties } from 'react';

export type TextProps = TextCommonProps & (TextPropsWithFontSize | TextPropsWithCapHeight);

export interface TextCommonProps {
  className?: string;
  style?: CSSProperties;
  font: FontConfig;
  lineHeight?: number;
  children: string;
}

export interface TextPropsWithFontSize {
  fontSize: number;
}

export interface TextPropsWithCapHeight {
  capHeight: number;
}

export interface FontConfig {
  name: string;
  metrics: FontMetrics;
  checkAlignment?: (marginTop: number) => boolean;
}

export interface FontMetrics {
  emSquare: number;
  capHeight: number;
  ascender: number;
  descender: number;
}
