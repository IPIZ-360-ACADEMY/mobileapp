import React, { FC } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
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
  const { colors } = useTheme();

  const getStyles = () => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.paper,
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
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
    menuLineTheme: {
      backgroundColor: colors.text.primary,
    },
    menuPressed: {
      opacity: 0.75,
    },
  });

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Logo size={LOGO_SIZE} />

      <Pressable
        onPress={onMenuPress}
        style={({ pressed }) => [styles.menuButton, pressed && styles.menuPressed]}
        accessibilityLabel="Menu"
        accessibilityRole="button"
      >
        <View style={styles.menuIcon}>
          <View style={[styles.menuLine, styles.menuLineTheme]} />
          <View style={[styles.menuLine, styles.menuLineTheme]} />
          <View style={[styles.menuLine, styles.menuLineTheme]} />
        </View>
      </Pressable>
    </View>
  );
};
