import React, { FC, useState } from 'react';
import { ScrollView, View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * CompanyDashboard - Painel da Empresa para Recrutadoras
 */
export const CompanyDashboard: FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'vagas' | 'candidatos'>('overview');

  const companyStats = {
    openPositions: 8,
    candidates: 234,
    interviews: 12,
    hiredThisMonth: 3,
  };

  const openPositions = [
    {
      id: '1',
      title: 'Full Stack Developer',
      location: 'São Paulo, SP',
      applications: 28,
      views: 156,
    },
    {
      id: '2',
      title: 'Product Manager',
      location: 'Rio de Janeiro, RJ',
      applications: 15,
      views: 89,
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Remoto',
      applications: 22,
      views: 134,
    },
  ];

  const recentCandidates = [
    {
      id: '1',
      name: 'João Silva',
      position: 'Full Stack Developer',
      date: '2 horas atrás',
      status: 'new',
      icon: '👨‍💼',
    },
    {
      id: '2',
      name: 'Maria Santos',
      position: 'Product Manager',
      date: '5 horas atrás',
      status: 'reviewing',
      icon: '👩‍💼',
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      position: 'UX Designer',
      date: '1 dia atrás',
      status: 'interview',
      icon: '👨‍🎨',
    },
  ];

  const tabs = ['overview', 'vagas', 'candidatos'] as const;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      
      {/* Tab Navigation */}
      <View className="flex-row border-b border-gray-200 dark:border-slate-700 px-4">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-4 border-b-2 items-center ${
              activeTab === tab
                ? 'border-blue-600'
                : 'border-transparent'
            }`}
          >
            <Text
              className={`font-semibold ${
                activeTab === tab
                  ? 'text-blue-600'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab === 'overview' && '📊 Visão Geral'}
              {tab === 'vagas' && '💼 Vagas'}
              {tab === 'candidatos' && '👥 Candidatos'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Company Header */}
            <View className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-lg p-6 mb-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white text-sm opacity-90">Minha Empresa</Text>
                  <Text className="text-white text-2xl font-bold mt-1">TechCorp</Text>
                </View>
                <Text className="text-4xl">🏢</Text>
              </View>
            </View>

            {/* Key Metrics */}
            <View className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  label: 'Vagas Abertas',
                  value: companyStats.openPositions,
                  icon: '💼',
                  color: 'bg-blue-100 dark:bg-blue-900',
                },
                {
                  label: 'Candidatos',
                  value: companyStats.candidates,
                  icon: '👥',
                  color: 'bg-emerald-100 dark:bg-emerald-900',
                },
                {
                  label: 'Entrevistas',
                  value: companyStats.interviews,
                  icon: '📞',
                  color: 'bg-amber-100 dark:bg-amber-900',
                },
                {
                  label: 'Contratados (mês)',
                  value: companyStats.hiredThisMonth,
                  icon: '✓',
                  color: 'bg-purple-100 dark:bg-purple-900',
                },
              ].map((metric, idx) => (
                <View
                  key={idx}
                  className={`${metric.color} rounded-lg p-4 items-center`}
                >
                  <Text className="text-3xl mb-2">{metric.icon}</Text>
                  <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {metric.value}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                    {metric.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Quick Actions */}
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              ⚡ Ações Rápidas
            </Text>
            <Pressable className="bg-blue-600 dark:bg-blue-700 py-3 rounded-lg mb-3 items-center">
              <Text className="text-white font-bold">➕ Publicar Nova Vaga</Text>
            </Pressable>
            <Pressable className="bg-emerald-600 dark:bg-emerald-700 py-3 rounded-lg items-center">
              <Text className="text-white font-bold">📧 Enviar Mensagem em Massa</Text>
            </Pressable>
          </>
        )}

        {/* Vagas Tab */}
        {activeTab === 'vagas' && (
          <>
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              💼 Vagas Abertas
            </Text>
            {openPositions.map((vaga) => (
              <Pressable
                key={vaga.id}
                className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-slate-700"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {vaga.title}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📍 {vaga.location}
                    </Text>
                  </View>
                  <Pressable className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">
                    <Text className="text-blue-600 dark:text-blue-300 text-xs font-bold">
                      Editar
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-row justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                  <View>
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      Candidaturas
                    </Text>
                    <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {vaga.applications}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      Visualizações
                    </Text>
                    <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {vaga.views}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {/* Candidatos Tab */}
        {activeTab === 'candidatos' && (
          <>
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              👥 Candidatos Recentes
            </Text>
            {recentCandidates.map((candidate) => (
              <View
                key={candidate.id}
                className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-slate-700"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{candidate.icon}</Text>
                    <View>
                      <Text className="font-bold text-gray-900 dark:text-gray-100">
                        {candidate.name}
                      </Text>
                      <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {candidate.position}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`${
                      candidate.status === 'new'
                        ? 'bg-emerald-200 dark:bg-emerald-700'
                        : candidate.status === 'reviewing'
                        ? 'bg-blue-200 dark:bg-blue-700'
                        : 'bg-amber-200 dark:bg-amber-700'
                    } px-2 py-1 rounded`}
                  >
                    <Text className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {candidate.status === 'new' && '🆕 Novo'}
                      {candidate.status === 'reviewing' && '📋 Análise'}
                      {candidate.status === 'interview' && '📞 Entrevista'}
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  {candidate.date}
                </Text>
                <Pressable className="border border-gray-300 dark:border-slate-700 py-2 rounded items-center">
                  <Text className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                    Ver Perfil →
                  </Text>
                </Pressable>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDashboard;
