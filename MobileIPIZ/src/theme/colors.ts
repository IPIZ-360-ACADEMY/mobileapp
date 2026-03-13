/**
 * IPIZ Mobile App - Design System Colors
 * Professional color palette inspired by the design mockups
 * Gradient: Dark Blue → Teal/Turquoise
 */

export const colors = {
  // Primary Palette (Blue → Teal Gradient)
  primary: {
    50: '#F0F8FF',
    100: '#E0F2FE',
    200: '#BAE6FE',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C2D6B',
  },

  // Teal/Accent Palette
  teal: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EE7DF',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#134E4A',
    900: '#0F2F2E',
  },

  // Secondary (Gradient endpoint - darker teal)
  secondary: '#0D7377',

  // Accent (Orange for CTAs)
  accent: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // Navigation
  nav: {
    active: '#14B8A6',
    inactive: '#94A3B8',
    background: '#1E3A8A',
  },

  // Neutral Palette (Grey scale)
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Semantic colors
  success: {
    light: '#86EFAC',
    main: '#22C55E',
    dark: '#15803D',
  },
  warning: {
    light: '#FCD34D',
    main: '#EAB308',
    dark: '#CA8A04',
  },
  error: {
    light: '#FCA5A5',
    main: '#EF4444',
    dark: '#DC2626',
  },
  info: {
    light: '#93C5FD',
    main: '#3B82F6',
    dark: '#1D4ED8',
  },

  // Background colors
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    light: '#F1F5F9',
    card: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.5)',
  },

  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    disabled: '#CBD5E1',
    hint: '#94A3B8',
    inverse: '#FFFFFF',
    muted: '#64748B',
  },

  // Border colors
  border: {
    light: '#E2E8F0',
    medium: '#CBD5E1',
    dark: '#475569',
  },

  // Gradient definitions
  gradient: {
    primary: ['#1E3A8A', '#0D7377'],
    light: ['#0EA5E9', '#14B8A6'],
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
