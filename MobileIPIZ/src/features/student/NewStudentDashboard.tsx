import React from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/base';

// Dashboard estudantil modernizado usando Tailwind + theming
export const StudentDashboard = () => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* cabeçalho */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Bem-vindo de volta 👋
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Aqui estão suas atividades
          </Text>
        </View>

        {/* cartão de progresso */}
        <View className="bg-gray-100 dark:bg-slate-800 p-5 rounded-lg mb-6 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Progresso Este Mês
            </Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
              75%
            </Text>
          </View>
          <Text className="text-4xl mr-4">📊</Text>
        </View>

        {/* disciplinas */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Minhas Disciplinas
          </Text>

          <CardDisciplina
            titulo="Mecânica Industrial"
            professor="Prof. João Silva"
            progresso={85}
            emoji="⚙️"
          />
          <CardDisciplina
            titulo="Eletrotécnica"
            professor="Prof. Maria Santos"
            progresso={72}
            emoji="⚡"
            style={{ marginTop: 12 }}
          />
          <CardDisciplina
            titulo="Programação Web"
            professor="Prof. Carlos Oliveira"
            progresso={90}
            emoji="💻"
            style={{ marginTop: 12 }}
          />
        </View>

        {/* oportunidades */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oportunidades 🚀
          </Text>

          <CardOportunidade
            titulo="Estágio em Empresa Tech"
            empresa="Tech Solutions Inc"
            salario="R$ 2.000/mês"
          />
          <CardOportunidade
            titulo="Bolsa de Pesquisa"
            empresa="Universidade Federal"
            salario="R$ 1.500/mês"
            style={{ marginTop: 12 }}
          />
        </View>

        {/* call to action */}
        <View className="p-6 rounded-lg mb-10 bg-blue-600 dark:bg-blue-800">
          <Text className="text-xl font-bold text-white text-center">
            Comece uma Mentoria
          </Text>
          <Text className="text-base text-white text-center mt-2 opacity-90">
            Conecte-se com alumni experientes
          </Text>
          <View className="mt-4">
            <Button
              label="Explorar Mentorias"
              fullWidth
              variant="outline"
              onPress={() => console.log('Mentorias')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface CardDisciplinaProps {
  titulo: string;
  professor: string;
  progresso: number;
  emoji: string;
  style?: any;
}

const CardDisciplina = ({
  titulo,
  professor,
  progresso,
  emoji,
  style,
}: CardDisciplinaProps) => {
  return (
    <View
      className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3"
      style={style}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-2">
            <Text className="text-2xl">{emoji}</Text>
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {titulo}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {professor}
          </Text>
        </View>
      </View>

      {/* barra de progresso */}
      <View className="mt-3 w-full h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-600"
          style={{ width: `${progresso}%` }}
        />
      </View>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {progresso}% concluído
      </Text>
    </View>
  );
};

interface CardOportunidadeProps {
  titulo: string;
  empresa: string;
  salario: string;
  style?: any;
}

const CardOportunidade = ({
  titulo,
  empresa,
  salario,
  style,
}: CardOportunidadeProps) => {
  return (
    <View
      className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mb-3"
      style={style}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {titulo}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {empresa}
          </Text>
          <Text className="text-base font-bold text-blue-600 dark:text-blue-400 mt-2">
            {salario}
          </Text>
        </View>
        <Text className="text-2xl ml-2">💼</Text>
      </View>

      <View className="flex-row space-x-2 mt-3">
        <Button
          label="Candidatar"
          size="sm"
          variant="solid"
          onPress={() => console.log('Candidatar')}
          style={{ flex: 1 }}
        />
        <Button
          label="Detalhes"
          size="sm"
          variant="outline"
          onPress={() => console.log('Detalhes')}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};
