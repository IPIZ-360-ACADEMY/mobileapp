import React, { FC } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Button } from '../../components/base/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { JobType } from '../../types/job.types';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

export const JobDetailScreen: FC<Props> = ({ navigation, route }) => {
  const { jobId } = route.params;
  const { isDark } = useTheme();

  const mockJob = {
    id: jobId,
    companyName: 'Sonangol',
    title: 'Técnico em Manutenção Industrial',
    description:
      'Estamos à procura de um Técnico em Manutenção Industrial qualificado para integrar nossa equipe. O profissional será responsável por realizar manutenção preventiva e corretiva em equipamentos industriais, garantindo o funcionamento adequado de todas as máquinas e sistemas.',
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
    <ScrollView className="bg-white dark:bg-slate-900">
      <View className="px-4 pt-4">
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 flex-row items-center shadow-md">
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#cbd5e1' }}
            className="mr-4"
          >
            <Text className="text-gray-900 dark:text-gray-100">← Voltar</Text>
          </Pressable>
          <Text className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Detalhes da Vaga</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{mockJob.title}</Text>
        <Text className="text-lg text-gray-600 dark:text-gray-400 mb-4">{mockJob.companyName}</Text>

        <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-slate-700">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Localização</Text>
          <Text className="text-sm text-gray-900 dark:text-gray-100">{mockJob.location}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-slate-700">
          <Text className="text-sm text-gray-600 dark:text-gray-400">Tipo</Text>
          <Text className="text-sm text-gray-900 dark:text-gray-100">
            {mockJob.type === JobType.FULL_TIME ? 'Tempo Integral' : 'Estágio'}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Descrição</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 leading-6">{mockJob.description}</Text>
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Requisitos</Text>
          {mockJob.requirements.map((req, i) => (
            <View key={i} className="flex-row mb-1">
              <Text className="text-sm font-bold mr-2">•</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 flex-1 leading-6">{req}</Text>
            </View>
          ))}
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Habilidades</Text>
          <View className="flex-row flex-wrap mt-2">
            {mockJob.skills.map((skill, i) => (
              <View key={i} className="mr-2 mb-2 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                <Text className="text-xs text-gray-600 dark:text-gray-400">{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="p-4 pb-8">
        <Pressable
          onPress={handleApply}
          className="bg-gray-800 dark:bg-gray-600 py-4 rounded-xl items-center"
        >
          <Text className="text-white text-base font-semibold">Candidatar-se</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default JobDetailScreen;
