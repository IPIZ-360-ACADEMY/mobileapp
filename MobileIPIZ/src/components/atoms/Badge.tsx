// IPIZ Mobile App - Atomic Badge Component
// Status badge for notifications and indicators

import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface Props {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const sizeMap: Record<BadgeSize, { paddingH: number; paddingV: number; fontSize: number }> = {
  sm: { paddingH: 6, paddingV: 2, fontSize: 10 },
  md: { paddingH: 8, paddingV: 4, fontSize: 12 },
};

export const Badge: FC<Props> = ({ 
  label, 
  variant = 'primary',
  size = 'md'
}) => {
  const { colors } = useTheme();
  const variantStyles = ((): { bg: string; text: string } => {
    switch (variant) {
      case 'success': return { bg: colors.success.light + '30', text: colors.success.dark };
      case 'warning': return { bg: colors.warning.light + '30', text: colors.warning.dark };
      case 'error': return { bg: colors.error.light + '30', text: colors.error.dark };
      case 'info': return { bg: colors.info.light + '30', text: colors.info.dark };
      case 'neutral': return { bg: colors.neutral[200], text: colors.neutral[700] };
      case 'primary':
      default:
        return { bg: colors.primary + '20', text: colors.dark };
    }
  })();

  const sizeStyles = sizeMap[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.bg,
          paddingHorizontal: sizeStyles.paddingH,
          paddingVertical: sizeStyles.paddingV,
        },
      ]}
    >
      <Text style={[styles.text, { color: variantStyles.text, fontSize: sizeStyles.fontSize }]}> {label} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default Badge;

