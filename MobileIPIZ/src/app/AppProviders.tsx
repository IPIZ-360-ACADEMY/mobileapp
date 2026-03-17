import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../core/theme';
import { configureHttpAuth } from '../core/api';
import { useAuthStore } from '../core/store/useAuthStore';

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
  useEffect(() => {
    configureHttpAuth({
      getAccessToken: () => useAuthStore.getState().accessToken,
      refreshAccessToken: () => useAuthStore.getState().refreshAccessToken(),
    });

    void useAuthStore.getState().bootstrap();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
