// IPIZ Mobile App - Molecule ListItem Component
// Reusable list item with icon, title, subtitle, and chevron

import React, { FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  showChevron?: boolean;
  badge?: string;
}

export const ListItem: FC<Props> = ({ 
  title, 
  subtitle, 
  leftIcon,
  rightIcon,
  onPress, 
  showChevron = true,
  badge 
}) => {
  const content = (
    <View style={styles.container}>
      {leftIcon && (
        <View style={styles.iconContainer}>
          <Icon name={leftIcon as any} size="md" color={undefined} />
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text variant="subtitle" color="primary">{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text variant="caption" color="primary">{badge}</Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text variant="caption" color="muted">{subtitle}</Text>
        )}
      </View>
      
      {rightIcon && (
        <Icon name={rightIcon as any} size="md" color={undefined} />
      )}
      
      {showChevron && !rightIcon && (
        <Icon name="chevron-right" size="sm" color={undefined} />
      )}
    </View>
  );

  const { colors } = useTheme();

  if (onPress) {
      return (
        <Pressable onPress={onPress} android_ripple={{ color: colors.shadow.light }} style={({ pressed }) => [styles.container, pressed && styles.pressed, { backgroundColor: colors.background.paper, borderColor: colors.primary + '10' }]}>
          {content}
        </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ translateY: 0 }],
  },
});

export default ListItem;

