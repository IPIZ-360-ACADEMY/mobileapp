export interface Colors {
  primary: Record<string, string>;
  secondary: Record<string, string>;
  success: { light: string; main: string; dark: string };
  warning: { light: string; main: string; dark: string };
  error: { light: string; main: string; dark: string };
  neutral: Record<string, string>;
  background: {
    default: string;
    paper: string;
    dark: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled?: string;
    hint?: string;
  };
  white: string;
  black: string;
  gray: Record<string, string>;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface FontSize {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
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
