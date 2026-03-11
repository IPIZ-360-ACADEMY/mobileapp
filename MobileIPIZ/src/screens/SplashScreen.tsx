import React, { FC, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  useEffect(() => {
    // Navigate to MainTab after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('MainTab');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'transparent' }}>
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
