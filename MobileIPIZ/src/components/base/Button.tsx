/**
 * IPIZ Mobile App - Base Button Component
 * Professional button component with Tailwind CSS
 */

import React from 'react';
import {
  Pressable,
  type PressableProps,
  ActivityIndicator,
} from 'react-native';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'warning'
  | 'error'
  | 'gradient';

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
      switch (size) {
        case 'xs':
          return 'px-2 py-1 text-xs';
        case 'sm':
          return 'px-3 py-2 text-sm';
        case 'md':
          return 'px-4 py-3 text-base';
        case 'lg':
          return 'px-6 py-4 text-lg';
        case 'xl':
          return 'px-8 py-5 text-xl';
        default:
          return 'px-4 py-3 text-base';
      }
    };

    // Variant classes mapping
    const getVariantClasses = (): string => {
      const baseClasses = 'font-semibold transition-colors duration-200';

      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 border border-primary-500`;
        case 'secondary':
          return `${baseClasses} bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 border border-secondary-500`;
        case 'outline':
          return `${baseClasses} bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100`;
        case 'ghost':
          return `${baseClasses} bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 border border-transparent`;
        case 'success':
          return `${baseClasses} bg-success-500 text-white hover:bg-success-600 active:bg-success-700 border border-success-500`;
        case 'warning':
          return `${baseClasses} bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 border border-warning-500`;
        case 'error':
          return `${baseClasses} bg-error-500 text-white hover:bg-error-600 active:bg-error-700 border border-error-500`;
        case 'gradient':
          return `${baseClasses} bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 border border-primary-500`;
        default:
          return `${baseClasses} bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 border border-primary-500`;
      }
    };

    // State classes mapping
    const getStateClasses = (): string => {
      if (disabled || isLoading) {
        return 'opacity-50 cursor-not-allowed';
      }
      return 'active:scale-95';
    };

    // Layout classes
    const getLayoutClasses = (): string => {
      const baseLayout = 'flex-row items-center justify-center gap-2';

      if (fullWidth) {
        return `${baseLayout} w-full`;
      }

      return baseLayout;
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
      'shadow-sm active:shadow-md',
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
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? '#0ea5e9' : 'white'}
          />
        )}

        {!isLoading && icon && iconPosition === 'left' && icon}

        {!isLoading && (
          <Pressable className="text-center font-semibold">
            {children}
          </Pressable>
        )}

        {!isLoading && icon && iconPosition === 'right' && icon}
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
