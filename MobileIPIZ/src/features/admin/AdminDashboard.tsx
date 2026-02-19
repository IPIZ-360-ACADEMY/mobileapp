import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export const AdminDashboard: FC = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard Administração</Text>
        <Text style={styles.subtitle}>Bem-vindo, {user?.name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indicadores Institucionais</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Alunos Ativos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>87%</Text>
            <Text style={styles.statLabel}>Taxa Empregabilidade</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Alumni Ativos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>35</Text>
            <Text style={styles.statLabel}>Empresas Parceiras</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gestão</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Gestão de Usuários</Text>
          <Text style={styles.cardDescription}>
            Gerenciar alunos, professores e empresas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Relatórios Institucionais</Text>
          <Text style={styles.cardDescription}>
            Visualizar métricas e gerar relatórios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Validação de Certificados</Text>
          <Text style={styles.cardDescription}>
            Sistema de verificação de certificados
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    backgroundColor: colors.primary[700],
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background.paper,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary[50],
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary[800],
    borderRadius: 8,
  },
  logoutText: {
    color: colors.background.paper,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.background.paper,
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary[700],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.background.paper,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
