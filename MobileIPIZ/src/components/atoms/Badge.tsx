// IPIZ Mobile App - Atomic Badge Component with Tailwind CSS
// Status badge for notifications and indicators

import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '@base/Text';
import { useTheme } from '@hooks/useTheme';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'secondary' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface Props {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  dot?: boolean;
}

export const Badge: FC<Props> = ({
  label,
  variant = 'primary',
  size = 'md',
  rounded = true,
  dot = false
}) => {
  const { isDark } = useTheme();

  // Classes base
  const baseClasses = `
    self-start flex-row items-center justify-center
    ${rounded ? 'rounded-full' : 'rounded-md'}
  `;

  // Classes de variante
  const variantClasses = {
    primary: `
      bg-blue-100 dark:bg-blue-900/30
      ${isDark ? 'text-blue-300' : 'text-blue-800'}
    `,
    secondary: `
      bg-gray-100 dark:bg-gray-800
      ${isDark ? 'text-gray-300' : 'text-gray-700'}
    `,
    success: `
      bg-green-100 dark:bg-green-900/30
      ${isDark ? 'text-green-300' : 'text-green-800'}
    `,
    warning: `
      bg-yellow-100 dark:bg-yellow-900/30
      ${isDark ? 'text-yellow-300' : 'text-yellow-800'}
    `,
    error: `
      bg-red-100 dark:bg-red-900/30
      ${isDark ? 'text-red-300' : 'text-red-800'}
    `,
    info: `
      bg-cyan-100 dark:bg-cyan-900/30
      ${isDark ? 'text-cyan-300' : 'text-cyan-800'}
    `,
    neutral: `
      bg-gray-100 dark:bg-gray-800
      ${isDark ? 'text-gray-300' : 'text-gray-700'}
    `,
    outline: `
      bg-transparent border border-gray-300 dark:border-gray-600
      ${isDark ? 'text-gray-300' : 'text-gray-700'}
    `,
  };

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1.5',
    lg: 'px-4 py-2',
  };

  // Classes do texto
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Classes do dot (se ativado)
  const dotClasses = dot ? `
    w-2 h-2 rounded-full mr-2
    ${variant === 'success' ? 'bg-green-500' :
      variant === 'warning' ? 'bg-yellow-500' :
      variant === 'error' ? 'bg-red-500' :
      variant === 'info' ? 'bg-cyan-500' :
      'bg-blue-500'}
  ` : '';

  return (
    <View className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {dot && <View className={dotClasses} />}
      <Text
        variant="caption"
        weight="600"
        className={`${textSizeClasses[size]} uppercase tracking-wide`}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;

