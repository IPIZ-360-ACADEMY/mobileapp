import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export const CompanyDashboard: FC = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard Empresa</Text>
        <Text style={styles.subtitle}>Bem-vindo, {user?.name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Publicar Vagas</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Nova Vaga de Emprego</Text>
          <Text style={styles.cardDescription}>
            Publique oportunidades para estudantes e alumni
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidaturas Recebidas</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Técnico em Manutenção</Text>
          <Text style={styles.cardDescription}>15 candidaturas</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estagiários Ativos</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Avaliar Desempenho</Text>
          <Text style={styles.cardDescription}>
            Avalie o desempenho dos seus estagiários
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
