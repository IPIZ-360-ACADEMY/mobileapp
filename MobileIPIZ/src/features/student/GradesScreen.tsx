// IPIZ Mobile App - Grades Screen
// Display student's grades and academic performance

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text, DashboardCard, ListItem } from '../../components';

interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  date: string;
  type: string;
}

const gradesData: Grade[] = [
  { id: '1', subject: 'Mecânica Industrial', grade: 16, maxGrade: 20, date: '15/10/2024', type: 'Teste' },
  { id: '2', subject: 'Eletrotécnica', grade: 14, maxGrade: 20, date: '18/10/2024', type: 'Teste' },
  { id: '3', subject: 'Desenho Técnico', grade: 18, maxGrade: 20, date: '20/10/2024', type: 'Trabalho' },
  { id: '4', subject: 'Metrologia', grade: 15, maxGrade: 20, date: '22/10/2024', type: 'Teste' },
  { id: '5', subject: 'Segurança do Trabalho', grade: 17, maxGrade: 20, date: '25/10/2024', type: 'Frequência' },
  { id: '6', subject: 'Gestão da Produção', grade: 13, maxGrade: 20, date: '28/10/2024', type: 'Teste' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Grades'>;

export const GradesScreen: FC<Props> = () => {
  const average = gradesData.reduce((acc, curr) => acc + curr.grade, 0) / gradesData.length;

  const { isDark, componentTheme } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <View className="px-5 py-5 bg-blue-600 dark:bg-blue-800">
        <Text variant="title" color="inverse">Minhas Notas</Text>
        <Text variant="body" color="secondary">Ano lectivo 2024/2025</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row mb-6 gap-3">
          <View className="flex-1 bg-gray-50 dark:bg-slate-800 px-4 py-4 rounded-2xl items-center">
            <Text variant="caption" color="secondary">Média Geral</Text>
            <Text variant="title" color="primary">{average.toFixed(1)}</Text>
            <Text variant="caption" color="muted">/ 20</Text>
          </View>
          <View className="flex-1 bg-gray-50 dark:bg-slate-800 px-4 py-4 rounded-2xl items-center">
            <Text variant="caption" color="secondary">Disciplinas</Text>
            <Text variant="title" color="primary">{gradesData.length}</Text>
            <Text variant="caption" color="muted">cursadas</Text>
          </View>
        </View>

        <Text variant="sectionTitle" color="primary" className="mt-4 mb-3">
          Detalhe por Disciplina
        </Text>

        {gradesData.map((grade) => (
          <ListItem
            key={grade.id}
            title={grade.subject}
            subtitle={`${grade.type} • ${grade.date}`}
            leftIcon="grade"
            badge={`${grade.grade}/${grade.maxGrade}`}
            showChevron={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default GradesScreen;

