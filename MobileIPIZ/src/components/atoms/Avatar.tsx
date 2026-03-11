// IPIZ Mobile App - Atomic Avatar Component with Tailwind CSS
// User avatar component with fallback to initials

import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { Text } from '../base/Text';
import { useTheme } from '../../hooks/useTheme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarVariant = 'default' | 'bordered' | 'gradient';

interface Props {
  source?: string;
  name?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away';
}

export const Avatar: FC<Props> = ({
  source,
  name = '',
  size = 'md',
  variant = 'default',
  showStatus = false,
  status = 'offline'
}) => {
  const { isDark } = useTheme();

  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0]?.substring(0, 2).toUpperCase() || '?';
  };

  // Classes base
  const baseClasses = 'items-center justify-center rounded-full overflow-hidden';

  // Classes de tamanho
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
  };

  // Classes de variante
  const variantClasses = {
    default: `
      bg-gray-200 dark:bg-gray-700
      ${isDark ? 'text-gray-300' : 'text-gray-600'}
    `,
    bordered: `
      bg-white dark:bg-gray-800
      border-2 border-gray-300 dark:border-gray-600
      ${isDark ? 'text-gray-300' : 'text-gray-700'}
    `,
    gradient: `
      bg-gradient-to-br from-blue-500 to-purple-600
      text-white
    `,
  };

  // Classes do texto (iniciais)
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  // Classes do status indicator
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5',
    sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
    md: 'w-2.5 h-2.5 -bottom-1 -right-1',
    lg: 'w-3 h-3 -bottom-1 -right-1',
    xl: 'w-3.5 h-3.5 -bottom-1.5 -right-1.5',
    '2xl': 'w-4 h-4 -bottom-2 -right-2',
  };

  if (source) {
    return (
      <View className="relative">
        <Image
          source={{ uri: source }}
          className={`${baseClasses} ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700`}
          resizeMode="cover"
        />
        {showStatus && (
          <View className={`absolute rounded-full border border-white dark:border-gray-800 ${statusClasses[status]} ${statusSizeClasses[size]}`} />
        )}
      </View>
    );
  }

  return (
    <View className="relative">
      <View className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
        <Text
          variant="body"
          weight="600"
          className={`${textSizeClasses[size]} text-center`}
        >
          {getInitials(name)}
        </Text>
      </View>
      {showStatus && (
        <View className={`absolute rounded-full border border-white dark:border-gray-800 ${statusClasses[status]} ${statusSizeClasses[size]}`} />
      )}
    </View>
  );
};

export default Avatar;

