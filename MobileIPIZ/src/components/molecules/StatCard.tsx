/**
 * IPIZ Mobile App - Stat Card Component
 * Professional card for displaying statistics and metrics
 * With support for circular progress indicators
 */

import React from 'react';
import {
  View,
  Text as RNText,
  ViewProps,
} from 'react-native';

interface StatCardProps extends ViewProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  showProgress?: boolean;
  progressValue?: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Stat Card Component
 * Displays a metric or statistic with optional progress indicator
 * @example
 * <StatCard
 *   title="Média Geral"
 *   value="15.8"
 *   variant="primary"
 * />
 * <StatCard
 *   title="Progresso"
 *   value="85%"
 *   showProgress
 *   progressValue={85}
 *   variant="success"
 * />
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'primary',
  showProgress = false,
  progressValue = 0,
  size = 'md',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'secondary':
        return 'bg-teal-50 border-teal-200';
      case 'primary':
      default:
        return 'bg-sky-50 border-sky-200';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-6';
      case 'md':
      default:
        return 'p-4';
    }
  };

  const getTitleColorClasses = () => {
    switch (variant) {
      case 'success':
        return 'text-emerald-700';
      case 'warning':
        return 'text-amber-700';
      case 'secondary':
        return 'text-teal-700';
      case 'primary':
      default:
        return 'text-sky-700';
    }
  };

  return (
    <View
      className={`
        ${getSizeClasses()}
        ${getVariantClasses()}
        border rounded-xl gap-3
        ${className}
      `}
      {...props}
    >
      {/* Header with icon and title */}
      <View className="flex-row items-center justify-between gap-2">
        {icon && (
          <View className="flex-1">
            {icon}
          </View>
        )}
        <View className={icon ? 'flex-1' : 'flex-1'}>
          <RNText className={`text-sm font-medium ${getTitleColorClasses()}`}>
            {title}
          </RNText>
        </View>
      </View>

      {/* Value and progress */}
      <View className="gap-2">
        <RNText className="text-2xl font-bold text-slate-900">
          {value}
        </RNText>

        {subtitle && (
          <RNText className="text-xs text-slate-600">
            {subtitle}
          </RNText>
        )}

        {showProgress && (
          <View className="h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
            <View
              style={{
                width: `${Math.min(progressValue || 0, 100)}%`,
              }}
              className={`h-full ${
                variant === 'success'
                  ? 'bg-emerald-600'
                  : variant === 'warning'
                    ? 'bg-amber-600'
                    : variant === 'secondary'
                      ? 'bg-teal-600'
                      : 'bg-sky-600'
              }`}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default StatCard;
