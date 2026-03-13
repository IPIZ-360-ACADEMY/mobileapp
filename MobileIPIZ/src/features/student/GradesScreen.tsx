import React, { FC } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

const TEAL = '#0D9488';
const BG = '#F0FDFA';
const GREEN = '#16A34A';
const YELLOW = '#D97706';

interface SubjectGrade {
  name: string;
  grade: number;
  percent: number;
  color: string;
}

const subjectGrades: SubjectGrade[] = [
  { name: 'Eletrotecnia', grade: 17, percent: 0.85, color: GREEN },
  { name: 'Matemática', grade: 14, percent: 0.7, color: YELLOW },
  { name: 'Instalações', grade: 16, percent: 0.8, color: GREEN },
];

export const GradesScreen: FC = () => {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'JS';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>IPIZ</Text>
          </View>
          <Text style={styles.headerScreenTitle}>Desempenho Académico</Text>
        </View>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>{initials}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Circular ring chart - average */}
        <View style={styles.ringContainer}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.ringLabel}>Média Geral</Text>
              <Text style={styles.ringValue}>15.8</Text>
              <Text style={styles.ringSubLabel}>/ 20</Text>
            </View>
          </View>
        </View>

        {/* Notas do Semestre */}
        <Text style={styles.sectionTitle}>Notas do Semestre</Text>
        <View style={styles.subjectRow}>
          {subjectGrades.map((s) => (
            <View key={s.name} style={styles.subjectCard}>
              <Text style={styles.subjectName}>{s.name}</Text>
              <Text style={[styles.subjectGrade, { color: s.color }]}>{s.grade}</Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${s.percent * 100}%` as any, backgroundColor: s.color },
                  ]}
                />
              </View>
              <Text style={styles.subjectPercent}>{Math.round(s.percent * 100)}%</Text>
            </View>
          ))}
        </View>

        {/* Outros Dados */}
        <Text style={styles.sectionTitle}>Outros Dados</Text>
        <View style={styles.otherDataRow}>
          {/* Faltas */}
          <View style={styles.otherCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.otherCardTitle}>Faltas</Text>
            <Text style={[styles.otherCardValue, { color: YELLOW }]}>3</Text>
          </View>
          {/* Progresso do Semestre */}
          <View style={[styles.otherCard, { flex: 1.5 }]}>
            <Text style={styles.otherCardTitle}>Progresso do Semestre</Text>
            <View style={styles.progressTrackWide}>
              <View style={[styles.progressFill, { width: '85%', backgroundColor: TEAL }]} />
            </View>
            <Text style={[styles.otherCardValue, { color: TEAL }]}>85% Completo</Text>
          </View>
        </View>

        {/* Créditos Concluídos */}
        <View style={styles.creditsCard}>
          <View style={styles.creditsHeader}>
            <Text style={styles.creditsTitle}>Créditos Concluídos</Text>
            <Text style={styles.creditsValue}>45 / 60</Text>
          </View>
          <View style={styles.progressTrackFull}>
            <View style={[styles.progressFill, { width: '75%', backgroundColor: TEAL }]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TEAL,
  },
  header: {
    backgroundColor: TEAL,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 13,
    fontWeight: '800',
    color: TEAL,
  },
  headerScreenTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  avatarSmallText: {
    fontSize: 14,
    fontWeight: '700',
    color: TEAL,
  },
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  ringContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  ringOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  ringInner: {
    alignItems: 'center',
  },
  ringLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  ringValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 36,
  },
  ringSubLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subjectRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  subjectCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectName: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 6,
  },
  subjectGrade: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  subjectPercent: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  otherDataRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  otherCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  warningIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  otherCardTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  otherCardValue: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  progressTrackWide: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  creditsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  creditsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  creditsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  creditsValue: {
    fontSize: 14,
    fontWeight: '700',
    color: TEAL,
  },
  progressTrackFull: {
    width: '100%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default GradesScreen;
