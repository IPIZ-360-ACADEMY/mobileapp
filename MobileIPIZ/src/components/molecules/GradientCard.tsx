/**
 * IPIZ Mobile App - Gradient Card Component
 * Professional card with blue-to-teal gradient background
 * Used for headers and accent sections
 */

import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  padding?: number | string;
  rounded?: boolean;
  shadow?: boolean;
  className?: string;
}

/**
 * Gradient Card Component
 * Provides professional gradient background (blue to teal)
 * @example
 * <GradientCard>
 *   <Text className="text-white text-lg font-bold">Welcome</Text>
 * </GradientCard>
 */
export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  variant = 'primary',
  padding = 'p-6',
  rounded = true,
  shadow = true,
  className = '',
  ...props
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#1E3A8A', '#0D7377']; // Dark Blue to Teal
      case 'secondary':
        return ['#0EA5E9', '#14B8A6']; // Light Blue to Light Teal
      case 'light':
        return ['#38BDF8', '#2DD4BF']; // Sky to Teal
      default:
        return ['#1E3A8A', '#0D7377'];
    }
  };

  const shadowClass = shadow ? 'shadow-lg' : '';
  const roundedClass = rounded ? 'rounded-xl' : 'rounded-lg';

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`${padding} ${roundedClass} ${shadowClass} ${className} overflow-hidden`}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientCard;
