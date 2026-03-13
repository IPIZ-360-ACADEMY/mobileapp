import React, { FC } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileScreen: FC = () => {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'JS';

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ],
    );
  };

  const skills = ['Eletricidade Básica', 'Automação', 'Soldadura'];
  const achievements = ['Melhor Projeto', 'Bolsa de Mérito'];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>IPIZ</Text>
          </View>
          <View style={styles.headerTitleBlock}>
            <Text style={styles.headerInstitution}>IPIZ - Instituto</Text>
            <Text style={styles.headerDate}>17 de Dezembro</Text>
          </View>
        </View>
        <Text style={styles.headerScreenTitle}>Meu Perfil</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar block */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'João Silva'}</Text>
          <Text style={styles.userSubtitle}>Técnico em Eletricidade</Text>
          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>3º Ano</Text>
          </View>
        </View>

        {/* Info card - Matrícula */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <View style={styles.infoTextBlock}>
              <Text style={styles.infoLabel}>Matrícula</Text>
              <Text style={styles.infoValue}>2024001</Text>
            </View>
          </View>
        </View>

        {/* Info card - Contactos */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🪪</Text>
            <View style={styles.infoTextBlock}>
              <Text style={styles.infoLabel}>Contactos</Text>
              <Text style={styles.infoValue}>{user?.email || 'joao.silva@ipiz.ao'}</Text>
              <Text style={styles.infoValue}>+244 923 456 789</Text>
            </View>
            <Text style={styles.phoneIcon}>📞</Text>
          </View>
        </View>

        {/* Info card - Status Académico */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🏆</Text>
            <View style={styles.infoTextBlock}>
              <Text style={styles.infoLabel}>Status Académico</Text>
              <Text style={styles.infoValue}>Ativo  •  Média 16.5</Text>
            </View>
          </View>
        </View>

        {/* Editar button */}
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>

        {/* Competências */}
        <Text style={styles.sectionTitle}>Competências</Text>
        <View style={styles.chipRow}>
          {skills.map((s) => (
            <View key={s} style={styles.outlineChip}>
              <Text style={styles.outlineChipText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* Conquistas */}
        <Text style={styles.sectionTitle}>Conquistas</Text>
        <View style={styles.chipRow}>
          {achievements.map((a) => (
            <View key={a} style={styles.filledChip}>
              <Text style={styles.filledChipText}>{a}</Text>
            </View>
          ))}
        </View>

        {/* Logout */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const TEAL = '#0D9488';
const TEAL_LIGHT = '#CCFBF1';
const BLUE = '#1E40AF';
const BG = '#F0FDFA';

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
  headerTitleBlock: {
    justifyContent: 'center',
  },
  headerInstitution: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  headerDate: {
    fontSize: 11,
    color: '#A7F3D0',
  },
  headerScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
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
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  yearBadge: {
    backgroundColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  yearBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  infoTextBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  phoneIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: TEAL,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  outlineChip: {
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  outlineChipText: {
    fontSize: 13,
    color: TEAL,
    fontWeight: '500',
  },
  filledChip: {
    backgroundColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filledChipText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ProfileScreen;
