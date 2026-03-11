// IPIZ Mobile App - Settings Screen
// User settings and preferences

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView, Switch, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ListItem, SectionHeader } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: FC<Props> = () => {
  const { logout, user } = useAuth();
  const { isDark, componentTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <View className="px-5 py-5 bg-blue-600 dark:bg-blue-800">
        <Text variant="title" color="inverse">Definições</Text>
        <Text variant="body" color="secondary">Gerir preferências e conta</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <SectionHeader title="Conta" className="mt-4 mb-3" />
        
        <ListItem
          title="Perfil"
          subtitle={user?.name || 'Utilizador'}
          leftIcon="user"
          onPress={() => {}}
        />
        
        <ListItem
          title="Editar Perfil"
          subtitle="Atualizar informações pessoais"
          leftIcon="edit"
          onPress={() => {}}
        />

        <SectionHeader title="Preferências" className="mt-4 mb-3" />

        <View className="flex-row items-center justify-between bg-gray-50 dark:bg-slate-800 py-3 px-4 rounded-lg mb-2">
          <View className="flex-1 mr-3">
            <Text variant="subtitle" color="primary">Notificações Push</Text>
            <Text variant="caption" color="secondary">Receber notificações no dispositivo</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            thumbColor="#ffffff"
          />
        </View>

        <View className="flex-row items-center justify-between bg-gray-50 dark:bg-slate-800 py-3 px-4 rounded-lg mb-2">
          <View className="flex-1 mr-3">
            <Text variant="subtitle" color="primary">Notificações por Email</Text>
            <Text variant="caption" color="secondary">Receber atualizações por email</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            thumbColor="#ffffff"
          />
        </View>

        <View className="flex-row items-center justify-between bg-gray-50 dark:bg-slate-800 py-3 px-4 rounded-lg mb-2">
          <View className="flex-1 mr-3">
            <Text variant="subtitle" color="primary">Modo Escuro</Text>
            <Text variant="caption" color="secondary">Alternar tema escuro</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            thumbColor="#ffffff"
          />
        </View>

        <SectionHeader title="Suporte" className="mt-4 mb-3" />

        <ListItem
          title="Ajuda & FAQ"
          subtitle="Perguntas frequentes"
          leftIcon="announcement"
          onPress={() => {}}
        />
        
        <ListItem
          title="Termos & Condições"
          subtitle="Leer os termos de uso"
          leftIcon="book"
          onPress={() => {}}
        />
        
        <ListItem
          title="Política de Privacidade"
          subtitle="Como protegemos seus dados"
          leftIcon="book"
          onPress={() => {}}
        />

        <SectionHeader title="Sessão" className="mt-4 mb-3" />

        <ListItem
          title="Terminar Sessão"
          subtitle="Sair da aplicação"
          leftIcon="logout"
          onPress={logout}
        />

        <View className="items-center py-8">
          <Text variant="caption" color="muted">IPIZ Mobile App v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

