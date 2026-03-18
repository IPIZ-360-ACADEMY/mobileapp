// IPIZ Mobile App - Academic Schedule Screen
// Display student's academic schedule

import React, { FC } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

interface ScheduleItem {
  id: string;
  subject: string;
  professor: string;
  time: string;
  day: string;
  room: string;
}

const scheduleData: ScheduleItem[] = [
  { id: '1', subject: 'Mecânica Industrial', professor: 'Prof. João Silva', time: '07:00 - 08:30', day: 'Segunda', room: 'Lab 1' },
  { id: '2', subject: 'Eletrotécnica', professor: 'Prof. Maria Santos', time: '08:30 - 10:00', day: 'Segunda', room: 'Lab 2' },
  { id: '3', subject: 'Desenho Técnico', professor: 'Prof. Pedro Costa', time: '10:00 - 11:30', day: 'Terça', room: 'Sala 3' },
  { id: '4', subject: 'Metrologia', professor: 'Prof. Ana Oliveira', time: '07:00 - 08:30', day: 'Quarta', room: 'Lab 1' },
  { id: '5', subject: 'Segurança do Trabalho', professor: 'Prof. Carlos Lima', time: '08:30 - 10:00', day: 'Quinta', room: 'Sala 2' },
  { id: '6', subject: 'Gestão da Produção', professor: 'Prof. Ricardo Alves', time: '10:00 - 11:30', day: 'Sexta', room: 'Sala 4' },
];

export const AcademicScheduleScreen: FC = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🗓️ Horário Académico
        </Text>

        {days.map((day) => (
          <View key={day} className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {day}
            </Text>
            {scheduleData
              .filter((item) => item.day === day)
              .map((item) => (
                <View
                  key={item.id}
                  className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-slate-700"
                >
                  <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {item.subject}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {item.time} • {item.room}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {item.professor}
                  </Text>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AcademicScheduleScreen;
