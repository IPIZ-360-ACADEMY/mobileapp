import React, { FC } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../components/base';
import { StudentHeader } from '../../components/CustomHeader';

type Props = DrawerScreenProps<MainDrawerParamList, 'StudentDashboard'>;

export const StudentDashboard: FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <StudentHeader />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
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
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Minhas Disciplinas
          </Text>

          <View className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Mecânica Industrial
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Prof. João Silva
            </Text>
          </View>

          <View className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Eletrotécnica
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Prof. Maria Santos
            </Text>
          </View>
        </View>

        {/* oportunidades */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oportunidades de Estágio
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Jobs')}
            className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3"
          >
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Técnico em Manutenção
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Empresa Industrial XYZ
            </Text>
          </Pressable>
        </View>

        {/* mentorias */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Mentorias Disponíveis
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Alumni')}
            className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3"
          >
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Conexão com Alumni
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Conecte-se com ex-alunos para orientação profissional
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
