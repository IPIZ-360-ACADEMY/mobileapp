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

export const AlumniDashboard: FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Blue gradient top header bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.capIconBox}>
            <Text style={styles.capIcon}>🎓</Text>
          </View>
          <Text style={styles.topBarTitle}>Portal Alumni</Text>
        </View>
        <View style={styles.ipizLogoCircle}>
          <Text style={styles.ipizLogoText}>IPIZ</Text>
        </View>
      </View>

      {/* Welcome banner (still inside top bar color area) */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeTitle}>
          Bem-vindo, {user?.name ?? 'João'}
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Engenheiro de Software (Empregado) - Graduado 2022
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1 - Certificado Digital */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Certificado Digital</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verificado</Text>
            </View>
          </View>
          {/* QR code placeholder */}
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrText}>QR</Text>
          </View>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Verificar Autenticidade</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2 - Programa Mentoria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Text style={styles.cardIconEmoji}>👤</Text>
            </View>
            <Text style={styles.cardTitle}>Programa Mentoria</Text>
          </View>
          <View style={styles.cardStats}>
            <Text style={styles.cardStatItem}>Oportunidades: 12</Text>
            <Text style={styles.cardStatSep}>/</Text>
            <Text style={styles.cardStatItem}>Mentorados Ativos: 3</Text>
          </View>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Encontrar Mentor/Estudante</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3 - Rede de Ex-Alunos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconCircle}>
              <Text style={styles.cardIconEmoji}>🌐</Text>
            </View>
            <Text style={styles.cardTitle}>Rede de Ex-Alunos</Text>
          </View>
          <View style={styles.cardStats}>
            <Text style={styles.cardStatItem}>Conexões: 450</Text>
            <Text style={styles.cardStatSep}>/</Text>
            <Text style={styles.cardStatItem}>Novos Membros: 5</Text>
          </View>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Explorar Rede</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom action buttons */}
        <View style={styles.bottomBtnRow}>
          <TouchableOpacity style={styles.orangeBtn}>
            <Text style={styles.orangeBtnText}>Publicar Vaga</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueBtn}>
            <Text style={styles.blueBtnText}>Atualizar Perfil</Text>
          </TouchableOpacity>
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
    backgroundColor: '#1E3A8A',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  capIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capIcon: {
    fontSize: 20,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ipizLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ipizLogoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  welcomeBanner: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 4,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#BFDBFE',
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  cardIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconEmoji: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  qrText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 6,
    flexWrap: 'wrap',
  },
  cardStatItem: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  cardStatSep: {
    fontSize: 13,
    color: '#94A3B8',
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: '#1E3A8A',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  bottomBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  orangeBtn: {
    flex: 1,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  orangeBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  blueBtn: {
    flex: 1,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  blueBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
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

export default AlumniDashboard;
