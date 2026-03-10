import React from 'react';
import {
  Pressable,
  type PressableProps,
  ActivityIndicator,
} from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Text } from './Text';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<typeof Pressable, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon,
      fullWidth = false,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useAppTheme();

    const sizeMap = {
      sm: { paddingV: 8, paddingH: 16, fontSize: 14 },
      md: { paddingV: 12, paddingH: 24, fontSize: 16 },
      lg: { paddingV: 16, paddingH: 32, fontSize: 18 },
    };

    const sizing = sizeMap[size];

    const variantStyles = {
      solid: {
        bg: theme.palette.primary[600],
        textColor: 'white' as const,
        pressedBg: theme.palette.primary[700],
        borderColor: 'transparent',
      },
      outline: {
        bg: 'transparent',
        textColor: 'primary' as const,
        pressedBg: theme.palette.primary[50],
        borderColor: theme.palette.primary[200],
      },
      ghost: {
        bg: 'transparent',
        textColor: 'primary' as const,
        pressedBg: theme.palette.neutral[100],
        borderColor: 'transparent',
      },
    };

    const variantStyle = variantStyles[variant];

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled || isLoading}
        style={({ pressed }) => ({
          backgroundColor: pressed ? variantStyle.pressedBg : variantStyle.bg,
          borderColor: variantStyle.borderColor,
          borderWidth: variant === 'outline' ? 1 : 0,
          paddingVertical: sizing.paddingV,
          paddingHorizontal: sizing.paddingH,
          borderRadius: 12,
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : 'auto',
          flexDirection: 'row' as const,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          gap: 8,
          ...(style as any),
        })}
        {...props}
      >
        {isLoading && <ActivityIndicator color={variantStyle.textColor} />}
        {!isLoading && icon && icon}
        <Text
          variant={size === 'lg' ? 'body' : 'bodySmall'}
          color={variantStyle.textColor}
          weight="600"
        >
          {children}
        </Text>
      </Pressable>
    );
  },
);

Button.displayName = 'Button';
