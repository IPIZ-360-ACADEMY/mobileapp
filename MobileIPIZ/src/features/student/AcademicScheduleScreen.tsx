// IPIZ Mobile App - Academic Schedule Screen
// Display student's academic schedule

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text variant="title" color="inverse">Horário Académico</Text>
        <Text variant="body" color="secondary">Ano lectivo 2024/2025</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {days.map((day) => (
          <View key={day} style={styles.daySection}>
            <Text variant="sectionTitle" color="primary" style={styles.dayTitle}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: 20,
    backgroundColor: colors.dark,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  daySection: {
    marginBottom: 20,
  },
  dayTitle: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
});

export default AcademicScheduleScreen;

