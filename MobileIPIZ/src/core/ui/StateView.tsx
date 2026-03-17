import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../theme';
import { AppText } from './AppText';
import { Button } from './Button';

type StateType = 'loading' | 'empty' | 'error';

type StateViewProps = {
  type: StateType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const StateView = React.memo(function StateView({
  type,
  title,
  description,
  actionLabel,
  onAction,
}: StateViewProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      {type === 'loading' ? <ActivityIndicator size="small" color={theme.colors.primary} /> : null}
      <AppText variant="h3" tone={type === 'error' ? 'error' : 'default'} style={styles.title}>
        {title}
      </AppText>
      {description ? (
        <AppText variant="caption" tone="muted" style={styles.description}>
          {description}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" style={styles.button} />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 320,
  },
  button: {
    minWidth: 140,
    marginTop: 4,
  },
});
