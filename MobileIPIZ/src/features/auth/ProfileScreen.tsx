import React, { FC } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Button } from '../../components/base';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // Implementar logout
          },
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Informações Pessoais',
      items: [
        { label: 'Nome', value: user?.name || 'Não informado', icon: '👤' },
        { label: 'Email', value: user?.email || 'Não informado', icon: '✉️' },
        { label: 'Telefone', value: user?.phone || 'Não informado', icon: '📱' },
        { label: 'Perfil', value: user?.role || 'Aluno', icon: '🎓' },
      ],
    },
    {
      title: 'Estatísticas',
      items: [
        { label: 'Cursos Completados', value: '3', icon: '✓' },
        { label: 'Cursos Ativos', value: '5', icon: '📚' },
        { label: 'Média Geral', value: '8.5', icon: '📊' },
        { label: 'Pontos IPIZ', value: '2,450', icon: '⭐' },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mb-6 items-center">
          <View className="w-24 h-24 bg-blue-600 dark:bg-blue-700 rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-5xl">
              {user?.name?.charAt(0).toUpperCase() || '👤'}
            </Text>
          </View>

          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {user?.name || 'Usuário'}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {user?.role === 'student' ? 'Aluno' : user?.role === 'teacher' ? 'Professor' : 'Administrador'}
          </Text>

          <Pressable className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 mt-4">
            <Text className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              📷 Alterar Foto
            </Text>
          </Pressable>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIdx) => (
          <View key={sectionIdx} className="mb-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              {section.title}
            </Text>
            <View className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <View
                  key={itemIdx}
                  className={`flex-row items-center justify-between px-4 py-4 ${
                    itemIdx < section.items.length - 1
                      ? 'border-b border-gray-200 dark:border-slate-700'
                      : ''
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{item.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {item.label}
                      </Text>
                      <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {item.value}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View className="mb-6 space-y-3">
          <Pressable className="bg-blue-600 dark:bg-blue-700 rounded-lg py-4 items-center">
            <Text className="text-white font-bold text-base">
              ✏️ Editar Perfil
            </Text>
          </Pressable>

          <Pressable className="bg-gray-100 dark:bg-slate-800 rounded-lg py-4 items-center">
            <Text className="text-gray-900 dark:text-gray-100 font-bold text-base">
              🔐 Alterar Senha
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            className="bg-red-100 dark:bg-red-900 rounded-lg py-4 items-center"
          >
            <Text className="text-red-600 dark:text-red-300 font-bold text-base">
              🚪 Sair da Conta
            </Text>
          </Pressable>
        </View>

        {/* Settings Actions */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Configurações
          </Text>
          {[
            { icon: '🔔', label: 'Notificações' },
            { icon: '🌙', label: 'Tema Escuro' },
            { icon: '🌐', label: 'Idioma' },
            { icon: '🛡️', label: 'Privacidade' },
            { icon: '❓', label: 'Ajuda' },
          ].map((setting, idx) => (
            <Pressable
              key={idx}
              className="bg-gray-50 dark:bg-slate-800 flex-row items-center justify-between px-4 py-4 rounded-lg mb-2"
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">{setting.icon}</Text>
                <Text className="text-gray-900 dark:text-gray-100 font-semibold">
                  {setting.label}
                </Text>
              </View>
              <Text className="text-gray-400">→</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
