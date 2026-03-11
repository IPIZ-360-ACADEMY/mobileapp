// IPIZ Mobile App - Organism DashboardCard Component with Tailwind CSS
// Card component for dashboard with title, value, and icon

import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { Box } from '../base/Box';

interface Props {
  title: string;
  value?: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const DashboardCard: FC<Props> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  onPress,
  trend,
  variant = 'default',
  size = 'md',
}) => {
  const { isDark } = useTheme();

  // Classes base
  const baseClasses = 'rounded-2xl min-h-24';

  // Classes de variante
  const variantClasses = {
    default: `
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-700
    `,
    elevated: `
      bg-white dark:bg-gray-900
      shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50
      border border-gray-100 dark:border-gray-800
    `,
    outlined: `
      bg-transparent
      border-2 border-gray-300 dark:border-gray-600
    `,
    filled: `
      bg-gray-50 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
    `,
  };

  // Classes de tamanho
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  // Classes do ícone
  const iconContainerClasses = `
    w-10 h-10 rounded-xl items-center justify-center mr-3
    ${iconColor ? '' : 'bg-blue-100 dark:bg-blue-900/30'}
  `;

  // Classes da tendência
  const trendClasses = `
    flex-row items-center mt-3
    ${trend?.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
  `;

  const content = (
    <Box className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      <Box className="flex-row items-center mb-3">
        {icon && (
          <Box className={iconContainerClasses} style={iconColor ? { backgroundColor: iconColor + '20' } : {}}>
            <Icon
              name={icon as any}
              size="lg"
              className={iconColor ? '' : 'text-blue-600 dark:text-blue-400'}
              style={iconColor ? { color: iconColor } : {}}
            />
          </Box>
        )}
        <Text
          variant="caption"
          className="text-gray-600 dark:text-gray-400 uppercase tracking-wide"
        >
          {title}
        </Text>
      </Box>

      {value && (
        <Text
          variant="h3"
          weight="bold"
          className="text-gray-900 dark:text-white mb-1"
        >
          {value}
        </Text>
      )}

      {subtitle && (
        <Text
          variant="body-small"
          className="text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </Text>
      )}

      {trend && (
        <Box className={trendClasses}>
          <Icon
            name={trend.isPositive ? 'trending-up' : 'trending-down'}
            size="sm"
          />
          <Text variant="caption" weight="medium" className="ml-1">
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </Text>
        </Box>
      )}
    </Box>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:scale-95 active:opacity-90 rounded-2xl">
        {content}
      </Pressable>
    );
  }

  return content;
};

export default DashboardCard;
