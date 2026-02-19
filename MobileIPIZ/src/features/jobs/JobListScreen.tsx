import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/AppNavigator';
import { colors } from '../../theme/colors';
import { Job, JobType, JobStatus } from '../../types/job.types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: 'c1',
    companyName: 'Sonangol',
    title: 'Técnico em Manutenção Industrial',
    description: 'Realizar manutenção preventiva e corretiva em equipamentos industriais',
    requirements: ['Formação técnica', 'Experiência de 2 anos'],
    skills: ['Mecânica', 'Elétrica', 'Hidráulica'],
    type: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    location: 'Luanda, Angola',
    salaryRange: '150.000 - 250.000 Kz',
    postedAt: '2026-02-10',
    deadline: '2026-03-10',
  },
  {
    id: '2',
    companyId: 'c2',
    companyName: 'Empresa Industrial ABC',
    title: 'Estágio em Eletrotécnica',
    description: 'Oportunidade de estágio para estudantes de eletrotécnica',
    requirements: ['Cursando técnico', 'Conhecimento básico'],
    skills: ['Eletricidade', 'Circuitos', 'Instrumentação'],
    type: JobType.INTERNSHIP,
    status: JobStatus.OPEN,
    location: 'Viana, Angola',
    salaryRange: '50.000 - 80.000 Kz',
    postedAt: '2026-02-12',
    deadline: '2026-02-28',
  },
  {
    id: '3',
    companyId: 'c3',
    companyName: 'Indústria Nacional',
    title: 'Operador de Máquinas CNC',
    description: 'Operar e programar máquinas CNC para produção industrial',
    requirements: ['Formação técnica', 'Experiência com CNC'],
    skills: ['CNC', 'Programação', 'Mecânica de Precisão'],
    type: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    location: 'Luanda, Angola',
    salaryRange: '200.000 - 350.000 Kz',
    postedAt: '2026-02-15',
    deadline: '2026-03-15',
  },
];

export const JobListScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'FULL_TIME' | 'INTERNSHIP'>('ALL');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'ALL' || job.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Oportunidades</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vagas..."
          placeholderTextColor={colors.text.hint}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'ALL' && styles.filterButtonActive]}
          onPress={() => setFilter('ALL')}
        >
          <Text style={[styles.filterButtonText, filter === 'ALL' && styles.filterButtonTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'FULL_TIME' && styles.filterButtonActive]}
          onPress={() => setFilter('FULL_TIME')}
        >
          <Text style={[styles.filterButtonText, filter === 'FULL_TIME' && styles.filterButtonTextActive]}>
            Tempo Integral
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'INTERNSHIP' && styles.filterButtonActive]}
          onPress={() => setFilter('INTERNSHIP')}
        >
          <Text style={[styles.filterButtonText, filter === 'INTERNSHIP' && styles.filterButtonTextActive]}>
            Estágios
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.jobList}>
        {filteredJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
          >
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <View style={[
                styles.jobTypeBadge,
                job.type === JobType.INTERNSHIP && styles.internshipBadge
              ]}>
                <Text style={styles.jobTypeText}>
                  {job.type === JobType.FULL_TIME ? 'Tempo Integral' : 'Estágio'}
                </Text>
              </View>
            </View>
            <Text style={styles.companyName}>{job.companyName}</Text>
            <Text style={styles.location}>{job.location}</Text>
            <Text style={styles.salary}>{job.salaryRange}</Text>
            <View style={styles.skillsContainer}>
              {job.skills.slice(0, 3).map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillTagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhuma vaga encontrada</Text>
          </View>
        )}
      </ScrollView>
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.background.paper,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background.paper,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary[700],
  },
  filterButtonActive: {
    backgroundColor: colors.primary[700],
  },
  filterButtonText: {
    color: colors.primary[700],
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: colors.background.paper,
  },
  jobList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  jobCard: {
    backgroundColor: colors.background.paper,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  jobTypeBadge: {
    backgroundColor: colors.primary[100],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  internshipBadge: {
    backgroundColor: colors.secondary[100],
  },
  jobTypeText: {
    fontSize: 12,
    color: colors.primary[700],
    fontWeight: '600',
  },
  companyName: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    color: colors.success.main,
    fontWeight: '600',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: colors.neutral[100],
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillTagText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});
