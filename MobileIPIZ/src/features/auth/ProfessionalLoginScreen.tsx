import React, { useState } from 'react';
import { ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text, Button, Input } from '../../components/base';

const { height, width } = Dimensions.get('window');

export const ProfessionalLoginScreen = () => {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simular delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - Logo e Branding */}
        <Box
          flex={0.4}
          justifyContent="center"
          alignItems="center"
          padding={24}
        >
          {/* Logo Placeholder - Substitua pela logo IPIZ real */}
          <Box
            style={{
              width: 120,
              height: 120,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 999,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text 
              variant="h1" 
              weight="bold" 
              color="primary"
              style={{ color: '#fff' }}
            >
              IPIZ
            </Text>
          </Box>
          
          <Text 
            variant="h2" 
            weight="bold" 
            center
            marginTop={24}
          >
            InstitutoTécnico
          </Text>
          
          <Text 
            variant="body" 
            color="secondary" 
            center
            marginTop={8}
          >
            Academia Digital
          </Text>
        </Box>

        {/* Form Section */}
        <Box
          flex={0.6}
          padding={24}
          justifyContent="flex-start"
        >
          {/* Email Input */}
          <Box marginBottom={20}>
            <Input
              label="Email"
              placeholder="seu.email@ipiz.edu.br"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              size="md"
              leftIcon={<Text variant="h3">✉️</Text>}
            />
          </Box>

          {/* Password Input */}
          <Box marginBottom={24}>
            <Input
              label="Senha"
              placeholder="Sua senha segura"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              size="md"
              leftIcon={<Text variant="h3">🔒</Text>}
              rightIcon={
                <Text variant="h3" style={{ opacity: 0.6 }}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
          </Box>

          {/* Forgot Password */}
          <Box marginBottom={32} alignItems="flex-end">
            <Text 
              variant="caption" 
              color="primary"
              weight="600"
            >
              Esqueceu a senha?
            </Text>
          </Box>

          {/* Login Button */}
          <Button
            label={isLoading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            size="lg"
            fullWidth
            disabled={isLoading || !email || !password}
          />

          {/* Divider */}
          <Box
            flexDirection="row"
            alignItems="center"
            marginV={24}
            gap={12}
          >
            <Box style={{ flex: 1, height: 1, backgroundColor: theme.border.light }} />
            <Text variant="caption" color="secondary">Ou continue com</Text>
            <Box style={{ flex: 1, height: 1, backgroundColor: theme.border.light }} />
          </Box>

          {/* Social Login Buttons */}
          <Box
            flexDirection="row"
            gap={12}
            marginBottom={32}
          >
            {['Google', 'Microsoft'].map((provider) => (
              <Button
                key={provider}
                label={provider}
                onPress={() => console.log(`Login with ${provider}`)}
                variant="outline"
                size="md"
                style={{ flex: 1 }}
              />
            ))}
          </Box>

          {/* Sign Up Link */}
          <Box alignItems="center">
            <Text variant="body" color="secondary">
              Não tem conta?{' '}
              <Text 
                variant="body" 
                weight="600"
                color="primary"
              >
                Cadastre-se
              </Text>
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
