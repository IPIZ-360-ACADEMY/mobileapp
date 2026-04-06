import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Input, Screen, StateView, AppText } from '../../../core/ui';
import { useAppTheme } from '../../../core/theme';
import { JobCard } from '../components/JobCard';
import { useJobsStore } from '../store/useJobsStore';
import { RootStackParamList, RootTabParamList } from '../../../app/navigation/types';

type Props = BottomTabScreenProps<RootTabParamList, 'Jobs'>;

export function JobsScreen({}: Props): React.JSX.Element {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppTheme();
  const [query, setQuery] = useState('');
  const { jobs, status, errorMessage, fetchJobs } = useJobsStore();

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return jobs;
    }

    return jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(normalized) ||
        job.company.toLowerCase().includes(normalized) ||
        job.location.toLowerCase().includes(normalized)
      );
    });
  }, [jobs, query]);

  const handleOpenJob = useCallback(
    (jobId: string) => {
      rootNavigation.navigate('JobDetails', { jobId });
    },
    [rootNavigation],
  );

  const handleRetry = useCallback(() => {
    void fetchJobs(true);
  }, [fetchJobs]);

  const refreshing = status === 'loading' && jobs.length > 0;

  if (status === 'loading' && jobs.length === 0) {
    return <StateView type="loading" title="Carregando vagas" description="Estamos buscando as melhores oportunidades para si." />;
  }

  if (status === 'error' && jobs.length === 0) {
    return (
      <StateView
        type="error"
        title="Nao foi possivel carregar"
        description={errorMessage ?? 'Verifique sua ligacao e tente novamente.'}
        actionLabel="Tentar novamente"
        onAction={handleRetry}
      />
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="h2">Vagas</AppText>
        <AppText variant="body" tone="muted">Interface limpa para encontrar oportunidades rapidamente.</AppText>
      </View>

      <Input
        label="Pesquisar"
        placeholder="Titulo, empresa ou local"
        value={query}
        onChangeText={setQuery}
      />

      {filteredJobs.length === 0 ? (
        <View style={styles.emptyWrap}>
          <StateView
            type="empty"
            title="Sem resultados"
            description="Ajuste os filtros para encontrar novas vagas."
            actionLabel="Limpar pesquisa"
            onAction={() => setQuery('')}
          />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard item={item} onPress={handleOpenJob} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRetry}
              tintColor={theme.colors.primary}
            />
          }
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={10}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    gap: 8,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  emptyWrap: {
    flex: 1,
    marginTop: 16,
  },
});
