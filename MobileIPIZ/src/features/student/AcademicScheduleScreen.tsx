// IPIZ Mobile App - Academic Schedule Screen
// Display student's academic schedule

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text, ListItem, Icon } from '../../components';

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

type Props = NativeStackScreenProps<RootStackParamList, 'AcademicSchedule'>;

export const AcademicScheduleScreen: FC<Props> = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const { isDark, componentTheme } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <View className="px-5 py-5 bg-blue-600 dark:bg-blue-800">
        <Text variant="title" color="inverse">Horário Académico</Text>
        <Text variant="body" color="secondary">Ano lectivo 2024/2025</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {days.map((day) => (
          <View key={day} className="mb-5">
            <Text variant="sectionTitle" color="primary" className="mb-3 pb-2 border-b border-gray-300 dark:border-slate-700">
              {day}
            </Text>
            {scheduleData
              .filter((item) => item.day === day)
              .map((item) => (
                <ListItem
                  key={item.id}
                  title={item.subject}
                  subtitle={`${item.time} • ${item.room}`}
                  leftIcon="book"
                  showChevron={false}
                />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AcademicScheduleScreen;

