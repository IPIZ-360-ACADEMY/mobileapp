// IPIZ Mobile App - Settings Screen
// User settings and preferences

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text, ListItem } from '../../components';
import { useAuth } from '../../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: FC<Props> = () => {
  const { logout, user } = useAuth();
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text variant="title" color="inverse">Definições</Text>
        <Text variant="body" color="secondary">Gerir preferências e conta</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="sectionTitle" color="primary" style={styles.sectionTitle}>
          Conta
        </Text>
        
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

        <Text variant="sectionTitle" color="primary" style={styles.sectionTitle}>
          Preferências
        </Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text variant="subtitle" color="primary">Notificações Push</Text>
            <Text variant="caption" color="secondary">Receber notificações no dispositivo</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.neutral[300], true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text variant="subtitle" color="primary">Notificações por Email</Text>
            <Text variant="caption" color="secondary">Receber atualizações por email</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: colors.neutral[300], true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text variant="subtitle" color="primary">Modo Escuro</Text>
            <Text variant="caption" color="secondary">Alternar tema escuro</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: colors.neutral[300], true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <Text variant="sectionTitle" color="primary" style={styles.sectionTitle}>
          Suporte
        </Text>

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

        <Text variant="sectionTitle" color="primary" style={styles.sectionTitle}>
          Sessão
        </Text>

        <ListItem
          title="Terminar Sessão"
          subtitle="Sair da aplicação"
          leftIcon="logout"
          onPress={logout}
        />

        <View style={styles.footer}>
          <Text variant="caption" color="muted">IPIZ Mobile App v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: 20,
    backgroundColor: colors.dark,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.paper,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
});

export default SettingsScreen;

