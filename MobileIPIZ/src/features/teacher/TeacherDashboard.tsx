import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export const TeacherDashboard: FC = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard Professor</Text>
        <Text style={styles.subtitle}>Bem-vindo, {user?.name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas Turmas</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mecânica Industrial - 3º Ano</Text>
          <Text style={styles.cardDescription}>25 alunos</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Eletrotécnica - 2º Ano</Text>
          <Text style={styles.cardDescription}>30 alunos</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avaliações Pendentes</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Prova Final - Mecânica</Text>
          <Text style={styles.cardDescription}>12 provas para corrigir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gestão de Estágios</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Acompanhar Estagiários</Text>
          <Text style={styles.cardDescription}>
            Monitore o desempenho dos alunos em estágio
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
