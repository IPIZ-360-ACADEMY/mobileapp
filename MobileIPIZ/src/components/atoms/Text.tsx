// IPIZ Mobile App - Atomic Text Component
// Typography component following design system

import React, { FC } from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

type TextVariant = 'title' | 'sectionTitle' | 'subtitle' | 'body' | 'caption';
type TextColor = 'primary' | 'secondary' | 'inverse' | 'muted' | 'error' | 'success';

interface Props {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle;
  numberOfLines?: number;
  center?: boolean;
}

export const Text: FC<Props> = ({
  children,
  variant = 'body',
  color = 'primary',
  style,
  numberOfLines,
  center = false,
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'sectionTitle':
        return styles.sectionTitle;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'body':
      default:
        return styles.body;
    }
  };

  const { colors } = useTheme();
  const getColorStyle = (): TextStyle => {
    switch (color) {
      case 'primary':
        return { color: colors.text.primary };
      case 'secondary':
        return { color: colors.text.secondary };
      case 'inverse':
        return { color: colors.text.inverse };
      case 'muted':
        return { color: colors.text.muted };
      case 'error':
        return { color: colors.error.main };
      case 'success':
        return { color: colors.success.main };
      default:
        return { color: colors.text.primary };
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        getColorStyle(),
        center && styles.center,
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  center: {
    textAlign: 'center',
  },
});

export default Text;

