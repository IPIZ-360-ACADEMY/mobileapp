import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/AppNavigator';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';


export const LoginScreen: FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>IPIZ</Text>
        <Text style={styles.subtitle}>Instituto Politécnico Industrial do Zango</Text>
      </View>

      <View style={styles.form}>
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" />
        <Input label="Senha" value={password} onChangeText={setPassword} placeholder="Senha de usuário" secureTextEntry />

        <Button title="Entrar" onPress={handleLogin} loading={isLoading} />

          <Text style={styles.link} onPress={() => navigation.navigate('Profile')}>Esqueceu a senha?</Text>

          <Text style={styles.link} onPress={() => navigation.navigate('Profile')}>Criar nova conta</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  button: {
    backgroundColor: colors.primary[700],
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: colors.background.paper,
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: colors.primary[700],
    fontSize: 14,
  },
});
