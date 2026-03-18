// IPIZ Mobile App - Molecule SearchBar Component with Tailwind CSS
// Search input with icon and clear button

import React, { FC, useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Icon } from '@atoms/Icon';
import { Box } from '@base/Box';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const SearchBar: FC<Props> = ({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  onSubmit,
  size = 'md',
  variant = 'default',
  disabled = false,
  fullWidth = true,
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Classes base
  const baseClasses = `
    flex-row items-center rounded-xl border
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${disabled ? 'opacity-60' : ''}
  `;

  // Classes de variante
  const variantClasses = {
    default: `
      bg-white dark:bg-gray-900
      border-gray-300 dark:border-gray-600
      ${isFocused ? 'border-blue-500 dark:border-blue-400' : ''}
    `,
    filled: `
      bg-gray-100 dark:bg-gray-800
      border-transparent
      ${isFocused ? 'bg-gray-200 dark:bg-gray-700 border-blue-500 dark:border-blue-400' : ''}
    `,
    outlined: `
      bg-transparent
      border-gray-300 dark:border-gray-600
      ${isFocused ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20' : ''}
    `,
  };

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-3 py-2 gap-2',
    md: 'px-4 py-3 gap-3',
    lg: 'px-5 py-4 gap-4',
  };

  // Classes do input
  const inputSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Box className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      <Icon
        name="search"
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
        className="text-gray-500 dark:text-gray-400"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        className={`flex-1 ml-2 text-gray-900 dark:text-white ${inputSizeClasses[size]}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        editable={!disabled}
        style={{
          fontFamily: 'System',
        }}
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          className="p-1 rounded-full active:opacity-60"
        >
          <Icon
            name="close"
            size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
            className="text-gray-500 dark:text-gray-400"
          />
        </Pressable>
      )}
    </Box>
  );
};

export default SearchBar;
