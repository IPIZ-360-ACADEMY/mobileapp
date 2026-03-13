/**
 * IPIZ Mobile App - Example Professional Login Screen
 * Demonstrates best practices for component usage and styling
 * Based on the design mockups
 */

import React, { useState } from 'react';
import { View, Text as RNText, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  Input,
  Logo,
} from '../components';

/**
 * Professional Login Screen
 * Shows proper use of:
 * - Gradient backgrounds
 * - Professional inputs with validation
 * - Styled buttons
 * - Proper spacing and typography
 */
export const LoginScreenExample: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (text: string) => {
    setEmail(text);
    setEmailError(!text.includes('@'));
  };

  const handleLogin = async () => {
    if (emailError || !email || !password) {
      return;
    }
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#0D7377']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center p-6"
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-8">
          {/* Logo Section */}
          <View className="items-center gap-3">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg">
              <RNText className="text-2xl font-bold text-sky-700">
                IPIZ
              </RNText>
            </View>
            <RNText className="text-3xl font-bold text-white text-center">
              IPIZ Mobile
            </RNText>
            <RNText className="text-base text-sky-100">
              Bem-vindo de volta
            </RNText>
          </View>

          {/* Form Section */}
          <View className="gap-5 bg-white rounded-2xl p-6 shadow-lg">
            {/* Email Input */}
            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={validateEmail}
              variant="outlined"
              required
              error={emailError && email.length > 0}
              errorMessage={emailError ? 'Email inválido' : undefined}
              keyboardType="email-address"
            />

            {/* Password Input */}
            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              variant="outlined"
              required
              secureTextEntry={!showPassword}
              rightIcon={
                <RNText className="text-sky-600 text-lg">
                  {showPassword ? '👁' : '👁‍🗨'}
                </RNText>
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            {/* Forgot Password Link */}
            <RNText className="text-sky-600 font-semibold text-sm text-right">
              Esqueceu a senha?
            </RNText>

            {/* Login Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              onPress={handleLogin}
              disabled={emailError || !email || !password}
            >
              Entrar
            </Button>

            {/* Signup Link */}
            <View className="flex-row items-center justify-center gap-1">
              <RNText className="text-slate-600">
                Não tem conta?
              </RNText>
              <RNText className="text-sky-600 font-semibold">
                Criar conta
              </RNText>
            </View>
          </View>

          {/* Info Section */}
          <View className="gap-3 items-center">
            <RNText className="text-sky-100 text-xs text-center">
              Login seguro protegido por autenticação
            </RNText>
            <RNText className="text-sky-100 text-xs opacity-70">
              © 2024 IPIZ - Instituto Politécnico Industrial
            </RNText>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LoginScreenExample;

/**
 * DESIGN BREAKDOWN
 * 
 * 1. GRADIENT BACKGROUND
 *    - Uses LinearGradient with primary colors (Dark Blue → Dark Teal)
 *    - Full flex height for proper filling
 * 
 * 2. LOGO SECTION
 *    - Centered white container with rounded corners
 *    - Shadow for depth
 *    - Large, bold typography
 *    - Subtitle in light sky color
 * 
 * 3. FORM CONTAINER
 *    - White background for contrast
 *    - Rounded corners (rounded-2xl) for professional look
 *    - Adequate padding (p-6)
 *    - Shadow for elevation (shadow-lg)
 * 
 * 4. INPUTS
 *    - Professional Input component with validation
 *    - Clear labels with required indicator
 *    - Outlined variant for visibility
 *    - Right icon for password toggle
 *    - Error states with helpful messages
 * 
 * 5. BUTTONS
 *    - Primary variant for main action
 *    - Full width for easy tapping
 *    - Loading state support
 *    - Disabled state when form is invalid
 * 
 * 6. SPACING
 *    - gap-8 for major sections
 *    - gap-5 for form inputs
 *    - p-6 for padding inside containers
 * 
 * 7. TYPOGRAPHY
 *    - text-3xl font-bold for main title
 *    - text-base for body text
 *    - text-sm for labels and links
 *    - Consistent color hierarchy
 */
