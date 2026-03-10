// IPIZ Mobile App - Login Screen
// Modern minimalistic login with new design system

import React, { FC, useState } from 'react';
import { View, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useAppTheme } from '../../contexts/ThemeContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { Button, Input, Text } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: FC<Props> = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  const { theme, colors } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email é obrigatório');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Senha é obrigatória');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text variant="title" color="primary" center>IPIZ</Text>
          <Text variant="body" color="secondary" center style={styles.subtitle}>
            Instituto Politécnico Industrial do Zango
          </Text>
        </View>

        <View style={styles.form}>
          <Text variant="sectionTitle" color="primary" style={styles.welcomeText}>
            Bem-vindo de volta
          </Text>
          <Text variant="body" color="muted" style={styles.instructionText}>
            Entre com suas credenciais para continuar
          </Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Senha de usuário"
            secureTextEntry
            error={passwordError}
          />

          <Pressable style={styles.forgotPassword} android_ripple={{ color: colors.border.dark }} onPress={() => {}}>
            <Text variant="body" color="secondary">Esqueceu a senha?</Text>
          </Pressable>

          <Button 
            title="Entrar" 
            onPress={handleLogin} 
            loading={isLoading} 
            fullWidth
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text variant="caption" color="muted" style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button 
            title="Criar nova conta" 
            variant="outline" 
            fullWidth
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  welcomeText: {
    marginBottom: 8,
  },
  instructionText: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
