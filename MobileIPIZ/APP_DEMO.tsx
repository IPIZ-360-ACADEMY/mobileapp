// App.tsx atualizado - Teste as novas telas aqui

import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from './src/contexts/ThemeContext';
import { ProfessionalLoginScreen } from './src/features/auth/ProfessionalLoginScreen';
import { ProfessionalDashboard } from './src/features/student/ProfessionalDashboard';
import { ProfessionalTeacherDashboard } from './src/features/teacher/ProfessionalTeacherDashboard';
import { ProfessionalAdminDashboard } from './src/features/admin/ProfessionalAdminDashboard';
import { Box, Button } from './src/components/base';

/**
 * Componente Principal da App
 * Envolvido por ThemeProvider e SafeAreaProvider
 */
const MainApp = () => {
  const { theme, scheme, toggleScheme } = useAppTheme();
  const [currentScreen, setCurrentScreen] = React.useState<
    'login' | 'student' | 'teacher' | 'admin'
  >('student');

  return (
    <Box flex={1} style={{ backgroundColor: theme.background.primary }}>
      {currentScreen === 'login' && <ProfessionalLoginScreen />}
      {currentScreen === 'student' && <ProfessionalDashboard />}
      {currentScreen === 'teacher' && <ProfessionalTeacherDashboard />}
      {currentScreen === 'admin' && <ProfessionalAdminDashboard />}

      {/* Demo Navigation Bar */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 12,
          backgroundColor: theme.background.secondary,
          borderTopWidth: 1,
          borderTopColor: theme.border.light,
          flexDirection: 'row',
          gap: 6,
          justifyContent: 'center',
        }}
      >
        <Button
          label="Login"
          onPress={() => setCurrentScreen('login')}
          size="sm"
          variant={currentScreen === 'login' ? 'solid' : 'outline'}
          style={{ flex: 1 }}
        />
        <Button
          label="Aluno"
          onPress={() => setCurrentScreen('student')}
          size="sm"
          variant={currentScreen === 'student' ? 'solid' : 'outline'}
          style={{ flex: 1 }}
        />
        <Button
          label="Prof"
          onPress={() => setCurrentScreen('teacher')}
          size="sm"
          variant={currentScreen === 'teacher' ? 'solid' : 'outline'}
          style={{ flex: 1 }}
        />
        <Button
          label="Admin"
          onPress={() => setCurrentScreen('admin')}
          size="sm"
          variant={currentScreen === 'admin' ? 'solid' : 'outline'}
          style={{ flex: 1 }}
        />
        <Button
          label={scheme === 'dark' ? '☀️' : '🌙'}
          onPress={toggleScheme}
          size="sm"
          variant="outline"
          style={{ flex: 0.6 }}
        />
      </Box>
    </Box>
  );
};

/**
 * App Root - Providers
 */
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
