import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Logo } from './Logo';
import type { HeaderProps } from '../types';

const MENU_ICON_CONFIG = {
  width: 24,
  height: 18,
  lineHeight: 2,
};

const LOGO_SIZE = 36;
const TOUCH_OPACITY = 0.7;

export const Header: FC<HeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.container}>
      <Logo size={LOGO_SIZE} />

      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={TOUCH_OPACITY}
        accessibilityLabel="Menu"
        accessibilityRole="button"
      >
        <View style={styles.menuIcon}>
          <View style={[styles.menuLine, styles.menuLineBlack]} />
          <View style={[styles.menuLine, styles.menuLineBlack]} />
          <View style={[styles.menuLine, styles.menuLineBlack]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8ED',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: MENU_ICON_CONFIG.width,
    height: MENU_ICON_CONFIG.height,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: MENU_ICON_CONFIG.lineHeight,
  },
  menuLineBlack: {
    backgroundColor: '#000000',
  },
});
