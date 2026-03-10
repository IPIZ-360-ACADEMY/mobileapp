import type { Theme } from '../types/theme.types';
import { colors } from './colors';
import { spacing, borderRadius, fontSize, fontWeight, shadows } from './spacing';
import { typography, textHierarchy } from './typography';

export const theme: Theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
};

export { colors, spacing, borderRadius, fontSize, fontWeight, shadows, typography, textHierarchy };
