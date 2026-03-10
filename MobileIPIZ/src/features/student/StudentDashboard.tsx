import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigation/AppNavigator';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text } from '../../components/base';
import { StudentHeader } from '../../components/CustomHeader';

type Props = DrawerScreenProps<MainDrawerParamList, 'StudentDashboard'>;

export const StudentDashboard: FC<Props> = ({ navigation }) => {
  const { theme } = useAppTheme();

  return (
    <Box flex={1} style={{ backgroundColor: theme.background.primary }}>
      <StudentHeader />

      <ScrollView style={{ flex: 1 }}>
        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Minhas Disciplinas
          </Text>

          <Box bg="secondary" padding={16} rounded="md" marginBottom={12}>
            <Text variant="body" weight="600" marginBottom={4}>
              Mecânica Industrial
            </Text>
            <Text variant="bodySmall" color="secondary">
              Prof. João Silva
            </Text>
          </Box>

          <Box bg="secondary" padding={16} rounded="md" marginBottom={12}>
            <Text variant="body" weight="600" marginBottom={4}>
              Eletrotécnica
            </Text>
            <Text variant="bodySmall" color="secondary">
              Prof. Maria Santos
            </Text>
          </Box>
        </Box>

        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Oportunidades de Estágio
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
              Técnico em Manutenção
            </Text>
            <Text variant="bodySmall" color="secondary">
              Empresa Industrial XYZ
            </Text>
          </Box>
        </Box>

        <Box padding={16}>
          <Text variant="h3" weight="bold" marginBottom={16}>
            Mentorias Disponíveis
          </Text>

          <Box
            bg="secondary"
            padding={16}
            rounded="md"
            marginBottom={12}
            style={{ cursor: 'pointer' }}
            onTouchEnd={() => navigation.navigate('Alumni')}
          >
            <Text variant="body" weight="600" marginBottom={4}>
              Conexão com Alumni
            </Text>
            <Text variant="bodySmall" color="secondary">
              Conecte-se com ex-alunos para orientação profissional
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
