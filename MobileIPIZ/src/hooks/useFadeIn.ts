import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

// Simple fade+translate-up entrance animation hook
export const useFadeIn = (duration = 350, translateY = 6) => {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translate] = useState(() => new Animated.Value(translateY));

  useEffect(() => {
    const runner = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, useNativeDriver: true }),
      Animated.timing(translate, { toValue: 0, duration, useNativeDriver: true }),
    ]);

    runner.start();

    return () => {
      runner.stop();
    };
  }, [opacity, translate, duration]);

  return {
    opacity,
    translate,
    animatedStyle: {
      opacity,
      transform: [{ translateY: translate }],
    },
  } as const;
};

export default useFadeIn;
