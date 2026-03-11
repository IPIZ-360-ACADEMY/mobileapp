import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/hooks/useTheme';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * App Root - Providers
 * Professional theme system with Tailwind CSS integration
 */
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultTheme="light">
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

