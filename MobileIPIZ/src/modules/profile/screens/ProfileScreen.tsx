import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootTabParamList } from '../../../app/navigation/types';
import { useBackendHealth } from '../../../core/hooks/useBackendHealth';
import { AppPermission, AppRole, hasAppPermission } from '../../../core/rbac/policy';
import { useAuthStore } from '../../../core/store/useAuthStore';
import { useSessionStore } from '../../../core/store/useSessionStore';
import { AppText, Button, Card, Screen } from '../../../core/ui';
import { getStudentAcademicOverview, StudentAcademicOverview } from '../../student/services/studentApi';

type Props = BottomTabScreenProps<RootTabParamList, 'Profile'>;
type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export function ProfileScreen({ navigation }: Props): React.JSX.Element {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userName, roleLabel, role, permissions } = useSessionStore();
  const backendHealth = useBackendHealth();
  const logout = useAuthStore((state) => state.logout);

  const [academicStatus, setAcademicStatus] = useState<AsyncStatus>('idle');
  const [academicOverview, setAcademicOverview] = useState<StudentAcademicOverview | null>(null);
  const [academicError, setAcademicError] = useState<string | null>(null);

  const canAccessRootManagement = role === AppRole.SUPER_ROOT;
  const isStudent = role === AppRole.STUDENT;

  const canManageUsers =
    role === AppRole.SUPER_ROOT ||
    role === AppRole.ADMIN ||
    hasAppPermission(role, AppPermission.USER_ASSIGN_ROLE);

  const preferences = [
    { key: 'Modo de notificacao', value: 'Essencial' },
    { key: 'Idioma da interface', value: 'Portugues' },
    { key: 'Tema', value: 'Claro minimalista' },
  ];

  useEffect(() => {
    if (!isStudent) {
      setAcademicOverview(null);
      setAcademicStatus('idle');
      setAcademicError(null);
      return;
    }

    let isMounted = true;

    const loadAcademicOverview = async (): Promise<void> => {
      setAcademicStatus('loading');
      setAcademicError(null);

      try {
        const response = await getStudentAcademicOverview();
        if (!isMounted) {
          return;
        }

        setAcademicOverview(response);
        setAcademicStatus('success');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setAcademicStatus('error');
        setAcademicError(error instanceof Error ? error.message : 'Falha ao carregar notas privadas.');
      }
    };

    void loadAcademicOverview();

    return () => {
      isMounted = false;
    };
  }, [isStudent]);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Perfil</AppText>
        <AppText variant="body" tone="muted">
          Configure sua experiencia e acompanhe o seu estado academico sem sair do perfil.
        </AppText>
      </View>

      <Card style={styles.identity}>
        <AppText variant="h3">{userName}</AppText>
        <AppText variant="caption" tone="primary">{roleLabel}</AppText>
      </Card>

      {isStudent ? (
        <Card style={styles.academicCard}>
          <AppText variant="h3">Notas particulares e desempenho</AppText>
          {academicStatus === 'loading' ? (
            <AppText variant="caption" tone="muted">A carregar resumo academico...</AppText>
          ) : academicStatus === 'error' ? (
            <AppText variant="caption" tone="error">{academicError || 'Falha ao carregar resumo academico.'}</AppText>
          ) : academicOverview ? (
            <>
              <AppText variant="caption" tone="muted">
                {academicOverview.student.classGroupName || 'Turma nao vinculada'} · Media geral {academicOverview.summary.generalAverage.toFixed(1)}/20
              </AppText>
              <View style={styles.metricsWrap}>
                <Card style={styles.metricCard}>
                  <AppText variant="caption" tone="muted">Ranking</AppText>
                  <AppText variant="h3">
                    {academicOverview.summary.classRank || '--'} / {academicOverview.summary.classSize || '--'}
                  </AppText>
                </Card>
                <Card style={styles.metricCard}>
                  <AppText variant="caption" tone="muted">Frequencia</AppText>
                  <AppText variant="h3">{academicOverview.summary.attendanceRate}%</AppText>
                </Card>
              </View>
              <View style={styles.privateGradesList}>
                {academicOverview.subjectResults.slice(0, 3).map((subject) => (
                  <View key={subject.subjectId} style={styles.privateGradeRow}>
                    <View style={styles.privateGradeMeta}>
                      <AppText variant="label">{subject.subjectName}</AppText>
                      <AppText variant="caption" tone="muted">
                        CA {subject.continuousAssessment.toFixed(1)} · Projeto {subject.projectScore.toFixed(1)} · Exame {subject.examScore.toFixed(1)}
                      </AppText>
                    </View>
                    <AppText variant="bodyStrong" tone={subject.status === 'approved' ? 'success' : 'error'}>
                      {subject.finalAverage.toFixed(1)}/20
                    </AppText>
                  </View>
                ))}
              </View>
              {academicOverview.upcomingEvaluations[0] ? (
                <AppText variant="caption" tone="muted">
                  Proxima avaliacao: {academicOverview.upcomingEvaluations[0].title}
                </AppText>
              ) : null}
            </>
          ) : (
            <AppText variant="caption" tone="muted">Sem resumo academico disponivel neste momento.</AppText>
          )}
        </Card>
      ) : null}

      <Card style={styles.healthCard}>
        <View style={styles.row}>
          <AppText variant="caption" tone="muted">Status do backend</AppText>
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

      <Card>
        <AppText variant="h3">Preferencias</AppText>
        <View style={styles.list}>
          {preferences.map((row) => (
            <View key={row.key} style={styles.row}>
              <AppText variant="caption" tone="muted">{row.key}</AppText>
              <AppText variant="label">{row.value}</AppText>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.permissionsCard}>
        <AppText variant="h3">RBAC ativo</AppText>
        <AppText variant="caption" tone="muted">
          Perfil atual: {roleLabel}
        </AppText>
        <AppText variant="caption" tone="muted">
          Permissoes carregadas: {permissions.length}
        </AppText>
        {canAccessRootManagement ? (
          <Button
            label="Abrir gestao SUPER_ROOT"
            variant="secondary"
            onPress={() => rootNavigation.navigate('RootManagement')}
          />
        ) : canManageUsers ? (
          <AppText variant="caption" tone="muted">
            Este perfil possui permissao de usuarios, mas a area global esta restrita ao SUPER_ROOT.
          </AppText>
        ) : (
          <AppText variant="caption" tone="muted">
            Sem permissao de gestao global de usuarios neste perfil.
          </AppText>
        )}
      </Card>

      <Button label="Abrir feed social" variant="secondary" onPress={() => navigation.navigate('Feed')} style={styles.secondaryAction} />
      {isStudent && hasAppPermission(role, AppPermission.ACADEMIC_READ_SELF) ? (
        <Button
          label="Abrir painel academico"
          variant="secondary"
          onPress={() => navigation.navigate('Academic')}
          style={styles.secondaryAction}
        />
      ) : null}

      <Button label="Explorar vagas" onPress={() => navigation.navigate('Jobs')} style={styles.primaryAction} />
      <Button
        label="Sair"
        variant="ghost"
        onPress={() => {
          void (async () => {
            await logout();
            rootNavigation.reset({
              index: 0,
              routes: [{ name: 'AuthLogin' }],
            });
          })();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 16,
  },
  identity: {
    marginBottom: 12,
    gap: 4,
  },
  academicCard: {
    gap: 10,
    marginBottom: 12,
  },
  metricsWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    gap: 6,
  },
  privateGradesList: {
    gap: 10,
  },
  privateGradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  privateGradeMeta: {
    flex: 1,
    gap: 2,
  },
  healthCard: {
    marginBottom: 12,
    gap: 8,
  },
  permissionsCard: {
    marginTop: 12,
    gap: 8,
  },
  list: {
    marginTop: 12,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  primaryAction: {
    marginTop: 16,
    marginBottom: 4,
  },
  secondaryAction: {
    marginTop: 12,
  },
});
