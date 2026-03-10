import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text } from '../../components/base';
import { TeacherHeader } from '../../components/CustomHeader';

type Props = DrawerScreenProps<MainDrawerParamList, 'TeacherDashboard'>;

export const TeacherDashboard: FC<Props> = ({ navigation }) => {
  const { theme } = useAppTheme();

  return (
    <Box flex={1} style={{ backgroundColor: theme.background.primary }}>
      <TeacherHeader />

      <ScrollView style={{ flex: 1 }}>
        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Minhas Turmas
          </Text>

          <Box bg="secondary" padding={16} rounded="md" marginBottom={12}>
            <Text variant="body" weight="600" marginBottom={4}>
              Mecânica Industrial - 3º Ano
            </Text>
            <Text variant="bodySmall" color="secondary">
              25 alunos
            </Text>
          </Box>

          <Box bg="secondary" padding={16} rounded="md" marginBottom={12}>
            <Text variant="body" weight="600" marginBottom={4}>
              Eletrotécnica - 2º Ano
            </Text>
            <Text variant="bodySmall" color="secondary">
              30 alunos
            </Text>
          </Box>
        </Box>

        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Avaliações Pendentes
          </Text>

          <Box
            bg="secondary"
            padding={16}
            rounded="md"
            marginBottom={12}
            style={{ cursor: 'pointer' }}
          >
            <Text variant="body" weight="600" marginBottom={4}>
              Prova Final - Mecânica
            </Text>
            <Text variant="bodySmall" color="secondary">
              12 provas para corrigir
            </Text>
          </Box>
        </Box>

        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Gestão de Estágios
          </Text>

          <Box
            bg="secondary"
            padding={16}
            rounded="md"
            marginBottom={12}
            style={{ cursor: 'pointer' }}
            onTouchEnd={() => navigation.navigate('Jobs')}
          >
            <Text variant="body" weight="600" marginBottom={4}>
              Acompanhar Estagiários
            </Text>
            <Text variant="bodySmall" color="secondary">
              Monitore o desempenho dos alunos em estágio
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
