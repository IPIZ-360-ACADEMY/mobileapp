import React, { FC } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * AlumniProfileScreen - Perfil de Alumni
 * Mostra trajetória profissional
 */
export const AlumniProfileScreen: FC = () => {
  const { isDark } = useTheme();

  const alumni = {
    name: 'Carlos Silva',
    graduationYear: 2020,
    major: 'Engenharia de Software',
    currentRole: 'Engenheiro Sênior',
    company: 'Tech Solutions Inc',
    bio: 'Apaixonado por tecnologia e mentoria. Ajudando a próxima geração de engenheiros.',
    avatar: '👨‍💼',
    achievements: [
      { title: 'Certificado AWS', year: '2021', icon: '☁️' },
      { title: 'Líder de Projeto', year: '2022', icon: '🏆' },
      { title: 'MVP da Empresa', year: '2023', icon: '⭐' },
    ],
    experience: [
      { role: 'Engenheiro Sênior', company: 'Tech Solutions', period: '2022 - Presente', icon: '💼' },
      { role: 'Engenheiro Pleno', company: 'StartUp XYZ', period: '2020 - 2022', icon: '🚀' },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mb-6 items-center">
          <View className="w-20 h-20 bg-blue-600 dark:bg-blue-700 rounded-full items-center justify-center mb-3">
            <Text className="text-4xl">{alumni.avatar}</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {alumni.name}
          </Text>
          <Text className="text-blue-600 dark:text-blue-400 font-semibold text-center mt-2">
            {alumni.currentRole}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center text-sm mt-1">
            {alumni.company}
          </Text>
        </View>

        {/* Bio */}
        <View className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-6">
          <Text className="text-gray-900 dark:text-gray-100 text-center leading-6">
            {alumni.bio}
          </Text>
          <View className="flex-row gap-2 mt-4 justify-center">
            <Pressable className="bg-blue-600 dark:bg-blue-700 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold text-sm">📧 Contatar</Text>
            </Pressable>
            <Pressable className="border border-blue-600 dark:border-blue-700 px-4 py-2 rounded-full">
              <Text className="text-blue-600 dark:text-blue-400 font-semibold text-sm">➕ Conectar</Text>
            </Pressable>
          </View>
        </View>

        {/* Education */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            🎓 Educação
          </Text>
          <View className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
            <Text className="font-bold text-gray-900 dark:text-gray-100">
              {alumni.major}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              IPIZ • {alumni.graduationYear}
            </Text>
          </View>
        </View>

        {/* Experience */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            💼 Experiência
          </Text>
          {alumni.experience.map((exp, idx) => (
            <View key={idx} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-2 flex-row">
              <Text className="text-2xl mr-3">{exp.icon}</Text>
              <View className="flex-1">
                <Text className="font-bold text-gray-900 dark:text-gray-100">
                  {exp.role}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.company}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {exp.period}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            🏆 Conquistas
          </Text>
          {alumni.achievements.map((ach, idx) => (
            <View
              key={idx}
              className="bg-amber-50 dark:bg-amber-900 border-l-4 border-amber-500 p-4 rounded-lg mb-2 flex-row items-center"
            >
              <Text className="text-2xl mr-3">{ach.icon}</Text>
              <View className="flex-1">
                <Text className="font-semibold text-gray-900 dark:text-gray-100">
                  {ach.title}
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  {ach.year}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlumniProfileScreen;
