import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../../app/navigation/types';
import { AppText, Button, Card, Input, Screen } from '../../../core/ui';
import { useAuthStore } from '../../../core/store/useAuthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthLogin'>;

export function AuthLoginScreen({ navigation }: Props): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, status, errorMessage } = useAuthStore();

  const loading = status === 'loading';
  const isFormValid = useMemo(() => {
    return email.trim().length > 3 && password.trim().length >= 4;
  }, [email, password]);

  const handleLogin = async (): Promise<void> => {
    if (!isFormValid || loading) {
      return;
    }

    try {
      await login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch {
      // Handled by store error state.
    }
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Entrar</AppText>
        <AppText variant="body" tone="muted">
          Login unico para todos os perfis com sessao JWT + refresh token.
        </AppText>
      </View>

      <Card style={styles.formCard}>
        <Input
          label="Email"
          placeholder="seu.email@ipiz.ao"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? (
          <AppText variant="caption" tone="error">
            {errorMessage}
          </AppText>
        ) : null}

        <Button
          label={loading ? 'A autenticar...' : 'Entrar'}
          loading={loading}
          disabled={!isFormValid}
          onPress={() => {
            void handleLogin();
          }}
          style={styles.submitButton}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 16,
  },
  formCard: {
    gap: 12,
  },
  submitButton: {
    marginTop: 4,
  },
});