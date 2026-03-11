// IPIZ Mobile App - Grades Screen
// Display student's grades and academic performance

import React, { FC } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

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

export const GradesScreen: FC = () => {
  const average = gradesData.reduce((acc, curr) => acc + curr.grade, 0) / gradesData.length;
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          📘 Minhas Notas
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Ano lectivo 2024/2025
        </Text>

        <View className="flex-row mb-6 gap-3">
          <View className="flex-1 bg-gray-50 dark:bg-slate-800 px-4 py-4 rounded-2xl items-center">
            <Text className="text-xs text-gray-500 dark:text-gray-400">Média Geral</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">{average.toFixed(1)}</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">/ 20</Text>
          </View>
          <View className="flex-1 bg-gray-50 dark:bg-slate-800 px-4 py-4 rounded-2xl items-center">
            <Text classname="text-xs text-gray-500 dark:text-gray-400">Disciplinas</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">{gradesData.length}</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">cursadas</Text>
          </View>
        </View>

        {gradesData.map((grade) => (
          <View
            key={grade.id}
            className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-slate-700"
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-gray-900 dark:text-gray-100">
                {grade.subject}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {grade.grade}/{grade.maxGrade}
              </Text>
            </View>
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {grade.type} • {grade.date}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GradesScreen;
