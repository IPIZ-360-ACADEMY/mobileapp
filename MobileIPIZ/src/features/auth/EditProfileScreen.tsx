import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../../components/base/Button';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    Alert.alert(
      'Sucesso',
      'Perfil atualizado com sucesso!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white dark:bg-slate-900" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className="flex-1 bg-white dark:bg-slate-900" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="bg-blue-600 dark:bg-blue-800 px-6 py-6 pt-12">
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#cbd5e1' }}
            className="mb-4"
          >
            <Text className="text-white text-base">← Cancelar</Text>
          </Pressable>
          <Text className="text-white text-2xl font-bold">Editar Perfil</Text>
        </View>

        <View className="p-4">
          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Nome Completo</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          />

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Email</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Telefone</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-6"
            value={phone}
            onChangeText={setPhone}
            placeholder="Digite seu telefone"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            keyboardType="phone-pad"
          />

          <Button title="Salvar Alterações" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
