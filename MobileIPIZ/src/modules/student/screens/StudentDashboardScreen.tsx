import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { useSessionStore } from '../../../core/store/useSessionStore';
import { AppText, Button, Card, Screen, StateView } from '../../../core/ui';
import { getStudentAcademicOverview, StudentAcademicOverview } from '../services/studentApi';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Data indisponivel';
  }

  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function StudentDashboardScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userName } = useSessionStore();
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [academicOverview, setAcademicOverview] = useState<StudentAcademicOverview | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadOverview = async (): Promise<void> => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await getStudentAcademicOverview();
      setAcademicOverview(response);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao carregar o dashboard do estudante.');
    }
  };

  useEffect(() => {
    void loadOverview();
  }, []);

  if (status === 'loading' && !academicOverview) {
    return (
      <Screen>
        <StateView
          type="loading"
          title="A carregar painel academico"
          description="A preparar pauta da turma, notas particulares e proximas avaliacoes."
        />
      </Screen>
    );
  }

  if (status === 'error' && !academicOverview) {
    return (
      <Screen>
        <StateView
          type="error"
          title="Nao foi possivel abrir o painel"
          description={errorMessage || 'Verifique a ligacao ao backend e tente novamente.'}
          actionLabel="Tentar novamente"
          onAction={() => {
            void loadOverview();
          }}
        />
      </Screen>
    );
  }

  const overview = academicOverview;

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Painel do Estudante</AppText>
        <AppText variant="body" tone="muted">
          Bem-vindo, {userName}. Acompanhe media, pauta da turma e desempenho por disciplina.
        </AppText>
      </View>

      {overview ? (
        <Card style={styles.identityCard}>
          <AppText variant="h3">{overview.student.classGroupName || 'Turma nao vinculada'}</AppText>
          <AppText variant="caption" tone="muted">
            {overview.student.classGroupCode || 'Sem codigo'} · Ano {overview.student.academicYear || '--'} · Termo {overview.student.term || '--'}
          </AppText>
          {overview.emptyStateMessage ? (
            <AppText variant="caption" tone="error">{overview.emptyStateMessage}</AppText>
          ) : null}
        </Card>
      ) : null}

      {overview ? (
        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <AppText variant="caption" tone="muted">Media geral</AppText>
            <AppText variant="h3">{overview.summary.generalAverage.toFixed(1)}/20</AppText>
            <AppText variant="caption" tone="muted">Melhor: {overview.summary.bestSubjectName || 'Sem dados'}</AppText>
          </Card>
          <Card style={styles.metricCard}>
            <AppText variant="caption" tone="muted">Ranking</AppText>
            <AppText variant="h3">
              {overview.summary.classRank || '--'} / {overview.summary.classSize || '--'}
            </AppText>
            <AppText variant="caption" tone="muted">Pauta da turma ativa</AppText>
          </Card>
        </View>
      ) : null}

      {overview ? (
        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <AppText variant="caption" tone="muted">Frequencia</AppText>
            <AppText variant="h3">{overview.summary.attendanceRate}%</AppText>
            <AppText variant="caption" tone="muted">Assiduidade media</AppText>
          </Card>
          <Card style={styles.metricCard}>
            <AppText variant="caption" tone="muted">Conclusao</AppText>
            <AppText variant="h3">{overview.summary.completionRate}%</AppText>
            <AppText variant="caption" tone="muted">
              {overview.summary.approvedSubjects} aprovadas · {overview.summary.attentionSubjects} em atencao
            </AppText>
          </Card>
        </View>
      ) : null}

      <Card style={styles.actionsCard}>
        <AppText variant="h3">Acoes rapidas</AppText>
        <View style={styles.actionsWrap}>
          <Button label="Abrir feed" variant="secondary" onPress={() => navigation.navigate('LegacyFeed')} />
          <Button label="Ver vagas" onPress={() => navigation.navigate('MainTabs')} />
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <AppText variant="h3">Avaliacoes previstas</AppText>
        {overview?.upcomingEvaluations.length ? (
          <View style={styles.stack}>
            {overview.upcomingEvaluations.slice(0, 4).map((evaluation) => (
              <View key={evaluation.id} style={styles.listItem}>
                <AppText variant="label">{evaluation.title}</AppText>
                <AppText variant="caption" tone="muted">
                  {evaluation.subjectName} · {formatDate(evaluation.scheduledAt)} · Peso {evaluation.weightPercentage}%
                </AppText>
              </View>
            ))}
          </View>
        ) : (
          <AppText variant="caption" tone="muted">Sem avaliacoes agendadas para esta turma.</AppText>
        )}
      </Card>

      <Card style={styles.sectionCard}>
        <AppText variant="h3">Desempenho por disciplina</AppText>
        {overview?.subjectResults.length ? (
          <View style={styles.stack}>
            {overview.subjectResults.map((subject) => (
              <View key={subject.subjectId} style={styles.subjectCard}>
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectHeaderText}>
                    <AppText variant="label">{subject.subjectName}</AppText>
                    <AppText variant="caption" tone="muted">
                      {subject.subjectCode} · {subject.teacherName || 'Professor por definir'}
                    </AppText>
                  </View>
                  <AppText variant="bodyStrong" tone={subject.status === 'approved' ? 'success' : 'error'}>
                    {subject.finalAverage.toFixed(1)}/20
                  </AppText>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.max(6, Math.min(100, (subject.finalAverage / 20) * 100))}%`,
                        backgroundColor: subject.status === 'approved' ? '#047857' : '#B91C1C',
                      },
                    ]}
                  />
                </View>
                <View style={styles.subjectMetaRow}>
                  <AppText variant="caption" tone="muted">CA {subject.continuousAssessment.toFixed(1)}</AppText>
                  <AppText variant="caption" tone="muted">Projeto {subject.projectScore.toFixed(1)}</AppText>
                  <AppText variant="caption" tone="muted">Exame {subject.examScore.toFixed(1)}</AppText>
                  <AppText variant="caption" tone="muted">Freq. {subject.attendanceRate}%</AppText>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <AppText variant="caption" tone="muted">Ainda nao ha disciplinas ativas para calcular o desempenho.</AppText>
        )}
      </Card>

      <Card style={styles.sectionCard}>
        <AppText variant="h3">Pauta da turma</AppText>
        {overview?.classGradebook.length ? (
          <View style={styles.stack}>
            {overview.classGradebook.slice(0, 8).map((entry) => (
              <View key={entry.studentUserId} style={styles.gradebookRow}>
                <View style={styles.gradebookMeta}>
                  <AppText variant="label">#{entry.rank} · {entry.studentName}</AppText>
                  <AppText variant="caption" tone="muted">
                    {entry.status === 'approved' ? 'Aprovado' : 'Em atencao'}
                  </AppText>
                </View>
                <AppText variant="bodyStrong" tone={entry.status === 'approved' ? 'success' : 'error'}>
                  {entry.finalAverage.toFixed(1)}/20
                </AppText>
              </View>
            ))}
          </View>
        ) : (
          <AppText variant="caption" tone="muted">A pauta da turma fica disponivel assim que houver turma e disciplinas associadas.</AppText>
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 16,
  },
  identityCard: {
    gap: 6,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    gap: 6,
  },
  actionsCard: {
    gap: 10,
    marginBottom: 12,
  },
  actionsWrap: {
    gap: 8,
  },
  sectionCard: {
    gap: 10,
    marginBottom: 12,
  },
  stack: {
    gap: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
    gap: 4,
  },
  subjectCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  subjectHeaderText: {
    flex: 1,
    gap: 2,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  subjectMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gradebookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  gradebookMeta: {
    flex: 1,
    gap: 2,
  },
});
