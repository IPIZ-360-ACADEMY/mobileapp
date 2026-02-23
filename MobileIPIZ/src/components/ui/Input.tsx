import React, { FC } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  label?: string;
};

export const Input: FC<Props> = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, label }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.hint}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { color: colors.text.secondary, marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: colors.background.paper,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
});
