import React, { FC } from 'react';
import { View, Image, Text } from 'react-native';

export const SplashScreen: FC = () => {
  return (
    <View className="flex-1 justify-center items-center" style={{ backgroundColor: '#F5F5F5F7' }}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 250, height: 250 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', marginTop: 20 }}>
        IPIZ
      </Text>
    </View>
  );
};
