import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@contexts/ThemeContext';

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
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background.secondary,
          borderTopColor: theme.border.light,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarInactiveTintColor: theme.text.secondary,
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
          tabBarIcon: () => '🏠',
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStackNavigator}
        options={{
          title: 'Academic',
          tabBarIcon: () => '🎓',
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
  const { scheme } = useAppTheme();

  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
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
