// IPIZ Mobile App - Atomic Button Component
// Modern button with hover, pressed, and loading states

import React, { FC, useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export const Button: FC<Props> = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'md',
  style,
  fullWidth = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          container: { backgroundColor: colors.dark },
          text: { color: colors.white, fontWeight: '600' },
        };
      case 'outline':
        return {
          container: { backgroundColor: colors.transparent, borderWidth: 2, borderColor: colors.primary },
          text: { color: colors.primary, fontWeight: '600' },
        };
      case 'ghost':
        return {
          container: { backgroundColor: colors.transparent },
          text: { color: colors.primary, fontWeight: '600' },
        };
      case 'primary':
      default:
        return {
          container: { backgroundColor: colors.primary },
          text: { color: colors.dark, fontWeight: '600' },
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingV: 8, paddingH: 12, fontSize: 12 };
      case 'lg':
        return { paddingV: 16, paddingH: 24, fontSize: 16 };
      case 'md':
      default:
        return { paddingV: 12, paddingH: 16, fontSize: 14 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.container,
        { 
          paddingVertical: sizeStyles.paddingV, 
          paddingHorizontal: sizeStyles.paddingH,
        },
        variantStyles.container,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? colors.dark : colors.primary} 
          />
        ) : (
          <Text style={[
            styles.text, 
            { fontSize: sizeStyles.fontSize },
            variantStyles.text,
            isDisabled && styles.disabledText,
          ]}>
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  fullWidth: {
    width: '100%',
  },
  // Text styles
  text: {
    textAlign: 'center',
  },
  // States
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
