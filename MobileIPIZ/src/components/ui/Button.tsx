import React, { FC, useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const Button: FC<Props> = ({ title, onPress, disabled, loading }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Animated.View style={[styles.inner, { transform: [{ scale }] }]}>
        <Text style={styles.text}>{loading ? 'Carregando...' : title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  inner: {
    backgroundColor: colors.primary[700],
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    color: colors.background.paper,
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.9,
  },
});
