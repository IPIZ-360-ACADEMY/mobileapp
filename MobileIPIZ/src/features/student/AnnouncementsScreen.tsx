// IPIZ Mobile App - Announcements Screen
// Display institutional announcements

import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text, NotificationCard } from '../../components';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  isRead: boolean;
}

const announcementsData: Announcement[] = [
  { 
    id: '1', 
    title: 'Início do Ano Lectivo 2024/2025', 
    message: 'Informamos que o ano lectivo terá início no dia 15 de Setembro de 2024. Os alunos devem apresentar-se nas secretarias para a confirmação da matrícula.',
    type: 'info',
    time: '2 horas atrás',
    isRead: false 
  },
  { 
    id: '2', 
    title: 'Resultados das Exames de Admissão', 
    message: 'Os resultados dos exames de admissão já se encontram disponíveis na área pessoal de cada candidato.',
    type: 'success',
    time: '1 dia atrás',
    isRead: false 
  },
  { 
    id: '3', 
    title: 'Manutenção dos Laboratórios', 
    message: 'Os laboratórios de Informática e Mecânica estarão em manutenção nos dias 20 e 21 de Setembro. As aulas práticas serão remarcadas.',
    type: 'warning',
    time: '2 dias atrás',
    isRead: true 
  },
  { 
    id: '4', 
    title: 'Bolsa de Estudo - Deadline Aproximado', 
    message: 'Prazo para submissão de candidaturas às bolsas de estudo termina em 30 de Setembro. Não perca esta oportunidade!',
    type: 'warning',
    time: '3 dias atrás',
    isRead: true 
  },
  { 
    id: '5', 
    title: 'Novo Programa de Mentoria', 
    message: 'O IPIZ lança o novo programa de mentoria para conectar estudantes com ex-alunos profissionais.',
    type: 'info',
    time: '5 dias atrás',
    isRead: true 
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Announcements'>;

export const AnnouncementsScreen: FC<Props> = () => {
  const unreadCount = announcementsData.filter(a => !a.isRead).length;
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text variant="title" color="inverse">Anúncios</Text>
        <Text variant="body" color="secondary">
          {unreadCount > 0 ? `${unreadCount} não lido(s)` : 'Todos lidos'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {announcementsData.map((announcement) => (
          <NotificationCard
            key={announcement.id}
            title={announcement.title}
            message={announcement.message}
            type={announcement.type}
            time={announcement.time}
            isRead={announcement.isRead}
          />
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
});

export default AnnouncementsScreen;

