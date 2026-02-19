import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
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
} as const;

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
        initialRouteName={isAuthenticated ? getDashboardByRole() : 'Login'}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CompanyDashboard" component={CompanyDashboard} />
        <Stack.Screen name="AlumniDashboard" component={AlumniDashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="PostJob" component={PostJobScreen} />
        <Stack.Screen name="AlumniProfile" component={AlumniProfileScreen} />
        <Stack.Screen name="EditAlumniProfile" component={EditAlumniProfileScreen} />
        <Stack.Screen name="Certificate" component={CertificateScreen} />
        <Stack.Screen name="Mentorship" component={MentorshipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
