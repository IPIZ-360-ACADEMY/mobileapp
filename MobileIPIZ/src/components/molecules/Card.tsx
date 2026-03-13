/**
 * IPIZ Mobile App - Professional Card Component
 * Reusable card container with clean styling and shadow
 */

import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: string;
  rounded?: boolean;
  className?: string;
  onPress?: () => void;
}

/**
 * Card Component
 * Professional card container for content
 * @example
 * <Card variant="elevated">
 *   <Text className="text-lg font-semibold">Card Title</Text>
 *   <Text className="text-gray-600">Card content</Text>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'p-4',
  rounded = true,
  className = '',
  onPress,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return 'bg-white border border-slate-200';
      case 'elevated':
        return 'bg-white shadow-md';
      case 'default':
      default:
        return 'bg-white shadow-sm';
    }
  };

  const roundedClass = rounded ? 'rounded-xl' : 'rounded-lg';

  const baseClasses = `${getVariantClasses()} ${padding} ${roundedClass} ${className}`;

  return (
    <View
      className={baseClasses}
      style={onPress ? { cursor: 'pointer' } : {}}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
