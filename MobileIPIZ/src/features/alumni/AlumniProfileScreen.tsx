import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AlumniProfileScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Alumni Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
