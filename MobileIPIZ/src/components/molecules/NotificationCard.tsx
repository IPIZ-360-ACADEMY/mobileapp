// IPIZ Mobile App - Molecule NotificationCard Component
// Card component for displaying notifications

import React, { FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Props {
  title: string;
  message: string;
  type?: NotificationType;
  time?: string;
  onPress?: () => void;
  isRead?: boolean;
}

// colors resolved at render time via useTheme

const typeIcons: Record<NotificationType, string> = {
  info: 'announcement',
  success: 'check',
  warning: 'warning',
  error: 'error',
};

export const NotificationCard: FC<Props> = ({ 
  title, 
  message, 
  type = 'info',
  time,
  onPress,
  isRead = false 
}) => {
  const { colors } = useTheme();
  const typeColors: Record<NotificationType, string> = {
    info: colors.info.main,
    success: colors.success.main,
    warning: colors.warning.main,
    error: colors.error.main,
  };
  const iconColor = typeColors[type];
  const iconName = typeIcons[type] as any;

  return (
     <Pressable 
       onPress={onPress} 
       android_ripple={{ color: colors.shadow.light }}
       style={({ pressed }) => [styles.container, !isRead && { backgroundColor: colors.primary + '10', borderLeftWidth: 3, borderLeftColor: colors.primary }, pressed && styles.pressed]}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <Icon name={iconName} size="md" color={iconColor} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="subtitle" color="primary" style={styles.title}>{title}</Text>
          {!isRead && <View style={styles.unreadDot} />}
        </View>
        <Text variant="body" color="secondary" numberOfLines={2}>{message}</Text>
        {time && (
          <Text variant="caption" color="muted" style={styles.time}>{time}</Text>
        )}
      </View>
     </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  time: {
    marginTop: 8,
  },
  pressed: {
    transform: [{ scale: 0.997 }],
    opacity: 0.92,
  },
});

export default NotificationCard;

