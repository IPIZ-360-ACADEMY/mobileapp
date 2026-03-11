import React, { FC } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../components/base';
import { TeacherHeader } from '../../components/CustomHeader';


type Props = DrawerScreenProps<MainDrawerParamList, 'TeacherDashboard'>;

export const TeacherDashboard: FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <TeacherHeader />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Minhas Turmas
          </Text>
        </View>

        <View className="mb-4">
          <View className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Mecânica Industrial - 3º Ano
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              25 alunos
            </Text>
          </View>

          <View className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Eletrotécnica - 2º Ano
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              30 alunos
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Avaliações Pendentes
          </Text>

          <View className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Prova Final - Mecânica
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              12 provas para corrigir
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Gestão de Estágios
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Jobs')}
            className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3"
          >
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Acompanhar Estagiários
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Monitore o desempenho dos alunos em estágio
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
