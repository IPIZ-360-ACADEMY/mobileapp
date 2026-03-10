import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AlumniStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<AlumniStackParamList, 'Certificate'>;

export const CertificateScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Certificate Screen</Text>
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
