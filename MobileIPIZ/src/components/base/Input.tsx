import React, { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';
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
}

/**
 * Input Component - Campo de entrada profissional
 * Suporta validação, ícones, e estados
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
    },
    ref,
  ) => {
    const { theme } = useAppTheme();
    const [isFocused, setIsFocused] = useState(false);

    const sizeMap = {
      sm: {
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
      },
      md: {
        height: 50,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
      },
      lg: {
        height: 60,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 18,
      },
    };

    const currentSize = sizeMap[size];

    const borderColor = error
      ? theme.palette.error.main
      : isFocused
      ? theme.palette.primary.main
      : theme.border.light;

    return (
      <Box style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <Text
            variant="bodySmall"
            weight="600"
            marginBottom={8}
            style={{
              color: error ? theme.palette.error.main : theme.text.primary,
            }}
          >
            {label}
          </Text>
        )}

        <Box
          style={{
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            borderWidth: 1,
            borderColor,
            borderRadius: 12,
            backgroundColor: disabled
              ? theme.background.tertiary
              : theme.background.secondary,
            paddingHorizontal: currentSize.paddingHorizontal,
            paddingVertical: multiline ? currentSize.paddingVertical : 0,
            gap: 8,
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {leftIcon && <Box>{leftIcon}</Box>}

          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={theme.text.tertiary}
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
            style={[
              {
                flex: 1,
                height: multiline ? undefined : currentSize.height,
                fontSize: currentSize.fontSize,
                color: theme.text.primary,
                fontFamily: 'System',
              },
              multiline && { minHeight: currentSize.height, paddingVertical: 12 },
            ]}
          />

          {rightIcon && (
            <Pressable onPress={onRightIconPress} style={{ padding: 4 }}>
              <Box>{rightIcon}</Box>
            </Pressable>
          )}
        </Box>

        {error && (
          <Text
            variant="caption"
            style={{
              color: theme.palette.error.main,
              marginTop: 4,
            }}
          >
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

Input.displayName = 'Input';
