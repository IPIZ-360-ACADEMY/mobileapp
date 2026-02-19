import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EditAlumniProfileScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Alumni Profile Screen</Text>
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
