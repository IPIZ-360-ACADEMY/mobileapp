import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../theme';
import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  loading?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export const Button = React.memo(function Button({
  label,
  loading = false,
  disabled,
  variant = 'primary',
  style,
  ...rest
}: ButtonProps): React.JSX.Element {
  const theme = useAppTheme();
  const isDisabled = disabled || loading;

  const variantStyle =
    variant === 'primary'
      ? {
          container: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
          textTone: 'inverse' as const,
        }
      : variant === 'secondary'
      ? {
          container: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          textTone: 'default' as const,
        }
      : {
          container: { backgroundColor: 'transparent', borderColor: 'transparent' },
          textTone: 'primary' as const,
        };

  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: theme.radius.md,
          minHeight: 48,
          borderWidth: 1,
          opacity: isDisabled ? 0.6 : pressed ? 0.88 : 1,
        },
        variantStyle.container,
        style,
      ]}
    >
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={variant === 'primary' ? theme.colors.surface : theme.colors.primary} size="small" />
        </View>
      ) : (
        <AppText variant="label" tone={variantStyle.textTone}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loadingWrap: {
    height: 20,
    justifyContent: 'center',
  },
});
