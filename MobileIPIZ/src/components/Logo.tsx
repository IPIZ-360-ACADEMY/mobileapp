import React, { FC } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import type { LogoProps } from '../types';

const LOGO_DEFAULT_SIZE = 40;

export const Logo: FC<LogoProps> = ({ size = LOGO_DEFAULT_SIZE }) => {
  const logoSize = { width: size, height: size };

  return (
    <View style={logoSize}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
