import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

interface NavItem {
  label: string;
  icon: string;
  screen: string;
  screenName?: string;
}

const navItems: NavItem[] = [
  { label: 'Início', icon: '🏠', screen: 'StudentDashboard', screenName: 'StudentDashboard' },
  { label: 'Cursos', icon: '📚', screen: 'Jobs', screenName: 'JobList' },
  { label: 'Notificações', icon: '🔔', screen: 'Feed', screenName: 'FeedScreen' },
  { label: 'Perfil', icon: '👤', screen: 'Profile', screenName: 'ProfileScreen' },
];

export const ProfessionalNavBar = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<any>();
  const [activeRoute, setActiveRoute] = useState('StudentDashboard');

  const handleNavigation = (screenName: string) => {
    setActiveRoute(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View className={`bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm`}>
      <View className="px-4 py-3">
        {/* Logo e branding */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-3">
            <Text className="text-2xl">🎓</Text>
            <View>
              <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">IPIZ Academy</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Instituto Técnico</Text>
            </View>
          </View>
          <Pressable className="p-2">
            <Text className="text-xl">⚙️</Text>
          </Pressable>
        </View>

        {/* Menu horizontal (navegação) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-2"
          contentContainerStyle={{ gap: 8 }}
        >
          {navItems.map((item) => (
            <Pressable
              key={item.screen}
              onPress={() => handleNavigation(item.screenName || item.screen)}
              className={`flex-row items-center px-4 py-2 rounded-full transition-colors ${
                activeRoute === (item.screenName || item.screen)
                  ? 'bg-blue-600 dark:bg-blue-700'
                  : 'bg-gray-100 dark:bg-slate-800'
              }`}
            >
              <Text className="text-lg mr-2">{item.icon}</Text>
              <Text
                className={`text-sm font-semibold ${
                  activeRoute === (item.screenName || item.screen)
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfessionalNavBar;
