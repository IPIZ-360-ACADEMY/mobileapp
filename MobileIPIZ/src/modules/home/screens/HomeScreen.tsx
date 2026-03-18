import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppText, Button, Card, Screen } from '../../../core/ui';
import { RootTabParamList } from '../../../app/navigation/types';
import { useSessionStore } from '../../../core/store/useSessionStore';
import { useBackendHealth } from '../../../core/hooks/useBackendHealth';
import { useJobsStore } from '../../jobs/store/useJobsStore';
import { AppPermission, hasAppPermission } from '../../../core/rbac/policy';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const { userName, roleLabel, role } = useSessionStore();
  const backendHealth = useBackendHealth();
  const { jobs, fetchJobs } = useJobsStore();
  const canReadAcademic = hasAppPermission(role, AppPermission.ACADEMIC_READ_SELF);

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  const quickStats = useMemo(() => {
    return [
      { label: 'Vagas ativas', value: String(jobs.length) },
      { label: 'Perfil', value: roleLabel },
    ];
  }, [jobs.length, roleLabel]);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Ola, {userName}</AppText>
        <AppText variant="body" tone="muted">
          Plataforma mobile com foco em clareza, produtividade e manutencao escalavel.
        </AppText>
      </View>

      <View style={styles.statsGrid}>
        {quickStats.map((stat) => (
          <Card key={stat.label} style={styles.statCard}>
            <AppText variant="caption" tone="muted">{stat.label}</AppText>
            <AppText variant="h3" style={styles.statValue}>{stat.value}</AppText>
          </Card>
        ))}
      </View>

      <Card style={styles.healthCard}>
        <View style={styles.healthRow}>
          <AppText variant="caption" tone="muted">Conectividade backend</AppText>
          <AppText variant="caption" tone={backendHealth.tone}>{backendHealth.label}</AppText>
        </View>
        <Button
          label={backendHealth.isChecking ? 'A validar...' : 'Atualizar status'}
          variant="ghost"
          disabled={backendHealth.isChecking}
          onPress={() => {
            void backendHealth.refresh();
          }}
        />
      </Card>

      <Card style={styles.block}>
        <AppText variant="h3">Foco do dia</AppText>
        <AppText variant="body" tone="muted" style={styles.blockText}>
          Publique no feed, acompanhe vagas e mantenha seu perfil sempre atualizado com um fluxo simples.
        </AppText>
        <Button label="Abrir feed social" variant="secondary" onPress={() => navigation.navigate('Feed')} style={styles.tertiaryCta} />
        <Button label="Ver oportunidades" onPress={() => navigation.navigate('Jobs')} style={styles.cta} />
        {canReadAcademic ? (
          <Button
            label="Abrir painel academico"
            variant="secondary"
            onPress={() => navigation.navigate('Academic')}
            style={styles.secondaryCta}
          />
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    gap: 8,
  },
  healthCard: {
    gap: 8,
    marginBottom: 12,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  statValue: {
    marginTop: 2,
  },
  block: {
    gap: 10,
  },
  blockText: {
    marginTop: 2,
  },
  cta: {
    marginTop: 6,
  },
  secondaryCta: {
    marginTop: 2,
  },
  tertiaryCta: {
    marginTop: 2,
  },
});
