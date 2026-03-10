import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text, Button } from '../../components/base';

/**
 * AdminDashboard - Dashboard para Administradores
 * Painel de controle profissional minimalista
 */
export const ProfessionalAdminDashboard = () => {
  const { theme } = useAppTheme();
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mock
  const adminStats = {
    name: 'Administrador Sistema',
    role: 'Admin',
    avatar: '👨‍💼',
    totalUsers: 1250,
    activeUsers: 892,
    pendingApprovals: 12,
    systemHealth: 98,
  };

  const systemMetrics = [
    { label: 'Usuários Online', value: 342, color: theme.palette.primary.main, icon: '👥' },
    { label: 'Requisições/min', value: '2.5K', color: '#4ECDC4', icon: '⚡' },
    { label: 'Taxa de Erro', value: '0.2%', color: '#FFE66D', icon: '⚠️' },
  ];

  const recentActivities = [
    { id: 1, action: 'Novo usuário registrado', user: 'Maria Silva', time: 'há 5 min', icon: '✨' },
    { id: 2, action: 'Curso criado', user: 'Prof. Carlos', time: 'há 1h', icon: '📚' },
    { id: 3, action: 'Erro de acesso reportado', user: 'João Santos', time: 'há 2h', icon: '🚨' },
  ];

  const systemStatus = [
    { service: 'API Backend', status: 'online', uptime: '99.8%' },
    { service: 'Database', status: 'online', uptime: '99.9%' },
    { service: 'Cache Server', status: 'online', uptime: '99.6%' },
    { service: 'Storage', status: 'online', uptime: '99.9%' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Admin Card */}
        <Box
          bg="secondary"
          padding={20}
          margin={16}
          rounded="lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start" marginBottom={16}>
            <Box flex={1}>
              <Box
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 999,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text variant="h2" weight="bold" style={{ color: '#fff' }}>
                  {adminStats.avatar}
                </Text>
              </Box>
              <Text variant="h3" weight="bold">
                {adminStats.name}
              </Text>
              <Text variant="caption" color="secondary">
                {adminStats.role}
              </Text>
            </Box>

            <Pressable style={{ padding: 8 }}>
              <Text variant="h2">⋮</Text>
            </Pressable>
          </Box>

          {/* System Health */}
          <Box marginBottom={16}>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={8}>
              <Text variant="bodySmall" weight="600">
                Saúde do Sistema
              </Text>
              <Text
                variant="bodySmall"
                weight="bold"
                style={{ color: adminStats.systemHealth >= 95 ? '#4ECDC4' : theme.palette.primary.main }}
              >
                {adminStats.systemHealth}%
              </Text>
            </Box>
            <Box
              style={{
                height: 8,
                backgroundColor: theme.background.tertiary,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                style={{
                  height: '100%',
                  width: `${adminStats.systemHealth}%`,
                  backgroundColor: adminStats.systemHealth >= 95 ? '#4ECDC4' : theme.palette.primary.main,
                  borderRadius: 4,
                }}
              />
            </Box>
          </Box>

          {/* Quick Stats */}
          <Box flexDirection="row" gap={12}>
            <StatCard label="Usuários" value={adminStats.totalUsers} color={theme.palette.primary.main} />
            <StatCard label="Ativos" value={adminStats.activeUsers} color="#4ECDC4" />
            <StatCard label="Pendente" value={adminStats.pendingApprovals} color="#FFE66D" />
          </Box>
        </Box>

        {/* Tab Navigation */}
        <Box paddingH={16} marginBottom={20} flexDirection="row" gap={8}>
          {['overview', 'servicos', 'atividade'].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor:
                  activeTab === tab ? theme.palette.primary.main : theme.background.secondary,
                borderRadius: 20,
              }}
            >
              <Text
                variant="bodySmall"
                weight="600"
                style={{
                  color: activeTab === tab ? '#fff' : theme.text.secondary,
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </Box>

        {/* Content */}
        {activeTab === 'overview' && (
          <>
            {/* System Metrics */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Métricas do Sistema
              </Text>
              <Box flexDirection="row" gap={12}>
                {systemMetrics.map((metric, idx) => (
                  <Box
                    key={idx}
                    flex={1}
                    alignItems="center"
                    padding={12}
                    rounded="md"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Text variant="h2">{metric.icon}</Text>
                    <Text variant="caption" color="secondary" marginTop={4} marginBottom={4}>
                      {metric.label}
                    </Text>
                    <Text
                      variant="body"
                      weight="bold"
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Quick Actions */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Ações Rápidas
              </Text>
              <Box flexDirection="row" gap={12}>
                <QuickActionButton icon="➕" label="Usuário" theme={theme} />
                <QuickActionButton icon="📊" label="Relatório" theme={theme} />
                <QuickActionButton icon="⚙️" label="Config" theme={theme} />
              </Box>
            </Box>

            {/* Pending Approvals */}
            <Box paddingH={16} marginBottom={24}>
              <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={12}>
                <Text variant="h3" weight="bold">
                  Aprovações Pendentes
                </Text>
                <Text
                  variant="caption"
                  style={{
                    backgroundColor: `${theme.palette.primary.main}30`,
                    color: theme.palette.primary.main,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  {adminStats.pendingApprovals}
                </Text>
              </Box>
              <ApprovalCard theme={theme} />
              <ApprovalCard theme={theme} />
            </Box>
          </>
        )}

        {activeTab === 'servicos' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Status dos Serviços
            </Text>
            {systemStatus.map((service) => (
              <ServiceCard key={service.service} service={service} theme={theme} />
            ))}
          </Box>
        )}

        {activeTab === 'atividade' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Atividades Recentes
            </Text>
            {recentActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} theme={theme} />
            ))}
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Components auxiliares

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <Box
    flex={1}
    alignItems="center"
    padding={12}
    rounded="md"
    style={{ backgroundColor: `${color}15` }}
  >
    <Text variant="caption" color="secondary" marginBottom={4}>
      {label}
    </Text>
    <Text
      variant="h3"
      weight="bold"
      style={{ color }}
    >
      {value}
    </Text>
  </Box>
);

interface QuickActionButtonProps {
  icon: string;
  label: string;
  theme: any;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, theme }) => (
  <Pressable
    style={{
      flex: 1,
      backgroundColor: theme.background.secondary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    }}
  >
    <Text variant="h1">{icon}</Text>
    <Text variant="caption" weight="600" marginTop={4}>{label}</Text>
  </Pressable>
);

interface ApprovalCardProps {
  theme: any;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ theme }) => (
  <Pressable
    style={{
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box flex={1}>
      <Text variant="body" weight="600">
        Novo Usuário - Admin
      </Text>
      <Text variant="caption" color="secondary" marginTop={4}>
        Pendente há 2 dias
      </Text>
    </Box>
    <Box flexDirection="row" gap={8}>
      <Pressable
        style={{
          backgroundColor: theme.palette.primary.main,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        }}
      >
        <Text variant="caption" style={{ color: '#fff', fontWeight: '600' }}>
          OK
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: theme.background.tertiary,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        }}
      >
        <Text variant="caption" weight="600">
          Negar
        </Text>
      </Pressable>
    </Box>
  </Pressable>
);

interface ServiceCardProps {
  service: any;
  theme: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, theme }) => (
  <Pressable
    style={{
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box flex={1}>
      <Text variant="body" weight="600">
        {service.service}
      </Text>
      <Text variant="caption" color="secondary" marginTop={4}>
        Uptime: {service.uptime}
      </Text>
    </Box>
    <Box
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: service.status === 'online' ? '#4ECDC430' : '#FF6B6B30',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="h2">
        {service.status === 'online' ? '✓' : '✕'}
      </Text>
    </Box>
  </Pressable>
);

interface ActivityCardProps {
  activity: any;
  theme: any;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, theme }) => (
  <Pressable
    style={{
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    }}
  >
    <Text variant="h2">{activity.icon}</Text>
    <Box flex={1}>
      <Text variant="body" weight="600">
        {activity.action}
      </Text>
      <Text variant="caption" color="secondary" marginTop={4}>
        por {activity.user} • {activity.time}
      </Text>
    </Box>
    <Text variant="h3" style={{ color: theme.text.tertiary }}>
      →
    </Text>
  </Pressable>
);
