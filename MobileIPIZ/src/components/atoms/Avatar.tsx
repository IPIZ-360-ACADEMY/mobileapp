// IPIZ Mobile App - Atomic Avatar Component
// User avatar component with fallback to initials

import React, { FC } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  source?: string;
  name?: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 20,
  xl: 28,
};

export const Avatar: FC<Props> = ({ 
  source, 
  name = '',
  size = 'md' 
}) => {
  const { colors } = useTheme();
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0]?.substring(0, 2).toUpperCase() || '?';
  };

  const containerSize = sizeMap[size];
  const fontSize = fontSizeMap[size];

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={[
          styles.image,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#E0E0E0',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
  },
});

export default Avatar;

