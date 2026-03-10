// IPIZ Mobile App Typography
// Modern font system similar to Inter

import { TextStyle, Platform } from 'react-native';


// Font family configuration
const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
};

// Text styles following the design specifications
export const typography = {
  // Display styles
  displayLarge: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  } as TextStyle,
  
  displayMedium: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
  } as TextStyle,
  
  displaySmall: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  } as TextStyle,
  
  // Heading styles
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  } as TextStyle,
  
  h2: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  } as TextStyle,
  
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  } as TextStyle,
  
  h4: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
  } as TextStyle,
  
  // Body styles
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  } as TextStyle,
  
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  } as TextStyle,
  
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,
  
  // Label styles
  labelLarge: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,
  
  labelMedium: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,
  
  labelSmall: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,
  
  // Caption styles
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,
  
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
  
  // Button text
  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
  
  buttonSmall: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
};

// Text hierarchy constants (as per requirements)
export const textHierarchy = {
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  sectionTitle: {

  }
}
