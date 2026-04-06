import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { StudentDashboard } from '../features/student/StudentDashboard';
import { TeacherDashboard } from '../features/teacher/TeacherDashboard';
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { JobListScreen } from '../features/jobs/JobListScreen';
import { JobDetailScreen } from '../features/jobs/JobDetailScreen';
import { PostJobScreen } from '../features/jobs/PostJobScreen';
import { AlumniDashboard } from '../features/alumni/AlumniDashboard';
import { AlumniProfileScreen } from '../features/alumni/AlumniProfileScreen';
import { CertificateScreen } from '../features/alumni/CertificateScreen';
import { EditAlumniProfileScreen } from '../features/alumni/EditAlumniProfileScreen';
import { MentorshipScreen } from '../features/alumni/MentorshipScreen';
import { ProfileScreen } from '../features/auth/ProfileScreen';
import { AcademicScheduleScreen } from '../features/student/AcademicScheduleScreen';
import { AnnouncementsScreen } from '../features/student/AnnouncementsScreen';
import { GradesScreen } from '../features/student/GradesScreen';
import { SettingsScreen } from '../features/student/SettingsScreen';
import { useAuth } from '../contexts/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTab: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cursos: undefined;
  Rede: undefined;
  Perfil: undefined;
};

export type HomeStackParamList = {
  StudentDashboard: undefined;
  TeacherDashboard: undefined;
  AdminDashboard: undefined;
  AlumniDashboard: undefined;
  AcademicSchedule: undefined;
  Announcements: undefined;
  Grades: undefined;
  Settings: undefined;
};

export type JobsStackParamList = {
  JobList: undefined;
  JobDetail: { jobId: string };
  PostJob: undefined;
};

export type AlumniStackParamList = {
  AlumniDashboard: undefined;
  AlumniProfile: { alumniId: string };
  Certificate: { alumniId: string };
  EditAlumniProfile: { alumniId: string };
  Mentorship: { alumniId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const JobsStack = createNativeStackNavigator<JobsStackParamList>();
const AlumniStack = createNativeStackNavigator<AlumniStackParamList>();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Feed: '🏠',
    Cursos: '📚',
    Rede: '🔗',
    Perfil: '👤',
  };
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIconText, focused && styles.tabIconActive]}>
        {icons[name] || '●'}
      </Text>
    </View>
  );
};

const HomeStackNavigator = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'teacher' ? (
        <HomeStack.Screen name="TeacherDashboard" component={TeacherDashboard} />
      ) : role === 'admin' ? (
        <HomeStack.Screen name="AdminDashboard" component={AdminDashboard} />
      ) : role === 'alumni' ? (
        <HomeStack.Screen name="AlumniDashboard" component={AlumniDashboard} />
      ) : (
        <HomeStack.Screen name="StudentDashboard" component={StudentDashboard} />
      )}
      <HomeStack.Screen name="AcademicSchedule" component={AcademicScheduleScreen} />
      <HomeStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <HomeStack.Screen name="Grades" component={GradesScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
};

const JobsStackNavigator = () => (
  <JobsStack.Navigator screenOptions={{ headerShown: false }}>
    <JobsStack.Screen name="JobList" component={JobListScreen} />
    <JobsStack.Screen name="JobDetail" component={JobDetailScreen} />
    <JobsStack.Screen name="PostJob" component={PostJobScreen} />
  </JobsStack.Navigator>
);

const AlumniStackNavigator = () => (
  <AlumniStack.Navigator screenOptions={{ headerShown: false }}>
    <AlumniStack.Screen name="AlumniDashboard" component={AlumniDashboard} />
    <AlumniStack.Screen name="AlumniProfile" component={AlumniProfileScreen} />
    <AlumniStack.Screen name="Certificate" component={CertificateScreen} />
    <AlumniStack.Screen name="EditAlumniProfile" component={EditAlumniProfileScreen} />
    <AlumniStack.Screen name="Mentorship" component={MentorshipScreen} />
  </AlumniStack.Navigator>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0D9488',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Feed' }} />
      <Tab.Screen name="Cursos" component={JobsStackNavigator} options={{ title: 'Cursos' }} />
      <Tab.Screen name="Rede" component={AlumniStackNavigator} options={{ title: 'Rede' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const ipizTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#F8FAFC',
      card: '#FFFFFF',
      text: '#0F172A',
      border: '#E2E8F0',
    },
  };

  return (
    <NavigationContainer theme={ipizTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E8F0',
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
});

export default AppNavigator;
