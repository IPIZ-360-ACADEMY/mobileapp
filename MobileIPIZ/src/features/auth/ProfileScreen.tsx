import React, { FC } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Button from '../../components/base/Button';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <ScrollView className="bg-white dark:bg-slate-900" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-4 pt-4 pb-2">
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 flex-row items-center shadow-md">
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#cbd5e1' }}
            className="mr-4"
          >
            <Text className="text-gray-900 dark:text-gray-100 text-base">← Voltar</Text>
          </Pressable>
          <Text className="text-gray-900 dark:text-gray-100 text-2xl font-bold">Meu Perfil</Text>
        </View>
      </View>

      <View className="items-center py-8">
        <View className="w-30 h-30 rounded-full bg-blue-500 items-center justify-center mb-4">
          <Text className="text-4xl font-bold text-white">{user?.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Button title="Alterar Foto" variant="outline" onPress={() => {}} />
      </View>

      <View className="bg-white dark:bg-slate-800 mx-4 mb-4 rounded-xl p-4">
        <View className="border-b border-gray-200 dark:border-slate-700 py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Nome</Text>
          <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">{user?.name}</Text>
        </View>
        <View className="border-b border-gray-200 dark:border-slate-700 py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Email</Text>
          <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">{user?.email}</Text>
        </View>
        <View className="border-b border-gray-200 dark:border-slate-700 py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Perfil</Text>
          <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">{user?.role}</Text>
        </View>
        <View className="py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Telefone</Text>
          <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">{user?.phone || 'Não informado'}</Text>
        </View>
      </View>

      <View className="px-4 mb-8">
        <Button title="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
      </View>
    </ScrollView>
  );
};
