export interface Colors {
  light: string;
  dark: string;
  primary: string;
  nav: {
    active: string;
    inactive: string;
    background: string;
  };
  neutral: Record<string, string>;
  success: { light: string; main: string; dark: string };
  warning: { light: string; main: string; dark: string };
  error: { light: string; main: string; dark: string };
  info: { light: string; main: string; dark: string };
  background: {
    default: string;
    paper: string;
    dark: string;
    card: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled?: string;
    hint?: string;
    inverse: string;
    muted: string;
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  shadow: {
    light: string;
    medium: string;
    dark: string;
  };
  white: string;
  black: string;
  transparent: string;
  backdrop: string;
}

export interface Spacing {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  screen: number;
  section: number;
  card: number;
  input: number;
  button: number;
  listItem: number;
  header: number;
  footer: number;
}

export interface BorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
  circle: number;
}

export interface FontSize {
  xs: number;
  sm: number;
  base: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface FontWeight {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  borderRadius: BorderRadius;
  fontSize: FontSize;
  fontWeight: FontWeight;
}
