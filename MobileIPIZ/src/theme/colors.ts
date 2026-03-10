// IPIZ Mobile App Theme
// Design System based on modern minimalistic UI

// IPIZ Mobile App Theme
// Design System based on modern minimalistic UI

export const colors = {
  // Light Background
  light: '#E9E5E8',
  
  // Dark Background
  dark: '#464444',
  
  // Primary Accent
  primary: '#F8F692',
  
  // Primary Shades (for components that need specific shades)
  primaryShades: {
    50: '#FDFDE7',
    100: '#FBFBC3',
    200: '#F8F992',
    300: '#F6F662',
    400: '#F4F43D',
    500: '#F2F223',
    600: '#D4D41E',
    700: '#B8B71A',
    800: '#9B9916',
    900: '#7E7C12',
  },
  
  // Navigation Colors
  nav: {
    active: '#F8F692',
    inactive: '#B0B0B0',
    background: '#464444',
  },
  
  // Neutral palette
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Semantic colors
  success: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#2E7D32',
  },
  warning: {
    light: '#FFD54F',
    main: '#FFC107',
    dark: '#F57C00',
  },
  error: {
    light: '#EF9A9A',
    main: '#F44336',
    dark: '#C62828',
  },
  info: {
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1565C0',
  },
  
  // Background colors
  background: {
    default: '#E9E5E8',
    paper: '#FFFFFF',
    dark: '#464444',
    card: '#FFFFFF',
    overlay: 'rgba(70, 68, 68, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#616161',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
    inverse: '#FFFFFF',
    muted: '#757575',
  },
  
  // Border colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#424242',
  },
  
  // Shadow
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
  
  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Overlay for modals
  backdrop: 'rgba(0, 0, 0, 0.5)',
} as const;

// Type exports for theme
export type Colors = typeof colors;

// A lightweight fallback that mirrors the full Colors type.  It is always
// safe to use this object when the real theme file fails to load or while
// tests/mock environments are running.  We intentionally specify the full
// Colors type so the compiler can help keep it in sync with the real theme.
export const fallbackColors: Colors = {
  // keep the same values as the default `colors` above; if you change one,
  // change the other.  In practice the fallback will rarely be used, but
  // having the full shape prevents runtime "property does not exist" bugs.
  ...colors,
};
