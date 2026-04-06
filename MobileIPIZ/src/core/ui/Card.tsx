import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useAppTheme } from '../theme';

type CardProps = ViewProps & {
  padded?: boolean;
};

export const Card = React.memo(function Card({
  padded = true,
  style,
  ...rest
}: CardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      {...rest}
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          padding: padded ? theme.spacing.md : 0,
        },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
  },
});
