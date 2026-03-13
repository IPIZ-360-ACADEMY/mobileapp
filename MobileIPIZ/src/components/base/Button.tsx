/**
 * IPIZ Mobile App - Professional Button Component
 * Modern button with multiple variants, sizes, and states
 * Tailwind CSS + NativeWind
 */

import React from 'react';
import {
  Pressable,
  type PressableProps,
  ActivityIndicator,
  View,
  Text as RNText,
} from 'react-native';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'warning'
  | 'error'
  | 'accent';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: boolean;
  className?: string;
}

/**
 * Professional Button Component
 * @example
 * <Button variant="primary" size="lg" fullWidth>
 *   Entrar
 * </Button>
 */
export const Button = React.forwardRef<typeof Pressable, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      rounded = false,
      className = '',
      style,
      ...props
    },
    ref,
  ) => {
    // Size classes mapping
    const getSizeClasses = (): string => {
      const sizeMap: Record<ButtonSize, string> = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
        xl: 'px-8 py-5 text-xl',
      };
      return sizeMap[size] || sizeMap.md;
    };

    // Modern variant styling based on design system
    const getVariantClasses = (): string => {
      const baseClasses = 'font-semibold rounded-lg transition-all duration-200';

      const variantMap: Record<ButtonVariant, string> = {
        // Primary Solid (Blue → Teal gradient)
        primary:
          'bg-sky-600 active:bg-sky-700 text-white shadow-md active:shadow-sm',
        // Secondary Solid (Teal)
        secondary:
          'bg-teal-600 active:bg-teal-700 text-white shadow-md active:shadow-sm',
        // Tertiary with subtle background
        tertiary:
          'bg-sky-50 active:bg-sky-100 text-sky-700 border border-sky-200',
        // Outline variant
        outline:
          'bg-transparent text-sky-600 border-2 border-sky-200 active:bg-sky-50',
        // Ghost (no background)
        ghost:
          'bg-transparent text-sky-600 active:bg-sky-50 border border-transparent',
        // Semantic success
        success:
          'bg-emerald-600 active:bg-emerald-700 text-white shadow-md active:shadow-sm',
        // Semantic warning
        warning:
          'bg-amber-600 active:bg-amber-700 text-white shadow-md active:shadow-sm',
        // Semantic error
        error:
          'bg-red-600 active:bg-red-700 text-white shadow-md active:shadow-sm',
        // Accent (Orange for CTAs)
        accent:
          'bg-orange-600 active:bg-orange-700 text-white shadow-md active:shadow-sm',
      };

      return `${baseClasses} ${variantMap[variant] || variantMap.primary}`;
    };

    // State classes mapping
    const getStateClasses = (): string => {
      if (disabled || isLoading) {
        return 'opacity-60';
      }
      return '';
    };

    // Layout classes
    const getLayoutClasses = (): string => {
      const base = 'flex flex-row items-center justify-center gap-2';
      return fullWidth ? `${base} w-full` : base;
    };

    // Border radius classes
    const getBorderRadiusClasses = (): string => {
      return rounded ? 'rounded-full' : 'rounded-lg';
    };

    // Combine all classes
    const combinedClasses = [
      getSizeClasses(),
      getVariantClasses(),
      getStateClasses(),
      getLayoutClasses(),
      getBorderRadiusClasses(),
      className,
    ].filter(Boolean).join(' ');

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled || isLoading}
        className={combinedClasses}
        style={style}
        {...props}
      >
        <View className="flex-row items-center justify-center gap-2">
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={
                variant === 'outline' || variant === 'ghost' || variant === 'tertiary'
                  ? '#0369A1'
                  : '#FFFFFF'
              }
            />
          )}

          {!isLoading && icon && iconPosition === 'left' && icon}

          {!isLoading && typeof children === 'string' ? (
            <RNText className="font-semibold">{children}</RNText>
          ) : (
            !isLoading && children
          )}

          {!isLoading && icon && iconPosition === 'right' && icon}
        </View>
      </Pressable>
    );
  },
);

// Export convenience button components
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="outline" />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="ghost" />
);

export const SuccessButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="success" />
);

export const WarningButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="warning" />
);

export const ErrorButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="error" />
);

export const GradientButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="gradient" />
);

Button.displayName = 'Button';
