import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

// Define RootStackParamList to match AppNavigator.tsx
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined;
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
  AcademicSchedule: undefined;
  Grades: undefined;
  Announcements: undefined;
  Settings: undefined;
};

export type NativeStackNavProp<Screen extends keyof RootStackParamList> =
	NativeStackNavigationProp<RootStackParamList, Screen>;

export type AppRouteProp<Name extends keyof RootStackParamList> =
	RouteProp<RootStackParamList, Name>;
