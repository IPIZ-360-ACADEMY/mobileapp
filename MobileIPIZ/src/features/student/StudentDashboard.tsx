import React, { FC } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';
import { DashboardCard, SectionHeader } from '../../components';

// This screen is a legacy entrypoint but kept for compatibility. It now
// uses the professional navbar and modern styling similar to
// ProfessionalDashboard/Student.

type Props = DrawerScreenProps<MainDrawerParamList, 'StudentDashboard'>;

export const StudentDashboard: FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* header saudação */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Bem-vindo de volta 👋
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Aqui estão suas atividades
          </Text>
        </View>

        {/* disciplinas */}
        <View className="mb-8">
          <SectionHeader title="Minhas Disciplinas" />

          <DashboardCard
            title="Mecânica Industrial"
            subtitle="Prof. João Silva"
            icon="book"
            variant="filled"
            size="md"
            className="mb-3"
          />

          <DashboardCard
            title="Eletrotécnica"
            subtitle="Prof. Maria Santos"
            icon="book"
            variant="filled"
            size="md"
            className="mb-3"
          />
        </View>

        {/* oportunidades */}
        <View className="mb-8">
          <SectionHeader title="Oportunidades de Estágio" />

          <DashboardCard
            title="Técnico em Manutenção"
            subtitle="Empresa Industrial XYZ"
            icon="briefcase"
            variant="default"
            size="md"
            onPress={() => navigation.navigate('Jobs')}
            className="mb-3"
          />
        </View>

        {/* mentorias */}
        <View className="mb-8">
          <SectionHeader title="Mentorias Disponíveis" />

          <DashboardCard
            title="Conexão com Alumni"
            subtitle="Conecte-se com ex-alunos para orientação profissional"
            icon="users"
            variant="default"
            size="md"
            onPress={() => navigation.navigate('Alumni')}
            className="mb-3"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

