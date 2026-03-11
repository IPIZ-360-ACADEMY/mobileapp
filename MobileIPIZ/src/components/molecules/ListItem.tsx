// IPIZ Mobile App - Molecule ListItem Component with Tailwind CSS
// Reusable list item with icon, title, subtitle, and chevron

import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';
import { Box } from '../base/Box';

interface Props {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  showChevron?: boolean;
  badge?: string;
  variant?: 'default' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const ListItem: FC<Props> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  showChevron = true,
  badge,
  variant = 'default',
  size = 'md',
  disabled = false,
}) => {
  const { isDark } = useTheme();

  // Classes base
  const baseClasses = `
    flex-row items-center rounded-xl mb-2
    ${disabled ? 'opacity-60' : ''}
  `;

  // Classes de variante
  const variantClasses = {
    default: `
      bg-white dark:bg-gray-900
      ${onPress ? 'active:bg-gray-50 dark:active:bg-gray-800' : ''}
    `,
    bordered: `
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-700
      ${onPress ? 'active:border-gray-300 dark:active:border-gray-600' : ''}
    `,
    ghost: `
      bg-transparent
      ${onPress ? 'active:bg-gray-100 dark:active:bg-gray-800' : ''}
    `,
  };

  // Classes de tamanho
  const sizeClasses = {
    sm: 'py-3 px-4 gap-3',
    md: 'py-4 px-5 gap-4',
    lg: 'py-5 px-6 gap-5',
  };

  // Classes do ícone esquerdo
  const leftIconClasses = `
    w-10 h-10 rounded-full items-center justify-center
    bg-gray-100 dark:bg-gray-800
  `;

  // Classes do badge
  const badgeClasses = `
    px-2 py-1 rounded-md
    bg-blue-100 dark:bg-blue-900/30
    ${isDark ? 'text-blue-300' : 'text-blue-800'}
  `;

  const content = (
    <Box className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {leftIcon && (
        <Box className={leftIconClasses}>
          <Icon
            name={leftIcon as any}
            size="md"
            className="text-gray-600 dark:text-gray-400"
          />
        </Box>
      )}

      <Box className="flex-1">
        <Box className="flex-row items-center justify-between">
          <Text
            variant="body"
            weight="medium"
            className="text-gray-900 dark:text-white flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>
          {badge && (
            <Box className={badgeClasses}>
              <Text variant="caption" weight="medium">
                {badge}
              </Text>
            </Box>
          )}
        </Box>
        {subtitle && (
          <Text
            variant="body-small"
            className="text-gray-600 dark:text-gray-400 mt-1"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </Box>

      {rightIcon && (
        <Icon
          name={rightIcon as any}
          size="md"
          className="text-gray-500 dark:text-gray-400"
        />
      )}

      {showChevron && !rightIcon && (
        <Icon
          name="chevron-right"
          size="sm"
          className="text-gray-400 dark:text-gray-500"
        />
      )}
    </Box>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} className="active:scale-95 active:opacity-90">
        {content}
      </Pressable>
    );
  }

  return content;
};

export default ListItem;

