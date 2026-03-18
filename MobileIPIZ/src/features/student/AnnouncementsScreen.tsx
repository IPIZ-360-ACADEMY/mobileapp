// IPIZ Mobile App - Announcements Screen
// Display institutional announcements

import React, { FC } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

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

export const AnnouncementsScreen: FC = () => {
  const unreadCount = announcementsData.filter(a => !a.isRead).length;

  const colorForType = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-100 dark:bg-emerald-900 border-emerald-500';
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-900 border-amber-500';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 border-red-500';
      default:
        return 'bg-blue-100 dark:bg-blue-900 border-blue-500';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📢 Anúncios
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {unreadCount > 0 ? `${unreadCount} não lido(s)` : 'Todos lidos'}
        </Text>

        {announcementsData.map((announcement) => (
          <View
            key={announcement.id}
            className={`${colorForType(announcement.type)} border-l-4 p-4 rounded-lg mb-4`}
          >
            <Text className="font-bold text-gray-900 dark:text-gray-100 text-base">
              {announcement.title}
            </Text>
            <Text className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {announcement.message}
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {announcement.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementsScreen;
