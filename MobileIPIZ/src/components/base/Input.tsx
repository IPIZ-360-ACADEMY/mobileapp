/**
 * IPIZ Mobile App - Professional Input Component
 * Modern text input with validation states and icons
 * Alinhado com o design system (Blue/Teal)
 */

import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text as RNText,
  TouchableOpacity,
  type TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  onRightIconPress?: () => void;
}

/**
 * Input Component
 * Professional text input with validation and icons
 * @example
 * <Input
 *   label="Email"
 *   placeholder="seu@email.com"
 *   icon={<EmailIcon />}
 *   required
 * />
 */
export const Input = React.forwardRef<RNTextInput, InputProps>(
  (
    {
      label,
      placeholder,
      icon,
      rightIcon,
      error = false,
      errorMessage,
      helperText,
      required = false,
      variant = 'outlined',
      size = 'md',
      disabled = false,
      className = '',
      containerClassName = '',
      onRightIconPress,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Size classes
    const getSizeClasses = (): string => {
      switch (size) {
        case 'sm':
          return 'px-3 h-9';
        case 'lg':
          return 'px-5 h-14';
        case 'md':
        default:
          return 'px-4 h-12';
      }
    };

    // Variant classes
    const getVariantClasses = (): string => {
      const base = 'rounded-lg transition-all duration-200 flex-row items-center';
      
      if (error) {
        return `${base} bg-white border-2 border-red-500`;
      }

      switch (variant) {
        case 'filled':
          return `${base} bg-slate-100 border-0 ${
            isFocused ? 'bg-slate-50 border-b-2 border-sky-600' : ''
          }`;
        case 'outlined':
          return `${base} bg-white border border-slate-200 ${
            isFocused ? 'border-2 border-sky-600 shadow-sm' : ''
          }`;
        case 'default':
        default:
          return `${base} bg-white border border-slate-200 ${
            isFocused ? 'border-sky-600 shadow-md' : ''
          }`;
      }
    };

    const disabledClass = disabled ? 'opacity-50' : '';

    return (
      <View className={`gap-2 ${containerClassName}`}>
        {label && (
          <RNText className="text-sm font-semibold text-slate-700">
            {label}
            {required && <RNText className="text-red-500"> *</RNText>}
          </RNText>
        )}

        <View className={`${getSizeClasses()} ${getVariantClasses()} ${disabledClass} gap-3`}>
          {icon && (
            <View className="justify-center items-center">
              {icon}
            </View>
          )}

          <RNTextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-1 text-slate-900 font-medium ${className}`}
            style={{ padding: 0 }}
            {...props}
          />

          {rightIcon && (
            <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {error && errorMessage && (
          <RNText className="text-xs text-red-500 font-medium">
            {errorMessage}
          </RNText>
        )}

        {!error && helperText && (
          <RNText className="text-xs text-slate-500">
            {helperText}
          </RNText>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

