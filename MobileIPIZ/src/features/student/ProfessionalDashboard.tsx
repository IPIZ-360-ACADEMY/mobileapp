import React, { useState } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/base';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';
import { SectionHeader } from '../../components';

/**
 * ProfessionalDashboard - Dashboard para alunos moderno e atraente
 * Tailwind CSS + design profissional
 */
export const ProfessionalDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const studentStats = {
    name: 'João Silva',
    role: 'Aluno',
    avatar: '👤',
    streak: 15,
    gpa: 8.5,
    completedCourses: 3,
    activeCourses: 5,
  };

  const courses = [
    { id: 1, name: 'Programação Web', progress: 75, color: 'blue' },
    { id: 2, name: 'Mobile Dev', progress: 60, color: 'purple' },
    { id: 3, name: 'Database', progress: 85, color: 'emerald' },
    { id: 4, name: 'DevOps', progress: 45, color: 'amber' },
  ];

  const announcements = [
    { id: 1, title: 'Nova avaliação disponível', date: 'Hoje', icon: '📢' },
    { id: 2, title: 'Feedback recebido', date: 'Ontem', icon: '💬' },
    { id: 3, title: 'Certificado gerado', date: '2 dias', icon: '🎓' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Student Card */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center space-x-4">
              <View className="w-14 h-14 bg-blue-600 dark:bg-blue-700 rounded-full items-center justify-center">
                <Text className="text-3xl">{studentStats.avatar}</Text>
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {studentStats.name}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {studentStats.role}
                </Text>
              </View>
            </View>
            <Pressable className="p-2">
              <Text className="text-xl">⚙️</Text>
            </Pressable>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {studentStats.streak}d
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Sequência</Text>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 items-center">
              <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {studentStats.gpa}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Média</Text>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 items-center">
              <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
                {studentStats.completedCourses}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Concluído</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row gap-2 mb-6">
          {['overview', 'cursos', 'anuncios'].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-full transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 dark:bg-blue-700'
                  : 'bg-gray-100 dark:bg-slate-800'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold capitalize ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {tab === 'overview' ? 'Visão Geral' : tab === 'cursos' ? 'Cursos' : 'Anúncios'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Content */}
        {activeTab === 'overview' && (
          <>
            {/* Próximos Passos */}
            <View className="mb-6">
              <SectionHeader title="Próximos Passos" />
              {[
                { title: 'Completar Aula 5', subtitle: 'Programação Web', icon: '📚' },
                { title: 'Revisar Feedback', subtitle: 'Mobile Dev - Professor comentou', icon: '💡' },
              ].map((action, idx) => (
                <Pressable
                  key={idx}
                  className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 flex-row items-start border-l-4 border-blue-600"
                >
                  <Text className="text-2xl mr-3">{action.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 dark:text-gray-100">
                      {action.title}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {action.subtitle}
                    </Text>
                  </View>
                  <Text className="text-gray-400">→</Text>
                </Pressable>
              ))}
            </View>

            {/* Ações Rápidas */}
            <View className="mb-6">
              <SectionHeader title="Ações Rápidas" />
              <View className="flex-row gap-3">
                {[
                  { icon: '📝', label: 'Tarefas' },
                  { icon: '📊', label: 'Notas' },
                  { icon: '🎯', label: 'Metas' },
                ].map((action, idx) => (
                  <Pressable
                    key={idx}
                    className="flex-1 bg-gray-100 dark:bg-slate-800 p-4 rounded-lg items-center"
                  >
                    <Text className="text-3xl mb-2">{action.icon}</Text>
                    <Text className="text-xs text-center text-gray-700 dark:text-gray-300 font-semibold">
                      {action.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === 'cursos' && (
          <View className="mb-6">
            <SectionHeader title="Seus Cursos" />
            {courses.map((course, idx) => {
              const colorMap = {
                blue: 'blue-600',
                purple: 'purple-600',
                emerald: 'emerald-600',
                amber: 'amber-600',
              };
              return (
                <Pressable
                  key={idx}
                  className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                      {course.name}
                    </Text>
                    <Text className={`text-sm font-bold text-${colorMap[course.color]} dark:text-${colorMap[course.color]}`}>
                      {course.progress}%
                    </Text>
                  </View>
                  <View className="w-full h-2 bg-gray-300 dark:bg-slate-700 rounded-full overflow-hidden">
                    <View
                      className={`h-full bg-${colorMap[course.color]} rounded-full`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {activeTab === 'anuncios' && (
          <View className="mb-6">
            <SectionHeader title="Anúncios Recentes" />
            {announcements.map((announcement, idx) => (
              <Pressable
                key={idx}
                className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 flex-row items-center"
              >
                <Text className="text-2xl mr-3">{announcement.icon}</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-gray-100">
                    {announcement.title}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {announcement.date}
                  </Text>
                </View>
                <Text className="text-gray-400">→</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalDashboard;
