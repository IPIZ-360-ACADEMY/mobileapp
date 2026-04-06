import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useAppTheme } from '../theme';
import { AppText } from './AppText';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = React.memo(function Input({
  label,
  error,
  style,
  ...rest
}: InputProps): React.JSX.Element {
  const theme = useAppTheme();
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="default" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        {...rest}
        style={[
          styles.input,
          {
            borderColor: hasError ? theme.colors.error : theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderRadius: theme.radius.md,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.textMuted}
      />
      {hasError ? (
        <AppText variant="caption" tone="error">
          {error}
        </AppText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    paddingHorizontal: 2,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
