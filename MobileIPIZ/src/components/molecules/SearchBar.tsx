// IPIZ Mobile App - Molecule SearchBar Component
// Search input with icon and clear button

import React, { FC, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../atoms/Icon';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export const SearchBar: FC<Props> = ({ 
  value, 
  onChangeText, 
  placeholder = 'Buscar...', 
  onSubmit 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  const getStyles = () => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: isFocused ? colors.primary : colors.border.light,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: colors.text.primary,
    },
    pressed: {
      opacity: 0.6,
    },
  });

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Icon name="search" size="sm" color={colors.text.muted} />
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.hint}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      
      {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')} android_ripple={{ color: colors.shadow.light }} style={({ pressed }) => pressed && styles.pressed}>
            <Icon name="close" size="sm" color={colors.text.muted} />
          </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
