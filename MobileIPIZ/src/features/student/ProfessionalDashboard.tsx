import React, { useState } from 'react';
import { ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text, Button } from '../../components/base';

const { width } = Dimensions.get('window');

/**
 * ProfessionalDashboard - Dashboard minimalista e escalável
 * Design profissional seguindo tendências 2024+
 */
export const ProfessionalDashboard = () => {
  const { theme } = useAppTheme();
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mock
  const userStats = {
    name: 'João Silva',
    role: 'Estudante',
    avatar: '👥',
    streak: 15,
    gpa: 8.5,
    completedCourses: 3,
    activeCourses: 5,
  };

  const courses = [
    { id: 1, name: 'Programação Web', progress: 75, color: theme.palette.primary.main },
    { id: 2, name: 'Mobile Dev', progress: 60, color: '#FF6B6B' },
    { id: 3, name: 'Database', progress: 85, color: '#4ECDC4' },
    { id: 4, name: 'DevOps', progress: 45, color: '#FFE66D' },
  ];

  const announcements = [
    { id: 1, title: 'Nova avaliação disponível', date: 'Hoje', icon: '📢' },
    { id: 2, title: 'Feedback recebido', date: 'Ontem', icon: '💬' },
    { id: 3, title: 'Certificado gerado', date: '2 dias', icon: '🎓' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - User Card */}
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
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            marginBottom={16}
          >
            {/* Avatar e Nome */}
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
                  {userStats.avatar}
                </Text>
              </Box>
              <Text variant="h3" weight="bold">
                {userStats.name}
              </Text>
              <Text variant="caption" color="secondary">
                {userStats.role}
              </Text>
            </Box>

            {/* Menu Icon */}
            <Pressable style={{ padding: 8 }}>
              <Text variant="h2">⋮</Text>
            </Pressable>
          </Box>

          {/* Quick Stats */}
          <Box
            flexDirection="row"
            gap={12}
          >
            <StatCard
              label="Sequência"
              value={`${userStats.streak}d`}
              color={theme.palette.primary.main}
              theme={theme}
            />
            <StatCard
              label="Média"
              value={`${userStats.gpa}`}
              color="#4ECDC4"
              theme={theme}
            />
            <StatCard
              label="Concluído"
              value={userStats.completedCourses}
              color="#FFE66D"
              theme={theme}
            />
          </Box>
        </Box>

        {/* Navigation Tabs */}
        <Box
          paddingH={16}
          marginBottom={20}
          flexDirection="row"
          gap={8}
        >
          {['overview', 'cursos', 'anuncios'].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: activeTab === tab ? theme.palette.primary.main : theme.background.secondary,
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

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Recommended Actions */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Próximos Passos
              </Text>
              <ActionCard
                title="Completar Aula 5"
                subtitle="Programação Web"
                icon="📚"
                theme={theme}
              />
              <ActionCard
                title="Revisar Feedback"
                subtitle="Mobile Dev - Professor comentou"
                icon="💡"
                theme={theme}
              />
            </Box>

            {/* Quick Actions */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Ações Rápidas
              </Text>
              <Box flexDirection="row" gap={12}>
                <QuickActionButton icon="📝" label="Tarefas" theme={theme} />
                <QuickActionButton icon="📊" label="Notas" theme={theme} />
                <QuickActionButton icon="🎯" label="Metas" theme={theme} />
              </Box>
            </Box>
          </>
        )}

        {activeTab === 'cursos' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Seus Cursos
            </Text>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                theme={theme}
              />
            ))}
          </Box>
        )}

        {activeTab === 'anuncios' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Anúncios Recentes
            </Text>
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                theme={theme}
              />
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
  value: string | number;
  color: string;
  theme: any;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, theme }) => (
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

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  theme: any;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, subtitle, icon, theme }) => (
  <Pressable
    style={{
      marginBottom: 12,
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.palette.primary.main,
    }}
  >
    <Box flexDirection="row" gap={12} alignItems="flex-start">
      <Text variant="h2">{icon}</Text>
      <Box flex={1}>
        <Text variant="body" weight="600">
          {title}
        </Text>
        <Text variant="caption" color="secondary" marginTop={4}>
          {subtitle}
        </Text>
      </Box>
      <Text variant="h3">→</Text>
    </Box>
  </Pressable>
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
    <Text variant="h1" marginBottom={4}>{icon}</Text>
    <Text variant="caption" weight="600">{label}</Text>
  </Pressable>
);

interface CourseCardProps {
  course: any;
  theme: any;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, theme }) => (
  <Box
    bg="secondary"
    padding={16}
    rounded="md"
    marginBottom={12}
  >
    <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start" marginBottom={12}>
      <Text variant="body" weight="bold" flex={1}>
        {course.name}
      </Text>
      <Text variant="bodySmall" weight="bold" style={{ color: course.color }}>
        {course.progress}%
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
          width: `${course.progress}%`,
          backgroundColor: course.color,
          borderRadius: 4,
        }}
      />
    </Box>
  </Box>
);

interface AnnouncementCardProps {
  announcement: any;
  theme: any;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, theme }) => (
  <Pressable
    style={{
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    }}
  >
    <Text variant="h2">{announcement.icon}</Text>
    <Box flex={1}>
      <Text variant="body" weight="600">
        {announcement.title}
      </Text>
      <Text variant="caption" color="secondary">
        {announcement.date}
      </Text>
    </Box>
    <Text variant="h3" style={{ color: theme.text.tertiary }}>
      →
    </Text>
  </Pressable>
);
