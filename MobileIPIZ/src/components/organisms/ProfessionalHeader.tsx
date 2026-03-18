/**
 * IPIZ Mobile App - Professional Header Component
 * Modern header with gradient background and branding
 */

import React from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  SafeAreaView,
  ViewProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfessionalHeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'primary' | 'secondary' | 'light';
  avatar?: React.ReactNode;
  showDivider?: boolean;
  className?: string;
}

/**
 * Professional Header Component
 * Modern header with gradient and professional layout
 * @example
 * <ProfessionalHeader
 *   title="Bem-vindo"
 *   subtitle="João Silva"
 *   rightIcon={<MenuIcon />}
 * />
 */
export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'primary',
  avatar,
  showDivider = true,
  className = '',
  ...props
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return ['#0D7377', '#0F766E'];
      case 'light':
        return ['#0EA5E9', '#14B8A6'];
      case 'primary':
      default:
        return ['#1E3A8A', '#0D7377'];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors() as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="pb-6"
    >
      <SafeAreaView className={`px-6 pt-2 ${className}`} {...props}>
        {/* Header Content */}
        <View className="flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <View className="flex-row items-center gap-3 flex-1">
            {leftIcon && (
              <TouchableOpacity
                onPress={onLeftPress}
                activeOpacity={0.7}
                className="p-2"
              >
                {leftIcon}
              </TouchableOpacity>
            )}

            {avatar && (
              <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                {avatar}
              </View>
            )}

            {/* Texts */}
            <View className="flex-1">
              <RNText className="text-lg font-bold text-white">
                {title}
              </RNText>
              {subtitle && (
                <RNText className="text-sm text-sky-100 font-medium">
                  {subtitle}
                </RNText>
              )}
            </View>
          </View>

          {/* Right Section */}
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              activeOpacity={0.7}
              className="p-2"
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        {showDivider && (
          <View className="h-px bg-sky-200 opacity-30 mt-4" />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfessionalHeader;
