import 'react';
import CSS from 'csstype';

declare module 'react' {
  interface CSSProperties extends CSS.Properties<string | number> {
    [key: `--${ string }`]: Optional<string>;
  }
}

type TEntireElement = OneOrMore<JSX.Element | string | number | null | undefined>;

type TExistElement = OneOrMore<JSX.Element | string | number>;

interface IIconProps {
  className?: string;
  style?: React.CSSProperties;
}
