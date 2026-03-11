import React, { FC } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * CertificateScreen - Certificados e Diplomas
 */
export const CertificateScreen: FC = () => {
  const { isDark } = useTheme();

  const certificates = [
    {
      title: 'Diploma - Engenharia de Software',
      issuer: 'Instituto Técnico',
      date: '2020',
      icon: '🎓',
      verified: true,
    },
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2021',
      icon: '☁️',
      verified: true,
    },
    {
      title: 'React Advanced Course',
      issuer: 'Tech Academy',
      date: '2022',
      icon: '⚛️',
      verified: false,
    },
    {
      title: 'Leadership Certification',
      issuer: 'Professional Development',
      date: '2023',
      icon: '👥',
      verified: true,
    },
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
          📜 Certificados
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Seus certificados e diplomas verificados
        </Text>

        {certificates.map((cert, idx) => (
          <Pressable
            key={idx}
            className={`${
              cert.verified ? 'bg-emerald-50 dark:bg-emerald-900' : 'bg-amber-50 dark:bg-amber-900'
            } border-l-4 ${
              cert.verified ? 'border-emerald-500' : 'border-amber-500'
            } p-4 rounded-lg mb-3`}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-start flex-1">
                <Text className="text-4xl mr-4">{cert.icon}</Text>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 dark:text-gray-100 text-base">
                    {cert.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {cert.issuer}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {cert.date}
                  </Text>
                </View>
              </View>
              <View
                className={`${
                  cert.verified ? 'bg-emerald-200 dark:bg-emerald-700' : 'bg-amber-200 dark:bg-amber-700'
                } px-2 py-1 rounded flex-row items-center`}
              >
                <Text className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  {cert.verified ? '✓ Verificado' : '⏳ Pendente'}
                </Text>
              </View>
            </View>
            <Pressable className="mt-3 border border-gray-300 dark:border-slate-700 py-2 rounded items-center">
              <Text className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                📥 Baixar Certificado
              </Text>
            </Pressable>
          </Pressable>
        ))}

        {/* Import Certificate */}
        <Pressable className="bg-blue-600 dark:bg-blue-700 py-4 rounded-lg items-center mt-6">
          <Text className="text-white font-bold">
            ➕ Importar Novo Certificado
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CertificateScreen;
