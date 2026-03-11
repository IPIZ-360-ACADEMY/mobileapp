import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Job, JobType, JobStatus } from '../../types/job.types';

// type Props unchanged

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
  // using new hook with dark mode support
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'FULL_TIME' | 'INTERNSHIP'>('ALL');

  // no more styles object, we use Tailwind classes

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'ALL' || job.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">

      <View className="px-6 py-6 pt-12 bg-yellow-400 dark:bg-yellow-500">

        <Pressable
          className="mb-4"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <Text className="text-white text-lg">← Voltar</Text>
        </Pressable>
        <Text className="text-white text-2xl font-bold">Oportunidades</Text>
      </View>

      <View className="p-4">
        <TextInput
          className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 text-base text-gray-900 dark:text-gray-100"
          placeholder="Buscar vagas..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="flex-row px-4 py-2 space-x-2">
        {['ALL','FULL_TIME','INTERNSHIP'].map(option => {
          const active = filter === option;
          const label = option === 'ALL' ? 'Todas' : option === 'FULL_TIME' ? 'Tempo Integral' : 'Estágios';
          return (
            <Pressable
              key={option}
              onPress={() => setFilter(option as any)}
              className={`px-4 py-2 rounded-full border ${active ? 'bg-blue-600 border-blue-600' : 'border-blue-600'} ${active ? 'text-white' : 'text-blue-600'}`}
              android_ripple={{ color: '#cbd5e1' }}
            >
              <Text className={`${active ? 'text-white' : 'text-blue-600'} text-sm font-semibold`}>{label}</Text>
            </Pressable>
          );
        })}
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

export default JobListScreen;
