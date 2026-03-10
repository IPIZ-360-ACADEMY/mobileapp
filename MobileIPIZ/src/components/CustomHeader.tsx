import React, { useState } from 'react';
import { Pressable, Dimensions, Alert, View } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppTheme } from '../contexts/ThemeContext';
import { Box, Text, Button } from '../components/base';

const { width } = Dimensions.get('window');

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showDrawer?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotifications?: () => void;
  showSearch?: boolean;
  onSearch?: () => void;
  rightActions?: React.ReactNode[];
  variant?: 'primary' | 'secondary' | 'transparent';
  showThemeToggle?: boolean;
}

/**
 * CustomHeader - Header profissional integrado com React Navigation
 * Suporta drawer, back navigation, notificações, busca e tema
 */
export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showDrawer = true,
  showNotifications = true,
  notificationCount = 0,
  onNotifications,
  showSearch = false,
  onSearch,
  rightActions = [],
  variant = 'primary',
  showThemeToggle = true,
}) => {
  const { theme, scheme, toggleScheme } = useAppTheme();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const headerStyles = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      textColor: '#fff',
      subtitleColor: 'rgba(255,255,255,0.8)',
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: theme.background.secondary,
      textColor: theme.text.primary,
      subtitleColor: theme.text.secondary,
      borderColor: theme.border.light,
    },
    transparent: {
      backgroundColor: 'transparent',
      textColor: theme.text.primary,
      subtitleColor: theme.text.secondary,
      borderColor: 'transparent',
    },
  };

  const currentStyle = headerStyles[variant];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifications = () => {
    if (onNotifications) {
      onNotifications();
    } else {
      Alert.alert('Notificações', 'Você tem 3 novas notificações');
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    } else {
      Alert.alert('Busca', 'Funcionalidade de busca');
    }
  };

  const handleThemeToggle = () => {
    toggleScheme();
  };

  return (
    <Box
      style={{
        backgroundColor: currentStyle.backgroundColor,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 50, // Safe area
        borderBottomWidth: variant === 'transparent' ? 0 : 1,
        borderBottomColor: currentStyle.borderColor,
      }}
    >
      {/* Top Row */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={subtitle ? 4 : 0}
      >
        {/* Left Section */}
        <Box flexDirection="row" alignItems="center" gap={12} flex={1}>
          {showDrawer && (
            <Pressable
              onPress={handleDrawer}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                ☰
              </Text>
            </Pressable>
          )}

          {showBack && (
            <Pressable
              onPress={handleBack}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                ←
              </Text>
            </Pressable>
          )}

          {/* Title */}
          <Box flex={1}>
            <Text
              variant="h3"
              weight="bold"
              style={{
                color: currentStyle.textColor,
                fontSize: width < 380 ? 16 : 18,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </Box>
        </Box>

        {/* Right Section */}
        <Box flexDirection="row" alignItems="center" gap={4}>
          {showSearch && (
            <Pressable
              onPress={handleSearch}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                🔍
              </Text>
            </Pressable>
          )}

          {showNotifications && (
            <Pressable
              onPress={handleNotifications}
              style={{
                padding: 8,
                borderRadius: 8,
                position: 'relative',
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                🔔
              </Text>
              {notificationCount > 0 && (
                <Box
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: theme.palette.error.main,
                    borderRadius: 999,
                    minWidth: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: currentStyle.backgroundColor,
                  }}
                >
                  <Text
                    variant="caption"
                    style={{
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </Box>
              )}
            </Pressable>
          )}

          {showThemeToggle && (
            <Pressable
              onPress={handleThemeToggle}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                {scheme === 'dark' ? '☀️' : '🌙'}
              </Text>
            </Pressable>
          )}

          {rightActions.map((action, index) => (
            <Box key={index}>{action}</Box>
          ))}
        </Box>
      </Box>

      {/* Subtitle */}
      {subtitle && (
        <Text
          variant="bodySmall"
          style={{
            color: currentStyle.subtitleColor,
            fontSize: width < 380 ? 12 : 14,
          }}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

// Header específico para cada tela
export const StudentHeader = () => (
  <CustomHeader
    title="Dashboard Aluno"
    subtitle="Bem-vindo de volta! Aqui estão suas atividades"
    showDrawer={true}
    showNotifications={true}
    notificationCount={3}
    showSearch={false}
    variant="primary"
  />
);

export const TeacherHeader = () => (
  <CustomHeader
    title="Dashboard Professor"
    subtitle="Gerencie suas turmas e avaliações"
    showDrawer={true}
    showNotifications={true}
    notificationCount={7}
    showSearch={false}
    variant="primary"
  />
);

export const AdminHeader = () => (
  <CustomHeader
    title="Painel Administrativo"
    subtitle="Controle e monitore o sistema"
    showDrawer={true}
    showNotifications={true}
    notificationCount={12}
    showSearch={false}
    variant="primary"
  />
);

export const FeedHeader = () => (
  <CustomHeader
    title="Feed Social"
    subtitle="Conecte-se com a comunidade"
    showDrawer={true}
    showNotifications={true}
    notificationCount={5}
    showSearch={true}
    variant="primary"
  />
);

export const JobsHeader = () => (
  <CustomHeader
    title="Vagas de Emprego"
    subtitle="Oportunidades profissionais"
    showDrawer={true}
    showNotifications={true}
    notificationCount={2}
    showSearch={true}
    variant="primary"
  />
);

export const AlumniHeader = () => (
  <CustomHeader
    title="Rede Alumni"
    subtitle="Conecte-se com ex-alunos"
    showDrawer={true}
    showNotifications={true}
    notificationCount={4}
    showSearch={false}
    variant="primary"
  />
);

export const LoginHeader = () => (
  <CustomHeader
    title="Login"
    subtitle="Entre na sua conta"
    showBack={false}
    showDrawer={false}
    showNotifications={false}
    showSearch={false}
    showThemeToggle={true}
    variant="secondary"
  />
);

export const SplashHeader = () => null; // No header for splash
