import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../contexts/AuthContext';

type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();
  const { isAuthenticated } = useAuth();

  const [dot1Opacity] = useState(() => new Animated.Value(0.2));
  const [dot2Opacity] = useState(() => new Animated.Value(0.2));
  const [dot3Opacity] = useState(() => new Animated.Value(0.2));

  useEffect(() => {
    const animateDots = () => {
      const createPulse = (anim: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0.2, duration: 400, useNativeDriver: true }),
            Animated.delay(800 - delay),
          ]),
        );

      Animated.parallel([
        createPulse(dot1Opacity, 0),
        createPulse(dot2Opacity, 266),
        createPulse(dot3Opacity, 532),
      ]).start();
    };

    animateDots();

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTab');
      } else {
        navigation.replace('Login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      {/* Teal overlay for gradient-like effect */}
      <View style={styles.tealOverlay} />

      {/* Center content */}
      <View style={styles.centerContent}>
        {/* Circular logo container */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>IPIZ</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>IPIZ Mobile</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Instituto Politécnico Industrial</Text>
      </View>

      {/* Loading dots */}
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
        <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
        <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
      </View>

      {/* Copyright */}
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2024 IPIZ - 17 de Dezembro</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tealOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D7377',
    opacity: 0.4,
  },
  centerContent: {
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#BFDBFE',
    letterSpacing: 0.3,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 11,
    color: '#93C5FD',
    opacity: 0.7,
  },
});

export default SplashScreen;
