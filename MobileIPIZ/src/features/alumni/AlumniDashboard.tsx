import React, { FC } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * AlumniDashboard - Dashboard para Alumni
 * Conexão com a rede de ex-alunos
 */
export const AlumniDashboard: FC = () => {
  const { isDark } = useTheme();

  const alumniStats = {
    name: 'Carlos Silva',
    graduationYear: 2020,
    currentRole: 'Engenheiro Sênior',
    company: 'Tech Solutions Inc',
    avatar: '👨‍💼',
    mentees: 5,
    connections: 142,
  };

  const recentConnections = [
    { name: 'João Santos', role: 'Aluno atual', avatar: '👨‍🎓', timeago: 'há 2 dias' },
    { name: 'Maria Costa', role: 'Alumni 2019', avatar: '👩‍💼', timeago: 'há 5 dias' },
    { name: 'Pedro Oliveira', role: 'Aluno atual', avatar: '👨‍🎓', timeago: 'há 1 semana' },
  ];

  const mentorshipOpportunities = [
    { title: 'Mentoria em Carreira', description: 'Orienta alunos sobre desenvolvimento profissional', icon: '🎯' },
    { title: 'Networking', description: 'Conecte-se com outros alumni e alunos', icon: '🤝' },
    { title: 'Palestras', description: 'Compartilhe sua experiência com a comunidade', icon: '🎤' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Alumni Header */}
        <View className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <View className="w-14 h-14 bg-emerald-600 dark:bg-emerald-700 rounded-full items-center justify-center">
                <Text className="text-3xl">{alumniStats.avatar}</Text>
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {alumniStats.name}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Alumni {alumniStats.graduationYear}
                </Text>
              </View>
            </View>
            <Pressable className="p-2">
              <Text className="text-xl">⚙️</Text>
            </Pressable>
          </View>

          {/* Professional Info */}
          <View className="mt-4">
            <View className="bg-white dark:bg-slate-800 rounded-lg px-3 py-2 mb-2">
              <Text className="text-xs text-gray-500 dark:text-gray-400">Posição Atual</Text>
              <Text className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {alumniStats.currentRole}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              em {alumniStats.company}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mt-4">
            <View className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {alumniStats.mentees}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Mentorando</Text>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {alumniStats.connections}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Conexões</Text>
            </View>
          </View>
        </View>

        {/* Recent Connections */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Conexões Recentes
          </Text>
          {recentConnections.map((connection, idx) => (
            <Pressable
              key={idx}
              className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-2 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-full items-center justify-center mr-3">
                  <Text className="text-lg">{connection.avatar}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-gray-100">
                    {connection.name}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {connection.role} • {connection.timeago}
                  </Text>
                </View>
              </View>
              <Pressable className="bg-blue-600 dark:bg-blue-700 px-3 py-1 rounded-full">
                <Text className="text-xs font-bold text-white">Conectar</Text>
              </Pressable>
            </Pressable>
          ))}
        </View>

        {/* Mentorship */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oportunidades de Mentoria
          </Text>
          {mentorshipOpportunities.map((opp, idx) => (
            <Pressable
              key={idx}
              className="bg-emerald-50 dark:bg-emerald-900 border-l-4 border-emerald-500 p-4 rounded-lg mb-3"
            >
              <View className="flex-row items-start">
                <Text className="text-3xl mr-3">{opp.icon}</Text>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 dark:text-gray-100">
                    {opp.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {opp.description}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlumniDashboard;
