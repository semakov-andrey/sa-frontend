import 'react';
import CSS from 'csstype';

declare module 'react' {
  interface CSSProperties extends CSS.Properties<string | number> {
    [key: `--${ string }`]: Optional<string | number>;
  }
}
