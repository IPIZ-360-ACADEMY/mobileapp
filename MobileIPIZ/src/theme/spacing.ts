// IPIZ Mobile App Spacing System
// 8px grid spacing system

import type { Spacing, BorderRadius, FontSize, FontWeight } from '../types/theme.types';

// 8px Grid Spacing System
export const spacing: Spacing = {
  // Base spacing units
  xxs: 2,
  xs: 4,
  sm: 8,    // 8px - base unit
  md: 16,   // 16px - 2 units
  lg: 24,   // 24px - 3 units
  xl: 32,   // 32px - 4 units
  xxl: 48,  // 48px - 6 units
  xxxl: 64, // 64px - 8 units
  
  // Semantic spacing
  screen: 16,
  section: 24,
  card: 16,
  input: 12,
  button: 14,
  listItem: 12,
  header: 16,
  footer: 16,
};

// Border Radius - as per design requirements
export const borderRadius: BorderRadius = {
  none: 0,
  sm: 6,    // small: 6px
  md: 10,   // medium: 10px
  lg: 16,   // large: 16px
  xl: 20,
  xxl: 24,
  full: 9999, // pill shape
  circle: 9999,
};

// Font sizes
export const fontSize: FontSize = {
  xs: 10,
  sm: 12,   // caption
  base: 14, // body
  md: 16,   // subtitle
  lg: 18,
  xl: 20,   // section title
  '2xl': 24, // title
  '3xl': 28,
  '4xl': 32,
};

// Font weights
export const fontWeight: FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Shadow presets
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
