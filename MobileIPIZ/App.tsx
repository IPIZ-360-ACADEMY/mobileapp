


import React, { FC } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/app/AppNavigator';



const App: FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />

    </AuthProvider>
   
  );
};

export default App;
