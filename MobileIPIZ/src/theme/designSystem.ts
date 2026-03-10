/**
 * Design System - Paleta de Cores
 * Baseado em Design System Moderno, Minimalista e Futurístico
 * 
 * Tipografia: Inter / Geist
 * Spacing: 4px grid
 * Radius: Suave com 12px
 */

const palette = {
  // Cores Primárias - Gradiente Futurístico
  primary: {
    50: '#f0f7ff',
    100: '#e0efff',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3c5e',
    main: '#0ea5e9', // Same as 500
  },

  // Cores Secundárias - Accent (Gradiente Ciano/Violeta)
  accent: {
    50: '#f0f4ff',
    100: '#e6efff',
    200: '#d0deff',
    300: '#b0c4ff',
    400: '#7c8fff',
    500: '#6366f1', // Indigo
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Neutros - Cinzentos minimalistas
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Estados Semânticos
  success: {
    light: '#d1fae5',
    main: '#10b981',
    dark: '#047857',
  },
  warning: {
    light: '#fef3c7',
    main: '#f59e0b',
    dark: '#d97706',
  },
  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#dc2626',
  },
  info: {
    light: '#dbeafe',
    main: '#3b82f6',
    dark: '#1d4ed8',
  },

  // Utilitários
  white: '#ffffff',
  black: '#0a0a0a',
  transparent: 'transparent',
} as const;

// Componha o tema final
export const lightTheme = {
  palette,
  background: {
    primary: palette.neutral[0], // Branco
    secondary: palette.neutral[50], // Cinzento muito claro
    tertiary: palette.neutral[100], // Cinzento claro
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: palette.neutral[200],
  },
  text: {
    primary: palette.neutral[950], // Preto
    secondary: palette.neutral[700], // Cinzento escuro
    tertiary: palette.neutral[500], // Cinzento médio
    disabled: palette.neutral[400],
    inverse: palette.white,
    link: palette.primary[600],
  },
  border: {
    light: palette.neutral[200],
    medium: palette.neutral[300],
    dark: palette.neutral[400],
  },
  shadow: {
    xs: 'rgba(0, 0, 0, 0.05)',
    sm: 'rgba(0, 0, 0, 0.1)',
    md: 'rgba(0, 0, 0, 0.15)',
    lg: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

export const darkTheme = {
  palette,
  background: {
    primary: palette.neutral[950], // Preto
    secondary: palette.neutral[900], // Cinzento muito escuro
    tertiary: palette.neutral[800], // Cinzento escuro
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: palette.neutral[800],
  },
  text: {
    primary: palette.neutral[50], // Branco claro
    secondary: palette.neutral[300], // Cinzento claro
    tertiary: palette.neutral[500], // Cinzento médio
    disabled: palette.neutral[600],
    inverse: palette.neutral[950],
    link: palette.primary[400],
  },
  border: {
    light: palette.neutral[800],
    medium: palette.neutral[700],
    dark: palette.neutral[600],
  },
  shadow: {
    xs: 'rgba(0, 0, 0, 0.3)',
    sm: 'rgba(0, 0, 0, 0.4)',
    md: 'rgba(0, 0, 0, 0.5)',
    lg: 'rgba(0, 0, 0, 0.6)',
  },
} as const;

export type AppTheme = typeof lightTheme;
export type ColorScheme = 'light' | 'dark';
