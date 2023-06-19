type EntireElement = OneOrMore<JSX.Element | string | number | null | undefined>;

type ExistElement = OneOrMore<JSX.Element | string | number>;

interface SvgIconProps {
  className?: string;
  style?: React.CSSProperties;
}