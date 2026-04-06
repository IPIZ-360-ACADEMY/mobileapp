import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useAppTheme } from '../theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyStrong' | 'caption' | 'label';
type Tone = 'default' | 'muted' | 'primary' | 'error' | 'success' | 'inverse';

type AppTextProps = TextProps & {
  variant?: Variant;
  tone?: Tone;
};

export const AppText = React.memo(function AppText({
  variant = 'body',
  tone = 'default',
  style,
  ...rest
}: AppTextProps): React.JSX.Element {
  const theme = useAppTheme();

  const colorMap: Record<Tone, string> = {
    default: theme.colors.text,
    muted: theme.colors.textMuted,
    primary: theme.colors.primary,
    error: theme.colors.error,
    success: theme.colors.success,
    inverse: theme.colors.surface,
  };

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        theme.typography[variant],
        { color: colorMap[tone] },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
