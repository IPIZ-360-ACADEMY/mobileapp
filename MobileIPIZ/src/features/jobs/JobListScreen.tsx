import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Job, JobType, JobStatus } from '../../types/job.types';

type Props = NativeStackScreenProps<RootStackParamList, 'JobList'>;

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

export const JobListScreen: FC<Props> = ({ navigation }) => {
  // migrating to the new hook; we still grab colors for now since
  // most styles rely on it.  eventually only `theme` should be used.
  const { theme, colors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'FULL_TIME' | 'INTERNSHIP'>('ALL');

  const styles = getStyles(colors);
  // note: some day we can rewrite getStyles(theme) and drop colors

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'ALL' || job.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: 48 }]}>
        <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]} onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonText, { color: colors.background.paper }]}>← Voltar</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.background.paper }]}>Oportunidades</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.background.paper, borderColor: colors.neutral[300], color: colors.text.primary }]}
          placeholder="Buscar vagas..."
          placeholderTextColor={colors.text.hint}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterButton, filter === 'ALL' && styles.filterButtonActive, { borderColor: colors.primary }]}
          android_ripple={{ color: colors.shadow.light }}
          onPress={() => setFilter('ALL')}
        >
          <Text style={[styles.filterButtonText, filter === 'ALL' && styles.filterButtonTextActive, { color: filter === 'ALL' ? colors.background.paper : colors.primary }]}>
            Todas
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterButton, filter === 'FULL_TIME' && styles.filterButtonActive, { borderColor: colors.primary }]}
          android_ripple={{ color: colors.shadow.light }}
          onPress={() => setFilter('FULL_TIME')}
        >
          <Text style={[styles.filterButtonText, filter === 'FULL_TIME' && styles.filterButtonTextActive, { color: filter === 'FULL_TIME' ? colors.background.paper : colors.primary }]}>
            Tempo Integral
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterButton, filter === 'INTERNSHIP' && styles.filterButtonActive, { borderColor: colors.primary }]}
          android_ripple={{ color: colors.shadow.light }}
          onPress={() => setFilter('INTERNSHIP')}
        >
          <Text style={[styles.filterButtonText, filter === 'INTERNSHIP' && styles.filterButtonTextActive, { color: filter === 'INTERNSHIP' ? colors.background.paper : colors.primary }]}>
            Estágios
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.jobList}>
        {filteredJobs.map((job) => (
          <Pressable
                key={job.id}
                style={[styles.jobCard, { backgroundColor: colors.background.paper, borderColor: colors.neutral[200] }]}
                android_ripple={{ color: colors.shadow.light }}
                onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
              >
            <View style={styles.jobHeader}>
              <Text style={[styles.jobTitle, { color: colors.text.primary }]}>{job.title}</Text>
              <View style={[
                styles.jobTypeBadge,
                job.type === JobType.INTERNSHIP && styles.internshipBadge,
                { backgroundColor: job.type === JobType.INTERNSHIP ? colors.warning.light : colors.neutral[100] }
              ]}>
                <Text style={styles.jobTypeText}>
                  {job.type === JobType.FULL_TIME ? 'Tempo Integral' : 'Estágio'}
                </Text>
              </View>
            </View>
            <Text style={[styles.companyName, { color: colors.text.secondary }]}>{job.companyName}</Text>
            <Text style={[styles.location, { color: colors.text.secondary }]}>{job.location}</Text>
            <Text style={[styles.salary, { color: colors.success.main }]}>{job.salaryRange}</Text>
            <View style={styles.skillsContainer}>
              {job.skills.slice(0, 3).map((skill, index) => (
                <View key={index} style={[styles.skillTag, { backgroundColor: colors.neutral[100] }]}>
                  <Text style={[styles.skillTagText, { color: colors.text.secondary }]}>{skill}</Text>
                </View>
              ))}
            </View>
          </Pressable>
        ))}

        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: colors.text.secondary }]}>Nenhuma vaga encontrada</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};


const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
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
  },
  filterButtonActive: {
    backgroundColor: colors.neutral[700],
  },
  filterButtonText: {
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    flex: 1,
    marginRight: 8,
  },
  jobTypeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  internshipBadge: {
    backgroundColor: colors.warning.light,
  },
  jobTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  companyName: {
    fontSize: 16,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillTagText: {
    fontSize: 12,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
  },
});
