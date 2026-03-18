import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

/**
 * ProfessionalLoginScreen - Tela de login moderna e profissional
 * Design corporativo com Tailwind CSS
 */
export const ProfessionalLoginScreen = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View className="flex-1 justify-center items-center py-8">
            <View className="w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-full items-center justify-center mb-6 shadow-lg">
              <Text className="text-6xl">🎓</Text>
            </View>

            <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
              IPIZ Academy
            </Text>

            <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-8">
              Instituto Técnico de Educação
            </Text>
          </View>

          {/* Form Section */}
          <View className="px-4 pb-8">
            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Email
              </Text>
              <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-3 border border-transparent">
                <Text className="text-xl mr-3">✉️</Text>
                <TextInput
                  className="flex-1 text-gray-900 dark:text-gray-100"
                  placeholder="seu.email@ipiz.edu.br"
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Senha
              </Text>
              <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-3 border border-transparent">
                <Text className="text-xl mr-3">🔒</Text>
                <TextInput
                  className="flex-1 text-gray-900 dark:text-gray-100"
                  placeholder="Sua senha segura"
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-2"
                >
                  <Text className="text-xl opacity-60">
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Forgot Password */}
            <View className="items-end mb-8">
              <Pressable>
                <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Esqueceu a senha?
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading || !email || !password}
              className={`w-full py-4 rounded-lg items-center mb-6 ${
                isLoading || !email || !password
                  ? 'bg-blue-400 dark:bg-blue-800'
                  : 'bg-blue-600 dark:bg-blue-700'
              }`}
            >
              <Text className="text-white font-bold text-lg">
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
              <Text className="mx-3 text-sm text-gray-500 dark:text-gray-400">
                Ou continue com
              </Text>
              <View className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
            </View>

            {/* Social Login */}
            <View className="flex-row gap-3 mb-8">
              {['Google', 'Microsoft'].map((provider) => (
                <Pressable
                  key={provider}
                  className="flex-1 border border-gray-300 dark:border-slate-700 py-3 rounded-lg items-center"
                >
                  <Text className="text-gray-900 dark:text-gray-100 font-semibold">
                    {provider === 'Google' ? '📱' : '🪟'} {provider}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Sign Up Link */}
            <View className="items-center">
              <Text className="text-gray-600 dark:text-gray-400">
                Não tem conta?{' '}
                <Text className="font-bold text-blue-600 dark:text-blue-400">
                  Cadastre-se
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfessionalLoginScreen;
