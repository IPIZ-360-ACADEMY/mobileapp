import React, { FC } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export const AdminDashboard: FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>IPIZ</Text>
          </View>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle} numberOfLines={2}>
              IPIZ - Instituto Politécnico Industrial / 17 de Dezembro
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <Text style={styles.pageTitle}>Administração</Text>
        {user ? (
          <Text style={styles.pageSubtitle}>Bem-vindo, {user.name}</Text>
        ) : null}

        {/* 2x2 Stat Cards Grid */}
        <View style={styles.grid}>
          {/* Card 1 - Taxa Empregabilidade */}
          <View style={styles.card}>
            <View style={styles.ringOuter}>
              <View style={styles.ringInner}>
                <Text style={styles.ringText}>78%</Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>Taxa Empregabilidade</Text>
            <Text style={styles.cardValue}>78%</Text>
          </View>

          {/* Card 2 - Alunos */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🎓</Text>
            </View>
            <Text style={styles.cardBigNumber}>1.250</Text>
            <Text style={styles.cardLabel}>Alunos</Text>
          </View>

          {/* Card 3 - Professores */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>📋</Text>
            </View>
            <Text style={styles.cardBigNumber}>45</Text>
            <Text style={styles.cardLabel}>Professores</Text>
          </View>

          {/* Card 4 - Empresas Parceiras */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🏢</Text>
            </View>
            <Text style={styles.cardBigNumber}>32</Text>
            <Text style={styles.cardLabel}>Empresas Parceiras</Text>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>📄</Text>
            <Text style={styles.actionBtnText}>Relatórios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>⚙️</Text>
            <Text style={styles.actionBtnText}>Gestão</Text>
          </TouchableOpacity>
        </View>

        {/* Tendência de Emprego */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Tendência de Emprego</Text>
          <View style={styles.chartContainer}>
            {/* Simplified line chart representation */}
            <View style={styles.chartYAxis}>
              <Text style={styles.chartAxisLabel}>100%</Text>
              <Text style={styles.chartAxisLabel}>75%</Text>
              <Text style={styles.chartAxisLabel}>50%</Text>
              <Text style={styles.chartAxisLabel}>25%</Text>
              <Text style={styles.chartAxisLabel}>0%</Text>
            </View>
            <View style={styles.chartArea}>
              {/* Horizontal guide lines */}
              <View style={[styles.chartGuide, { top: 0 }]} />
              <View style={[styles.chartGuide, { top: '25%' }]} />
              <View style={[styles.chartGuide, { top: '50%' }]} />
              <View style={[styles.chartGuide, { top: '75%' }]} />
              {/* Data points & line (simplified) */}
              <View style={styles.chartLine}>
                <View style={[styles.dataPoint, { bottom: '55%', left: '5%' }]} />
                <View style={[styles.dataPoint, { bottom: '62%', left: '25%' }]} />
                <View style={[styles.dataPoint, { bottom: '60%', left: '45%' }]} />
                <View style={[styles.dataPoint, { bottom: '70%', left: '65%' }]} />
                <View style={[styles.dataPoint, { bottom: '78%', left: '85%' }]} />
              </View>
              {/* X-axis labels */}
              <View style={styles.chartXAxis}>
                {['Jan', 'Mar', 'Mai', 'Jul', 'Set'].map((m) => (
                  <Text key={m} style={styles.chartXLabel}>{m}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutBtnText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 16,
  },
  profileIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  profileIconText: {
    fontSize: 18,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#EFF6FF',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  ringOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 7,
    borderColor: '#22C55E',
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ringInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#166534',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconEmoji: {
    fontSize: 26,
  },
  cardBigNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  actionBtnIcon: {
    fontSize: 18,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 160,
  },
  chartYAxis: {
    width: 36,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingRight: 4,
  },
  chartAxisLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  chartGuide: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  chartLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
  },
  dataPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E3A8A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  chartXAxis: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartXLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
});

export default AdminDashboard;
