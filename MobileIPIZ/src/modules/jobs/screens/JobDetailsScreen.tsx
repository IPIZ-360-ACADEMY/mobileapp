import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, Button, Card, Screen, StateView } from '../../../core/ui';
import { RootStackParamList } from '../../../app/navigation/types';
import { useJobsStore } from '../store/useJobsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

export function JobDetailsScreen({ navigation, route }: Props): React.JSX.Element {
  const { jobs } = useJobsStore();

  const selectedJob = useMemo(() => {
    return jobs.find((job) => job.id === route.params.jobId) ?? null;
  }, [jobs, route.params.jobId]);

  if (!selectedJob) {
    return (
      <StateView
        type="empty"
        title="Vaga nao encontrada"
        description="Este item pode ter sido removido ou atualizado."
        actionLabel="Voltar"
        onAction={() => navigation.goBack()}
      />
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">{selectedJob.title}</AppText>
        <AppText variant="label" tone="primary">{selectedJob.company}</AppText>
      </View>

      <Card style={styles.card}>
        <InfoRow label="Local" value={selectedJob.location} />
        <InfoRow label="Contrato" value={selectedJob.contract} />
        <InfoRow label="Faixa" value={selectedJob.salary} />
        <InfoRow label="Publicado" value={selectedJob.postedAt} />
      </Card>

      <Card>
        <AppText variant="h3">Resumo da oportunidade</AppText>
        <AppText variant="body" tone="muted" style={styles.summary}>
          {selectedJob.summary}
        </AppText>
      </Card>

      <Button label="Candidatar-se" style={styles.cta} onPress={() => {}} />
      <Button label="Voltar" variant="ghost" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <AppText variant="caption" tone="muted">{label}</AppText>
      <AppText variant="label">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    gap: 8,
  },
  card: {
    marginBottom: 12,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  summary: {
    marginTop: 8,
  },
  cta: {
    marginTop: 16,
    marginBottom: 4,
  },
});
