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

type Props = NativeStackScreenProps<HomeStackParamList, 'StudentDashboard'>;

export const StudentDashboard: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const userName = user?.name ?? 'Aluno';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Top Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Logo placeholder */}
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

      {/* ── Sub-header ─────────────────────────────────────────── */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>Técnico em Eletricidade - 3º Ano</Text>
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
        {/* ── 3 Info Cards Row ────────────────────────────────── */}
        <View style={styles.cardsRow}>

          {/* Card 1 – Progresso do Semestre */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Progresso do Semestre</Text>
            {/* Circular progress ring */}
            <View style={styles.progressRingOuter}>
              <View style={styles.progressRingInner}>
                <Text style={styles.progressPercent}>85%</Text>
              </View>
            </View>
            <Text style={styles.progressLabel}>85% Completo</Text>
            <Text style={styles.progressAvg}>Média Atual: 16.5</Text>
          </View>

          {/* Card 2 – Prazos Próximos */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Prazos Próximos</Text>
            <Text style={styles.calendarIcon}>📅</Text>
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineDot}>•</Text>
              <Text style={styles.deadlineText}>Entrega do Projeto</Text>
              <Text style={styles.deadlineDate}>15 Out</Text>
            </View>
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineDot}>•</Text>
              <Text style={styles.deadlineText}>Exame de Mecânica</Text>
              <Text style={styles.deadlineDate}>22 Out</Text>
            </View>
          </View>

          {/* Card 3 – Notificações */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Notificações</Text>
            <Text style={styles.envelopeIcon}>✉</Text>
            <Text style={styles.notifCount}>4 Novas</Text>
            <Text style={styles.notifSub}>Notificações</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Announcements')}
              activeOpacity={0.7}
            >
              <Text style={styles.verTodasLink}>Ver todas</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* ── Feed Social ─────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Feed Social</Text>

        {/* Social Post 1 */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.postAvatar}>
              <Text style={styles.postAvatarText}>JS</Text>
            </View>
            <View style={styles.postAuthorBlock}>
              <Text style={styles.postAuthorName}>João Silva</Text>
              <Text style={styles.postAuthorRole}>Aluno • 3º Ano</Text>
            </View>
            <TouchableOpacity style={styles.postMenuBtn} activeOpacity={0.7}>
              <Text style={styles.postMenuIcon}>•••</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postBody}>
            Acabei de terminar o projeto de eletrotécnica! Foi um desafio incrível trabalhar com
            circuitos trifásicos. 💪
          </Text>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>👍 24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>💬 8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>↗ 3</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Post 2 */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={[styles.postAvatar, styles.postAvatarTeal]}>
              <Text style={styles.postAvatarText}>MS</Text>
            </View>
            <View style={styles.postAuthorBlock}>
              <Text style={styles.postAuthorName}>Maria Santos</Text>
              <Text style={styles.postAuthorRole}>Aluna • 2º Ano</Text>
            </View>
            <TouchableOpacity style={styles.postMenuBtn} activeOpacity={0.7}>
              <Text style={styles.postMenuIcon}>•••</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postBody}>
            Palestra sobre energias renováveis hoje foi excelente. Muitas oportunidades no setor
            de energia solar em Angola!
          </Text>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>👍 41</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>💬 15</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
              <Text style={styles.postActionText}>↗ 7</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* ── Bottom Tab Bar ──────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Feed</Text>
        </View>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={styles.tabLabel}>Cursos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIcon}>🔗</Text>
          <Text style={styles.tabLabel}>Rede</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'flex-end',
    flexDirection: 'row',
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
    fontSize: 14,
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
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 24,
  },

  /* ── 3-card row ── */
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  infoCardTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 12,
  },

  /* Progress ring */
  progressRingOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: '#F0FDF4',
  },
  progressRingInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  progressAvg: {
    fontSize: 8,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },

  /* Deadlines card */
  calendarIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 4,
  },
  deadlineDot: {
    fontSize: 10,
    color: '#0D9488',
    marginRight: 3,
    lineHeight: 14,
  },
  deadlineText: {
    fontSize: 8,
    color: '#1E293B',
    flex: 1,
    lineHeight: 13,
  },
  deadlineDate: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '600',
    lineHeight: 13,
  },

  /* Notifications card */
  envelopeIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  notifCount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D9488',
  },
  notifSub: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 8,
  },
  verTodasLink: {
    fontSize: 10,
    color: '#0D9488',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  /* ── Section title ── */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    marginLeft: 2,
  },

  /* ── Post card ── */
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  postAvatarTeal: {
    backgroundColor: '#0D9488',
  },
  postAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  postAuthorBlock: {
    flex: 1,
  },
  postAuthorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  postAuthorRole: {
    fontSize: 11,
    color: '#64748B',
  },
  postMenuBtn: {
    padding: 6,
  },
  postMenuIcon: {
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  postBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    gap: 16,
  },
  postActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  /* ── Bottom tab bar ── */
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#0D9488',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.45,
  },
  tabIconActive: {
    fontSize: 20,
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#0D9488',
  },
});
