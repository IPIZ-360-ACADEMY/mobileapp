import React from 'react';
import { AppProviders } from './src/app/AppProviders';
import { AppNavigator } from './src/app/navigation/AppNavigator';

const App = () => {
  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
};

export default App;
