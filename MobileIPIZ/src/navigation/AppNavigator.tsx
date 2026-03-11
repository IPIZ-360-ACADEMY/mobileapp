import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { StudentDashboard } from '../features/student/StudentDashboard';
import { TeacherDashboard } from '../features/teacher/TeacherDashboard';
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { FeedScreen } from '../screens/FeedScreen';
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

// Import headers
// Removed unused headers

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTab: undefined;
};

export type MainTabParamList = {
  StudentDashboard: undefined;
  TeacherDashboard: undefined;
  AdminDashboard: undefined;
  Feed: undefined;
  Jobs: undefined;
  Alumni: undefined;
  Profile: undefined;
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

export type StudentStackParamList = {
  StudentDashboard: undefined;
  AcademicSchedule: undefined;
  Announcements: undefined;
  Grades: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const JobsStack = createNativeStackNavigator<JobsStackParamList>();
const AlumniStack = createNativeStackNavigator<AlumniStackParamList>();
const StudentStack = createNativeStackNavigator<StudentStackParamList>();

/**
 * Jobs Stack Navigator
 */
const JobsStackNavigator = () => (
  <JobsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <JobsStack.Screen name="JobList" component={JobListScreen} />
    <JobsStack.Screen name="JobDetail" component={JobDetailScreen} />
    <JobsStack.Screen name="PostJob" component={PostJobScreen} />
  </JobsStack.Navigator>
);

/**
 * Alumni Stack Navigator
 */
const AlumniStackNavigator = () => (
  <AlumniStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AlumniStack.Screen name="AlumniDashboard" component={AlumniDashboard} />
    <AlumniStack.Screen name="AlumniProfile" component={AlumniProfileScreen} />
    <AlumniStack.Screen name="Certificate" component={CertificateScreen} />
    <AlumniStack.Screen name="EditAlumniProfile" component={EditAlumniProfileScreen} />
    <AlumniStack.Screen name="Mentorship" component={MentorshipScreen} />
  </AlumniStack.Navigator>
);

/**
 * Student Stack Navigator
 */
const StudentStackNavigator = () => (
  <StudentStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <StudentStack.Screen name="StudentDashboard" component={StudentDashboard} />
    <StudentStack.Screen name="AcademicSchedule" component={AcademicScheduleScreen} />
    <StudentStack.Screen name="Announcements" component={AnnouncementsScreen} />
    <StudentStack.Screen name="Grades" component={GradesScreen} />
    <StudentStack.Screen name="Settings" component={SettingsScreen} />
  </StudentStack.Navigator>
);

/**
 * Main Tab Navigator
 */
const MainTabNavigator = () => {
  // Use simple fallback colors instead of theme
  const tabBarBg = '#f8fafc';
  const tabBarBorder = '#e2e8f0';
  const activeColor = '#0ea5e9';
  const inactiveColor = '#475569';

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: tabBarBorder,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="StudentDashboard"
        component={StudentStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStackNavigator}
        options={{
          title: 'Academic',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🎓</Text>,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: () => '🔔',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: () => '👤',
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 */
const RootStackNavigator = () => {
  // Use React Navigation default theme instead of custom theme
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
