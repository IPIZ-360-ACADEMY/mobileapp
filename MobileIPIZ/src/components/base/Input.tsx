import React, { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Box, Text } from './index';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
}

/**
 * Input Component - Campo de entrada profissional com Tailwind CSS
 * Suporta validação, ícones, estados e múltiplas variantes
 */
export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      placeholder = 'Digite aqui...',
      value,
      onChangeText,
      secureTextEntry = false,
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      maxLength,
      multiline = false,
      numberOfLines = 1,
      keyboardType = 'default',
      disabled = false,
      fullWidth = true,
      size = 'md',
      variant = 'default',
    },
    ref,
  ) => {
    const { isDark } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    // Classes base para todos os tamanhos
    const baseClasses = `
      flex-row items-center border rounded-xl
      ${fullWidth ? 'w-full' : 'w-auto'}
      ${disabled ? 'opacity-60' : ''}
      ${multiline ? 'items-start' : 'items-center'}
    `;

    // Classes de variante
    const variantClasses = {
      default: `
        bg-white dark:bg-gray-900
        border-gray-300 dark:border-gray-600
        ${isFocused ? 'border-blue-500 dark:border-blue-400' : ''}
        ${error ? 'border-red-500 dark:border-red-400' : ''}
      `,
      filled: `
        bg-gray-100 dark:bg-gray-800
        border-transparent
        ${isFocused ? 'bg-gray-200 dark:bg-gray-700 border-blue-500 dark:border-blue-400' : ''}
        ${error ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400' : ''}
      `,
      outlined: `
        bg-transparent
        border-gray-300 dark:border-gray-600
        ${isFocused ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20' : ''}
        ${error ? 'border-red-500 dark:border-red-400 ring-2 ring-red-500/20' : ''}
      `,
    };

    // Classes de tamanho
    const sizeClasses = {
      sm: `
        h-10 px-3 py-2
        ${multiline ? 'min-h-10 py-2' : ''}
      `,
      md: `
        h-12 px-4 py-3
        ${multiline ? 'min-h-12 py-3' : ''}
      `,
      lg: `
        h-14 px-5 py-4
        ${multiline ? 'min-h-14 py-4' : ''}
      `,
    };

    // Classes do TextInput
    const inputClasses = `
      flex-1 text-gray-900 dark:text-white
      ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
      ${multiline ? 'text-left' : 'text-left'}
    `;

    // Classes do placeholder
    const placeholderClasses = 'text-gray-500 dark:text-gray-400';

    return (
      <Box className={`${fullWidth ? 'w-full' : 'w-auto'}`}>
        {label && (
          <Text
            variant="bodySmall"
            weight="600"
            className={`mb-2 ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            {label}
          </Text>
        )}

        <Box className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} gap-2`}>
          {leftIcon && <Box>{leftIcon}</Box>}

          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={inputClasses}
            style={{
              fontFamily: 'System',
              textAlignVertical: multiline ? 'top' : 'center',
            }}
          />

          {rightIcon && (
            <Pressable onPress={onRightIconPress} className="p-1">
              <Box>{rightIcon}</Box>
            </Pressable>
          )}
        </Box>

        {error && (
          <Text
            variant="caption"
            className="text-red-600 dark:text-red-400 mt-1"
          >
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

Input.displayName = 'Input';
