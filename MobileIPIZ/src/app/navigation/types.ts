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
  MainTabs: undefined;
  RootManagement: undefined;
  JobDetails: { jobId: string };
  LegacyFeed: undefined;
  StudentDashboard: undefined;
};
