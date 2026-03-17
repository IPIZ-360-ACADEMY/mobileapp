import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { checkBackendHealth } from '../../../core/api/healthApi';
import { env } from '../../../core/config/env';
import { useAppTheme } from '../../../core/theme';
import { useAuthStore } from '../../../core/store/useAuthStore';
import { AppText } from '../../../core/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
type SplashStatus = 'checking' | 'online' | 'offline' | 'mock';

export function SplashScreen({ navigation }: Props): React.JSX.Element {
  const theme = useAppTheme();
  const [status, setStatus] = useState<SplashStatus>('checking');
  const bootstrapAuth = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const bootstrap = async (): Promise<void> => {
      if (env.useMockApi) {
        if (mounted) {
          setStatus('mock');
        }
      } else {
        const health = await checkBackendHealth();
        if (mounted) {
          setStatus(health.ok ? 'online' : 'offline');
        }
      }

      await bootstrapAuth();

      timer = setTimeout(() => {
        if (mounted) {
          const isAuthenticated = useAuthStore.getState().isAuthenticated;
          navigation.replace(isAuthenticated ? 'MainTabs' : 'AuthLogin');
        }
      }, 900);
    };

    void bootstrap();

    return () => {
      mounted = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [navigation, bootstrapAuth]);

  const statusLabel = useMemo(() => {
    if (status === 'checking') {
      return 'Validando conexao com backend';
    }

    if (status === 'online') {
      return 'Backend online';
    }

    if (status === 'mock') {
      return 'Modo mock ativo';
    }

    return 'Backend indisponivel, continuando com app';
  }, [status]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.logoWrap, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <AppText variant="h2" tone="primary">
          IPIZ
        </AppText>
      </View>

      <AppText variant="h2" style={styles.title}>
        IPIZ Mobile
      </AppText>
      <AppText variant="body" tone="muted" style={styles.subtitle}>
        Instituto Politecnico Industrial
      </AppText>

      <View style={styles.statusRow}>
        {status === 'checking' ? <ActivityIndicator size="small" color={theme.colors.primary} /> : null}
        <AppText variant="caption" tone={status === 'offline' ? 'error' : 'muted'}>
          {statusLabel}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 18,
  },
  subtitle: {
    marginTop: 6,
    textAlign: 'center',
  },
  statusRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
