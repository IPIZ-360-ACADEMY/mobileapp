import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/AppNavigator';
import { colors } from '../../theme/colors';
import { JobType } from '../../types/job.types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteParams = RouteProp<RootStackParamList, 'JobDetail'>;

export const JobDetailScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const { jobId } = route.params;

  const mockJob = {
    id: jobId,
    companyName: 'Sonangol',
    title: 'Técnico em Manutenção Industrial',
    description: 'Estamos à procura de um Técnico em Manutenção Industrial qualificado para integrar nossa equipe. O profissional será responsável por realizar manutenção preventiva e corretiva em equipamentos industriais, garantindo o funcionamento adequado de todas as máquinas e sistemas.',
    requirements: [
      'Formação técnica em Mecânica Industrial, Eletrotécnica ou área relacionada',
      'Experiência mínima de 2 anos em manutenção industrial',
      'Conhecimento em leitura e interpretação de desenhos técnicos',
      'Capacidade de trabalhar em equipe',
      'Disponibilidade para trabalhar em turnos',
    ],
    skills: ['Mecânica', 'Elétrica', 'Hidráulica', 'Pneumática', 'Soldadura'],
    responsibilities: [
      'Realizar manutenção preventiva e corretiva em equipamentos',
      'Diagnosticar falhas em máquinas e sistemas',
      'Elaborar relatórios técnicos de manutenção',
      'Garantir o cumprimento das normas de segurança',
      'Colaborar com a equipe de produção',
    ],
    type: JobType.FULL_TIME,
    location: 'Luanda, Angola',
    salaryRange: '150.000 - 250.000 Kz',
    postedAt: '2026-02-10',
    deadline: '2026-03-10',
  };

  const handleApply = () => {
    Alert.alert(
      'Candidatura Enviada',
      'Sua candidatura foi enviada com sucesso! A empresa entrará em contato em breve.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{mockJob.title}</Text>
        <Text style={styles.company}>{mockJob.companyName}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Localização</Text>
          <Text style={styles.infoValue}>{mockJob.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💰 Salário</Text>
          <Text style={styles.infoValue}>{mockJob.salaryRange}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Prazo</Text>
          <Text style={styles.infoValue}>{mockJob.deadline}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{mockJob.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsabilidades</Text>
          {mockJob.responsibilities.map((resp, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{resp}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          {mockJob.requirements.map((req, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{req}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competências Necessárias</Text>
          <View style={styles.skillsContainer}>
            {mockJob.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Candidatar-me" onPress={handleApply} />
      </View>
    </View>
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
  backButton: {},
  backButtonText: {
    color: colors.background.paper,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: colors.primary[700],
    marginRight: 8,
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: colors.primary[100],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 14,
    color: colors.primary[700],
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background.paper,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  applyButton: {
    backgroundColor: colors.primary[700],
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.background.paper,
    fontSize: 16,
    fontWeight: '600',
  },
});
