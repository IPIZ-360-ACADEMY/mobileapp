import React, { FC } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * MentorshipScreen - Programa de Mentoria
 */
export const MentorshipScreen: FC = () => {
  const { isDark } = useTheme();

  const mentors = [
    { name: 'Dr. Carlos Silva', role: 'Eng. Sênior', company: 'Tech Inc', expertise: 'Arquitetura', avatar: '👨‍💼', available: true },
    { name: 'Dra. Maria Santos', role: 'Tech Lead', company: 'StartUp XYZ', expertise: 'React Native', avatar: '👩‍💼', available: true },
    { name: 'Prof. João Oliveira', role: 'Professor', company: 'IPIZ', expertise: 'Fundamentals', avatar: '👨‍🏫', available: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          🎓 Programa de Mentoria
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Conecte-se com mentores experientes e desenvolva sua carreira
        </Text>

        {mentors.map((mentor, idx) => (
          <View
            key={idx}
            className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 border-l-4"
            style={{ borderLeftColor: mentor.available ? '#16a34a' : '#9ca3af' }}
          >
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">{mentor.avatar}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 dark:text-gray-100">
                    {mentor.name}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {mentor.role} • {mentor.company}
                  </Text>
                </View>
              </View>
              <View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                <Text className="text-xs font-bold text-green-700 dark:text-green-300">
                  {mentor.available ? '✓ Ativo' : '✗ Indisponível'}
                </Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">Especialidade</Text>
              <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {mentor.expertise}
              </Text>
            </View>
            {mentor.available && (
              <Pressable className="bg-blue-600 dark:bg-blue-700 py-2 rounded items-center">
                <Text className="text-white font-bold text-sm">💬 Solicitar Mentoria</Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MentorshipScreen;
