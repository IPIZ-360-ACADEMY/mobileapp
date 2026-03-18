import React, { FC } from 'react';
import { View, Pressable } from 'react-native';
import { Logo } from './Logo';
import type { HeaderProps } from '../types';

const LOGO_SIZE = 36;

export const Header: FC<HeaderProps> = ({ onMenuPress }) => {

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 shadow-md rounded-b-xl">
      <Logo size={LOGO_SIZE} />

      <Pressable
        onPress={onMenuPress}
        className="w-10 h-10 items-center justify-center"
        style={({ pressed }) => pressed && { opacity: 0.75 }}
        accessibilityLabel="Menu"
        accessibilityRole="button"
      >
        <View className="space-y-1.5 h-4 justify-between">
          <View className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100" />
          <View className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100" />
          <View className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100" />
        </View>
      </Pressable>
    </View>
  );
};
