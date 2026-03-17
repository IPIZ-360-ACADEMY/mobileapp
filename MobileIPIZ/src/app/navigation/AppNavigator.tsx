import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from '../../modules/home/screens/HomeScreen';
import { JobsScreen } from '../../modules/jobs/screens/JobsScreen';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';
import { JobDetailsScreen } from '../../modules/jobs/screens/JobDetailsScreen';
import { LegacyFeedScreen } from '../../modules/feed/screens/LegacyFeedScreen';
import { SplashScreen } from '../../modules/splash/screens/SplashScreen';
import { StudentDashboardScreen } from '../../modules/student/screens/StudentDashboardScreen';
import { AuthLoginScreen } from '../../modules/auth/screens/AuthLoginScreen';
import { RootManagementScreen } from '../../modules/admin/screens/RootManagementScreen';
import { AppText } from '../../core/ui';
import { useAppTheme } from '../../core/theme';
import { RootStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabLabel({ focused, label }: { focused: boolean; label: string }): React.JSX.Element {
  return (
    <View>
      <AppText variant="caption" tone={focused ? 'primary' : 'muted'}>
        {label}
      </AppText>
    </View>
  );
}

function TabsNavigator(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIconStyle: { display: 'none' },
        tabBarItemStyle: styles.tabItem,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Inicio" /> }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Vagas" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Perfil" /> }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator(): React.JSX.Element {
  const theme = useAppTheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      card: theme.colors.surface,
      border: theme.colors.border,
      text: theme.colors.text,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="AuthLogin"
          component={AuthLoginScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitle: 'Login',
          }}
        />
        <Stack.Screen name="MainTabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="RootManagement"
          component={RootManagementScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitle: 'Gestao SUPER_ROOT',
          }}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetailsScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitle: 'Detalhes',
          }}
        />
        <Stack.Screen
          name="LegacyFeed"
          component={LegacyFeedScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitle: 'Feed',
          }}
        />
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboardScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitle: 'Painel do Estudante',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 4,
  },
});
