import React, { FC } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';

type Props = NativeStackScreenProps<HomeStackParamList, 'TeacherDashboard'>;

export const TeacherDashboard: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const userName = user?.name ?? 'Professor';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Top Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>IP</Text>
          </View>
          <View style={styles.headerTitleBlock}>
            <Text style={styles.headerInstitution}>IPIZ - Instituto Politécnico Industrial</Text>
            <Text style={styles.headerInstitutionSub}>17 de Dezembro</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.welcomeText}>Bem-vindo,</Text>
          <Text style={styles.welcomeName} numberOfLines={1}>{userName}</Text>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* ── Sub-header ── */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>Painel do Professor</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 3 Stat Cards Row ────────────────────────────────── */}
        <View style={styles.statCardsRow}>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Aulas Hoje</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.statValueOrange]}>3</Text>
            <Text style={styles.statLabel}>Notas Pendentes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.statValueTeal]}>82%</Text>
            <Text style={styles.statLabel}>Desempenho Turma</Text>
          </View>

        </View>

        {/* ── Minhas Turmas ────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Minhas Turmas</Text>

        <View style={styles.turmaCard}>
          <View style={styles.turmaIconWrap}>
            <Text style={styles.turmaIcon}>👥</Text>
          </View>
          <View style={styles.turmaInfo}>
            <Text style={styles.turmaName}>Eletrotecnia - 3°</Text>
            <Text style={styles.turmaAlunos}>45 alunos</Text>
          </View>
          <TouchableOpacity style={styles.turmaArrow} activeOpacity={0.7}>
            <Text style={styles.turmaArrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Warning Banner ──────────────────────────────────── */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIconWrap}>
            <Text style={styles.warningIcon}>⚠</Text>
          </View>
          <View style={styles.warningTextBlock}>
            <Text style={styles.warningTitle}>Avaliações Pendentes</Text>
            <Text style={styles.warningBody}>7 Avaliações Pendentes</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.warningLink}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        {/* ── Action Buttons Row ──────────────────────────────── */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnBlue]}
            onPress={() => navigation.navigate('Grades')}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnIcon}>📋</Text>
            <Text style={styles.actionBtnText}>Lançar Notas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnTeal]}
            onPress={() => navigation.navigate('AcademicSchedule')}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnIcon}>✅</Text>
            <Text style={styles.actionBtnText}>Presenças</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F0FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  headerTitleBlock: {
    flex: 1,
  },
  headerInstitution: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 14,
  },
  headerInstitutionSub: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 13,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  welcomeText: {
    fontSize: 11,
    color: '#64748B',
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    maxWidth: 80,
    alignSelf: 'center',
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0F8F5',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* ── Sub-header ── */
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  subHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  settingsBtn: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 18,
    color: '#64748B',
  },

  /* ── Scroll ── */
  scrollView: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 32,
  },

  /* ── Stat cards row ── */
  statCardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1976D2',
    lineHeight: 30,
  },
  statValueOrange: {
    color: '#F59E0B',
  },
  statValueTeal: {
    color: '#0D9488',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 13,
  },

  /* ── Section title ── */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    marginLeft: 2,
  },

  /* ── Turma card ── */
  turmaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  turmaIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  turmaIcon: {
    fontSize: 22,
  },
  turmaInfo: {
    flex: 1,
  },
  turmaName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  turmaAlunos: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  turmaArrow: {
    padding: 4,
  },
  turmaArrowText: {
    fontSize: 22,
    color: '#94A3B8',
    lineHeight: 24,
  },

  /* ── Warning banner ── */
  warningBanner: {
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  warningIconWrap: {
    marginRight: 10,
  },
  warningIcon: {
    fontSize: 22,
  },
  warningTextBlock: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9A3412',
  },
  warningBody: {
    fontSize: 11,
    color: '#C2410C',
    marginTop: 2,
  },
  warningLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
    textDecorationLine: 'underline',
  },

  /* ── Action buttons row ── */
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  actionBtnBlue: {
    backgroundColor: '#1976D2',
  },
  actionBtnTeal: {
    backgroundColor: '#009688',
  },
  actionBtnIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
