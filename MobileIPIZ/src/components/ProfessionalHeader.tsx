import React, { useState } from 'react';
import { Pressable, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../contexts/ThemeContext';
import { Box, Text, Button } from './base';

const { width } = Dimensions.get('window');

interface ProfessionalHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotifications?: () => void;
  showSearch?: boolean;
  onSearch?: () => void;
  showMenu?: boolean;
  onMenu?: () => void;
  rightActions?: React.ReactNode[];
  variant?: 'primary' | 'secondary' | 'transparent';
}

/**
 * ProfessionalHeader - Header profissional e responsivo
 * Suporta navegação, notificações, busca e menu
 */
export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showNotifications = false,
  notificationCount = 0,
  onNotifications,
  showSearch = false,
  onSearch,
  showMenu = false,
  onMenu,
  rightActions = [],
  variant = 'primary',
}) => {
  const { theme } = useAppTheme();

  const headerStyles = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      textColor: '#fff',
      subtitleColor: 'rgba(255,255,255,0.8)',
    },
    secondary: {
      backgroundColor: theme.background.secondary,
      textColor: theme.text.primary,
      subtitleColor: theme.text.secondary,
    },
    transparent: {
      backgroundColor: 'transparent',
      textColor: theme.text.primary,
      subtitleColor: theme.text.secondary,
    },
  };

  const currentStyle = headerStyles[variant];

  return (
    <Box
      style={{
        backgroundColor: currentStyle.backgroundColor,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: variant === 'transparent' ? 0 : 1,
        borderBottomColor: theme.border.light,
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
          {showBack && (
            <Pressable
              onPress={onBack}
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
        <Box flexDirection="row" alignItems="center" gap={8}>
          {showSearch && (
            <Pressable
              onPress={onSearch}
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
              onPress={onNotifications}
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

          {showMenu && (
            <Pressable
              onPress={onMenu}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text
                variant="h2"
                style={{ color: currentStyle.textColor }}
              >
                ⋮
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

// Header com navegação completa
interface NavigationHeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  theme: any;
  notificationCount?: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onNavigate,
  theme,
  notificationCount = 0,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const screens = [
    { id: 'splash', label: 'Splash', icon: '🏠' },
    { id: 'login', label: 'Login', icon: '🔐' },
    { id: 'student', label: 'Aluno', icon: '👨‍🎓' },
    { id: 'teacher', label: 'Professor', icon: '👨‍🏫' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼' },
    { id: 'feed', label: 'Feed', icon: '📱' },
    { id: 'jobs', label: 'Vagas', icon: '💼' },
    { id: 'alumni', label: 'Alumni', icon: '👥' },
  ];

  const currentScreenData = screens.find(s => s.id === currentScreen);

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const handleScreenSelect = (screenId: string) => {
    onNavigate(screenId);
    setShowMenu(false);
  };

  const handleNotifications = () => {
    Alert.alert('Notificações', 'Funcionalidade em desenvolvimento');
  };

  const handleSearch = () => {
    Alert.alert('Busca', 'Funcionalidade em desenvolvimento');
  };

  return (
    <Box>
      <ProfessionalHeader
        title={currentScreenData?.label || 'App'}
        subtitle={currentScreenData ? `Tela ${currentScreenData.label}` : undefined}
        showMenu={true}
        onMenu={handleMenuPress}
        showNotifications={true}
        notificationCount={notificationCount}
        onNotifications={handleNotifications}
        showSearch={currentScreen === 'jobs' || currentScreen === 'feed'}
        onSearch={handleSearch}
        variant="primary"
      />

      {/* Menu Dropdown */}
      {showMenu && (
        <Box
          style={{
            position: 'absolute',
            top: 70,
            right: 16,
            backgroundColor: theme.background.secondary,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
            zIndex: 1000,
            minWidth: 200,
            maxWidth: width * 0.8,
          }}
        >
          {screens.map((screen) => (
            <Pressable
              key={screen.id}
              onPress={() => handleScreenSelect(screen.id)}
              style={{
                padding: 16,
                borderBottomWidth: screen.id === screens[screens.length - 1].id ? 0 : 1,
                borderBottomColor: theme.border.light,
                backgroundColor: currentScreen === screen.id
                  ? theme.palette.primary.main + '20'
                  : 'transparent',
              }}
            >
              <Box flexDirection="row" alignItems="center" gap={12}>
                <Text variant="h3">{screen.icon}</Text>
                <Text
                  variant="body"
                  weight={currentScreen === screen.id ? 'bold' : 'normal'}
                  style={{
                    color: currentScreen === screen.id
                      ? theme.palette.primary.main
                      : theme.text.primary,
                  }}
                >
                  {screen.label}
                </Text>
                {currentScreen === screen.id && (
                  <Box style={{ marginLeft: 'auto' }}>
                    <Text variant="body" style={{ color: theme.palette.primary.main }}>
                      ✓
                    </Text>
                  </Box>
                )}
              </Box>
            </Pressable>
          ))}

          {/* Divider */}
          <Box
            style={{
              height: 1,
              backgroundColor: theme.border.light,
              marginVertical: 8,
            }}
          />

          {/* Theme Toggle */}
          <Pressable
            onPress={() => Alert.alert('Tema', 'Alternar tema em desenvolvimento')}
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text variant="h3">🌙</Text>
            <Text variant="body">Alternar Tema</Text>
          </Pressable>
        </Box>
      )}

      {/* Overlay para fechar menu */}
      {showMenu && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 999,
          }}
          onPress={() => setShowMenu(false)}
        />
      )}
    </Box>
  );
};
