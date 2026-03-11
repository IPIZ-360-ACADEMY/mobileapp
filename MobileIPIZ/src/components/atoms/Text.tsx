/**
 * IPIZ Mobile App - Atomic Text Component
 * Professional typography component with Tailwind CSS
 */

import React, { FC } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-large'
  | 'body-small'
  | 'caption'
  | 'label'
  | 'button';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

type TextWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface Props {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
  className?: string;
}

export const Text: FC<Props> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  style,
  numberOfLines,
  className = '',
}) => {
  // Variant styles mapping
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'h1':
        return 'text-3xl font-bold';
      case 'h2':
        return 'text-2xl font-semibold';
      case 'h3':
        return 'text-xl font-semibold';
      case 'h4':
        return 'text-lg font-medium';
      case 'body-large':
        return 'text-lg';
      case 'body-small':
        return 'text-sm';
      case 'caption':
        return 'text-xs';
      case 'label':
        return 'text-sm font-medium';
      case 'button':
        return 'text-base font-semibold';
      case 'body':
      default:
        return 'text-base';
    }
  };

  // Color styles mapping
  const getColorClasses = (): string => {
    switch (color) {
      case 'primary':
        return 'text-text-primary';
      case 'secondary':
        return 'text-text-secondary';
      case 'tertiary':
        return 'text-text-tertiary';
      case 'disabled':
        return 'text-text-disabled';
      case 'inverse':
        return 'text-text-inverse';
      case 'accent':
        return 'text-text-accent';
      case 'error':
        return 'text-error-500';
      case 'success':
        return 'text-success-500';
      case 'warning':
        return 'text-warning-500';
      case 'info':
        return 'text-info-500';
      default:
        return 'text-text-primary';
    }
  };

  // Weight styles mapping
  const getWeightClasses = (): string => {
    if (!weight) return '';

    switch (weight) {
      case 'thin':
        return 'font-thin';
      case 'light':
        return 'font-light';
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      case 'extrabold':
        return 'font-extrabold';
      case 'black':
        return 'font-black';
      default:
        return '';
    }
  };

  // Alignment styles mapping
  const getAlignClasses = (): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      case 'left':
      default:
        return 'text-left';
    }
  };

  // Combine all classes
  const combinedClasses = [
    getVariantClasses(),
    getColorClasses(),
    getWeightClasses(),
    getAlignClasses(),
    className,
  ].filter(Boolean).join(' ');

  return (
    <RNText
      className={combinedClasses}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

// Export additional text components for convenience
export const H1: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="h1" />
);

export const H2: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="h2" />
);

export const H3: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="h3" />
);

export const H4: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="h4" />
);

export const Body: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="body" />
);

export const Caption: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="caption" />
);

export const Label: FC<Omit<Props, 'variant'>> = (props) => (
  <Text {...props} variant="label" />
);

export default Text;

