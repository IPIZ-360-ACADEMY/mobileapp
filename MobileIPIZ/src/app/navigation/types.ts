import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Feed: undefined;
  Jobs: undefined;
  Academic: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  AuthLogin: undefined;
  MainTabs: NavigatorScreenParams<RootTabParamList> | undefined;
  RootManagement: undefined;
  JobDetails: { jobId: string };
  LegacyFeed: undefined;
  StudentDashboard: undefined;
};
