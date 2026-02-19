import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MentorshipScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Mentorship Screen</Text>
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
