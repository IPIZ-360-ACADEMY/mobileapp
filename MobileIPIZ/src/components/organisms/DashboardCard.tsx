// IPIZ Mobile App - Organism DashboardCard Component
// Card component for dashboard with title, value, and icon

import React, { FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';

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
}

export const DashboardCard: FC<Props> = ({ 
  title, 
  value, 
  subtitle,
  icon,
  iconColor,
  onPress,
  trend 
}) => {
  const { colors } = useTheme();

  const getStyles = () => StyleSheet.create({
    container: {
      backgroundColor: colors.background.paper,
      padding: 16,
      borderRadius: 16,
      minHeight: 100,
      shadowColor: colors.shadow.light,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    pressable: {
      borderRadius: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    value: {
      marginBottom: 4,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
  });

  const styles = getStyles();
  const resolvedIconColor = iconColor || colors.primary;

  const content = (
    <View style={[styles.container, { shadowColor: colors.shadow.light }]}>
      <View style={styles.header}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: resolvedIconColor + '20' }]}>
            <Icon name={icon as any} size="lg" color={resolvedIconColor} />
          </View>
        )}
        <Text variant="caption" color="secondary">{title}</Text>
      </View>
      
      {value && (
        <Text variant="title" color="primary" style={styles.value}>{value}</Text>
      )}
      
      {subtitle && (
        <Text variant="body" color="secondary">{subtitle}</Text>
      )}
      
      {trend && (
        <View style={styles.trendContainer}>
          <Icon 
            name={trend.isPositive ? 'chevron-right' : 'chevron-right'} 
            size="sm" 
            color={trend.isPositive ? colors.success.main : colors.error.main} 
          />
          <Text 
            variant="caption" 
            color={trend.isPositive ? 'success' : 'error'}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return ( 
      <Pressable onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.9 }]}>
        {content} 
      </Pressable> 
    ); 
  }

  return content;
};

export default DashboardCard;
