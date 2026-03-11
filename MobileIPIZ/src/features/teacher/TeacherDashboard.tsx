import React, { FC } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';
import { DashboardCard, SectionHeader } from '../../components';

// Legacy teacher dashboard kept for compatibility. Uses professional nav bar now.

type Props = DrawerScreenProps<MainDrawerParamList, 'TeacherDashboard'>;

export const TeacherDashboard: FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <SectionHeader title="Minhas Turmas" />

          <DashboardCard
            title="Mecânica Industrial - 3º Ano"
            subtitle="25 alunos"
            icon="users"
            variant="filled"
            size="md"
            className="mb-3"
          />

          <DashboardCard
            title="Eletrotécnica - 2º Ano"
            subtitle="30 alunos"
            icon="users"
            variant="filled"
            size="md"
            className="mb-3"
          />
        </View>

        <View className="mb-8">
          <SectionHeader title="Avaliações Pendentes" />

          <DashboardCard
            title="Prova Final - Mecânica"
            subtitle="12 provas para corrigir"
            icon="clipboard"
            variant="default"
            size="md"
            className="mb-3"
          />
        </View>

        <View className="mb-8">
          <SectionHeader title="Gestão de Estágios" />

          <DashboardCard
            title="Acompanhar Estagiários"
            subtitle="Monitore o desempenho dos alunos em estágio"
            icon="briefcase"
            variant="default"
            size="md"
            onPress={() => navigation.navigate('Jobs')}
            className="mb-3"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
