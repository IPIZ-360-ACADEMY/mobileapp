import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text, Button } from '../../components/base';

/**
 * StudentDashboard - Dashboard Moderno e Minimalista
 * Reconstruído do zero com clean code
 */
export const StudentDashboard = () => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background.primary },
      ]}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Saudação */}
        <Box marginBottom={32}>
          <Text variant="h2" weight="bold">
            Bem-vindo de volta 👋
          </Text>
          <Text
            variant="body"
            color="secondary"
            style={{ marginTop: 8 }}
          >
            Aqui estão suas atividades
          </Text>
        </Box>

        {/* Card de Progresso */}
        <Box
          bg="secondary"
          padding={20}
          rounded="lg"
          marginBottom={24}
        >
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box flex={1}>
              <Text variant="caption" color="tertiary">
                Progresso Este Mês
              </Text>
              <Text variant="h2" weight="bold" style={{ marginTop: 8 }}>
                75%
              </Text>
            </Box>
            <Text variant="h1" style={{ marginRight: 16 }}>
              📊
            </Text>
          </Box>
        </Box>

        {/* Cards de Disciplinas */}
        <Box marginBottom={32}>
          <Text variant="h3" weight="bold" marginBottom={16}>
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
        </Box>

        {/* Cards de Oportunidades */}
        <Box marginBottom={32}>
          <Text variant="h3" weight="bold" marginBottom={16}>
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
        </Box>

        {/* Call to Action */}
        <Box
          padding={24}
          rounded="lg"
          marginBottom={40}
          style={{ backgroundColor: theme.palette.primary[600] }}
        >
          <Text
            variant="h3"
            weight="bold"
            color="inverse"
            center
          >
            Comece uma Mentoria
          </Text>
          <Text
            variant="body"
            color="inverse"
            center
            style={{ marginTop: 8, opacity: 0.9 }}
          >
            Conecte-se com alumni experientes
          </Text>
          <Box marginTop={16}>
            <Button
              label="Explorar Mentorias"
              fullWidth
              variant="outline"
              onPress={() => console.log('Mentorias')}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Card de Disciplina
 */
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
  const { theme } = useAppTheme();

  return (
    <Box
      bg="secondary"
      padding={16}
      rounded="lg"
      style={style}
    >
      <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Box flexDirection="row" alignItems="center" gap={8} marginBottom={8}>
            <Text variant="h2">{emoji}</Text>
            <Text variant="body" weight="600">
              {titulo}
            </Text>
          </Box>
          <Text variant="caption" color="secondary">
            {professor}
          </Text>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box
        marginTop={12}
        rounded="full"
        style={{
          height: 6,
          backgroundColor: theme.palette.neutral[300],
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            height: '100%',
            width: `${progresso}%`,
            backgroundColor: theme.palette.primary[600],
          }}
        />
      </Box>

      <Text
        variant="caption"
        color="tertiary"
        style={{ marginTop: 8 }}
      >
        {progresso}% concluído
      </Text>
    </Box>
  );
};

/**
 * Card de Oportunidade
 */
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
    <Box
      bg="secondary"
      padding={16}
      rounded="lg"
      style={style}
    >
      <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Text variant="body" weight="600" marginBottom={4}>
            {titulo}
          </Text>
          <Text variant="caption" color="secondary">
            {empresa}
          </Text>
          <Text
            variant="body"
            weight="bold"
            color="primary"
            style={{ marginTop: 8 }}
          >
            {salario}
          </Text>
        </Box>
        <Text variant="h3" style={{ marginLeft: 8 }}>
          💼
        </Text>
      </Box>

      <Box flexDirection="row" gap={8} marginTop={12}>
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
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
