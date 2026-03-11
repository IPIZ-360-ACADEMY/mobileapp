// IPIZ Mobile App - Molecule NotificationCard Component with Tailwind CSS
// Card component for displaying notifications

import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { Box } from '../base/Box';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Props {
  title: string;
  message: string;
  type?: NotificationType;
  time?: string;
  onPress?: () => void;
  isRead?: boolean;
  showBorder?: boolean;
}

const typeIcons: Record<NotificationType, string> = {
  info: 'announcement',
  success: 'check',
  warning: 'warning',
  error: 'error',
};

const typeColors: Record<NotificationType, { bg: string; text: string; border: string }> = {
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500',
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500',
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-500',
  },
  error: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500',
  },
};

export const NotificationCard: FC<Props> = ({
  title,
  message,
  type = 'info',
  time,
  onPress,
  isRead = false,
  showBorder = true,
}) => {
  const { isDark } = useTheme();
  const colors = typeColors[type];
  const iconName = typeIcons[type] as any;

  const cardClasses = `
    flex-row p-4 rounded-xl mb-2 active:scale-95 active:opacity-90
    bg-white dark:bg-gray-900
    ${showBorder ? 'border border-gray-200 dark:border-gray-700' : ''}
    ${!isRead ? `border-l-4 ${colors.border} ${colors.bg}` : ''}
  `;

  const iconContainerClasses = `
    w-11 h-11 rounded-full items-center justify-center mr-3
    ${colors.bg}
  `;

  return (
    <Pressable onPress={onPress} className={cardClasses}>
      <Box className={iconContainerClasses}>
        <Icon name={iconName} size="md" className={colors.text} />
      </Box>

      <Box className="flex-1">
        <Box className="flex-row items-center justify-between mb-1">
          <Text
            variant="body"
            weight="semibold"
            className="text-gray-900 dark:text-white flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>
          {!isRead && (
            <Box className="w-2 h-2 rounded-full bg-blue-500 ml-2" />
          )}
        </Box>

        <Text
          variant="body-small"
          className="text-gray-600 dark:text-gray-300"
          numberOfLines={2}
        >
          {message}
        </Text>

        {time && (
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-400 mt-2"
          >
            {time}
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default NotificationCard;

