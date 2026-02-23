import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// `@react-navigation/bottom-tabs` may not be installed in some environments.
// We avoid a static import to prevent bundler errors; attempt a runtime require
// and provide a graceful fallback if unavailable.
let createBottomTabNavigator: any;
try {
  // Use eval('require') to avoid static analysis by Metro bundler
  // which would otherwise try to resolve the module at bundle time.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  // @ts-ignore
  const req = eval('require');
  createBottomTabNavigator = req('@react-navigation/bottom-tabs')?.createBottomTabNavigator ?? null;
} catch (e) {
  createBottomTabNavigator = null;
}
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../features/auth/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { StudentDashboard } from '../features/student/StudentDashboard';
import { TeacherDashboard } from '../features/teacher/TeacherDashboard';
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { CompanyDashboard } from '../features/company/CompanyDashboard';
import { AlumniDashboard } from '../features/alumni/AlumniDashboard';
import { ProfileScreen } from '../features/auth/ProfileScreen';
import { EditProfileScreen } from '../features/auth/EditProfileScreen';
import { JobListScreen } from '../features/jobs/JobListScreen';
import { JobDetailScreen } from '../features/jobs/JobDetailScreen';
import { PostJobScreen } from '../features/jobs/PostJobScreen';
import { AlumniProfileScreen } from '../features/alumni/AlumniProfileScreen';
import { EditAlumniProfileScreen } from '../features/alumni/EditAlumniProfileScreen';
import { CertificateScreen } from '../features/alumni/CertificateScreen';
import { MentorshipScreen } from '../features/alumni/MentorshipScreen';
import { UserRole } from '../types/user.types';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  StudentDashboard: undefined;
  TeacherDashboard: undefined;
  AdminDashboard: undefined;
  CompanyDashboard: undefined;
  AlumniDashboard: undefined;
  Profile: undefined;
  EditProfile: undefined;
  JobList: undefined;
  JobDetail: { jobId: string };
  PostJob: undefined;
  AlumniProfile: undefined;
  EditAlumniProfile: undefined;
  Certificate: undefined;
  Mentorship: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  animation: 'fade',
  contentStyle: { backgroundColor: colors.background.default },
} as const;

const Tab = createBottomTabNavigator ? createBottomTabNavigator() : null;

const HomeTabs: FC<{ role?: string }> = ({ role }) => {
  const DashboardComponent = () => {
    switch (role) {
      case UserRole.STUDENT:
        return <StudentDashboard />;
      case UserRole.TEACHER:
        return <TeacherDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.COMPANY:
        return <CompanyDashboard />;
      case UserRole.ALUMNI:
        return <AlumniDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  if (Tab) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.background.paper, borderTopColor: colors.neutral[200] },
          tabBarActiveTintColor: colors.primary[700],
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardComponent} />
        <Tab.Screen name="Jobs" component={JobListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  // Fallback: bottom-tabs not available — render Dashboard with links to Jobs/Profile.
  // This avoids bundler errors and still provides navigation without adding packages.
  const Fallback: FC = () => {
    return (
      <>
        <DashboardComponent />
      </>
    );
  };

  return <Fallback />;
};

export const AppNavigator: FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardByRole = () => {
    if (!user) return 'Login';
    
    switch (user.role) {
      case UserRole.STUDENT:
        return 'StudentDashboard';
      case UserRole.TEACHER:
        return 'TeacherDashboard';
      case UserRole.ADMIN:
        return 'AdminDashboard';
      case UserRole.COMPANY:
        return 'CompanyDashboard';
      case UserRole.ALUMNI:
        return 'AlumniDashboard';
      default:
        return 'Login';
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={screenOptions}
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home">
          {() => <HomeTabs role={user?.role} />}
        </Stack.Screen>
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CompanyDashboard" component={CompanyDashboard} />
        <Stack.Screen name="AlumniDashboard" component={AlumniDashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="PostJob" component={PostJobScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="AlumniProfile" component={AlumniProfileScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="EditAlumniProfile" component={EditAlumniProfileScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Certificate" component={CertificateScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Mentorship" component={MentorshipScreen} options={{ animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
