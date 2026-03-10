// IPIZ Mobile App - Atomic Input Component
// Input with validation, focus, and error states

import React, { FC, useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface Props extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  label?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: FC<Props> = ({ 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  label,
  error,
  helper,
  disabled = false,
  leftIcon,
  rightIcon,
  ...rest 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  
  const getStyles = () => StyleSheet.create({
    wrapper: { 
      marginBottom: 16,
    },
    label: { 
      color: colors.text.secondary, 
      marginBottom: 8, 
      fontSize: 14,
      fontWeight: '500',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: error ? colors.error.main : isFocused ? colors.primary : colors.border.light,
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text.primary,
    },
    inputWithLeftIcon: {
      paddingLeft: 8,
    },
    inputWithRightIcon: {
      paddingRight: 8,
    },
    leftIcon: {
      paddingLeft: 12,
    },
    rightIcon: {
      paddingRight: 12,
    },
    error: {
      color: colors.error.main,
      fontSize: 12,
      marginTop: 4,
    },
    helper: {
      color: colors.text.muted,
      fontSize: 12,
      marginTop: 4,
    },
  });

  const styles = getStyles();

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.hint}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          {...rest}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
    </View>
  );
};

export default Input;
