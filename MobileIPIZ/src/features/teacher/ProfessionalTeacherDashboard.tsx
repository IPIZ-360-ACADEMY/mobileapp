import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Box, Text, Button } from '../../components/base';

/**
 * TeacherDashboard - Dashboard para Professores
 * Design profissional minimalista
 */
export const ProfessionalTeacherDashboard = () => {
  const { theme } = useAppTheme();
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mock
  const teacherStats = {
    name: 'Dr. Carlos Silva',
    role: 'Professor',
    avatar: '👨‍🏫',
    activeClasses: 4,
    totalStudents: 87,
    pendingGrades: 23,
    avgGrade: 7.8,
  };

  const classes = [
    { id: 1, name: 'Programação Web - Turma A', students: 25, graded: 18 },
    { id: 2, name: 'Programação Web - Turma B', students: 22, graded: 20 },
    { id: 3, name: 'Banco de Dados', students: 20, graded: 15 },
    { id: 4, name: 'DevOps e Cloud', students: 20, graded: 12 },
  ];

  const assignments = [
    { id: 1, title: 'Projeto Final - Web Dev', class: 'Turma A', submissions: '18/25', icon: '📂' },
    { id: 2, title: 'Quiz - Capítulo 3', class: 'Turma B', submissions: '20/22', icon: '📝' },
    { id: 3, title: 'Trabalho em Grupo', class: 'Database', submissions: '15/20', icon: '👥' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Teacher Card */}
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
          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
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
                  {teacherStats.avatar}
                </Text>
              </Box>
              <Text variant="h3" weight="bold">
                {teacherStats.name}
              </Text>
              <Text variant="caption" color="secondary">
                {teacherStats.role}
              </Text>
            </Box>

            <Pressable style={{ padding: 8 }}>
              <Text variant="h2">⋮</Text>
            </Pressable>
          </Box>

          {/* Quick Stats Grid */}
          <Box
            flexDirection="row"
            gap={12}
            marginTop={16}
          >
            <StatCard
              label="Turmas"
              value={teacherStats.activeClasses}
              color={theme.palette.primary.main}
              icon="📚"
            />
            <StatCard
              label="Alunos"
              value={teacherStats.totalStudents}
              color="#4ECDC4"
              icon="👥"
            />
            <StatCard
              label="Pendente"
              value={teacherStats.pendingGrades}
              color="#FFE66D"
              icon="📋"
            />
          </Box>
        </Box>

        {/* Tab Navigation */}
        <Box paddingH={16} marginBottom={20} flexDirection="row" gap={8}>
          {['overview', 'turmas', 'tarefas'].map((tab) => (
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
            {/* Quick Actions */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Ações Rápidas
              </Text>
              <Box flexDirection="row" gap={12}>
                <QuickActionButton icon="➕" label="Tarefa" theme={theme} />
                <QuickActionButton icon="📊" label="Notas" theme={theme} />
                <QuickActionButton icon="📣" label="Anúncio" theme={theme} />
              </Box>
            </Box>

            {/* Pending Reviews */}
            <Box paddingH={16} marginBottom={24}>
              <Text variant="h3" weight="bold" marginBottom={12}>
                Pendientes de Avaliação
              </Text>
              <GradeReviewCard
                title="Projeto Final - Turma A"
                submitted={18}
                total={25}
                theme={theme}
              />
              <GradeReviewCard
                title="Quiz - Turma B"
                submitted={20}
                total={22}
                theme={theme}
              />
            </Box>
          </>
        )}

        {activeTab === 'turmas' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Suas Turmas
            </Text>
            {classes.map((cls) => (
              <ClassCard key={cls.id} class={cls} theme={theme} />
            ))}
          </Box>
        )}

        {activeTab === 'tarefas' && (
          <Box paddingH={16} marginBottom={24}>
            <Text variant="h3" weight="bold" marginBottom={12}>
              Atividades Recentes
            </Text>
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
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
  value: number;
  color: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, icon }) => (
  <Box
    flex={1}
    alignItems="center"
    padding={12}
    rounded="md"
    style={{ backgroundColor: `${color}15` }}
  >
    <Text variant="h2">{icon}</Text>
    <Text variant="caption" color="secondary" marginTop={4} marginBottom={4}>
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

interface GradeReviewCardProps {
  title: string;
  submitted: number;
  total: number;
  theme: any;
}

const GradeReviewCard: React.FC<GradeReviewCardProps> = ({
  title,
  submitted,
  total,
  theme,
}) => {
  const percentage = (submitted / total) * 100;

  return (
    <Pressable
      style={{
        backgroundColor: theme.background.secondary,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: percentage === 100 ? '#4ECDC4' : theme.palette.primary.main,
      }}
    >
      <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start" marginBottom={8}>
        <Text variant="body" weight="600" flex={1}>
          {title}
        </Text>
        <Text variant="bodySmall" weight="bold" style={{ color: theme.palette.primary.main }}>
          {submitted}/{total}
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
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? '#4ECDC4' : theme.palette.primary.main,
          }}
        />
      </Box>
    </Pressable>
  );
};

interface ClassCardProps {
  class: any;
  theme: any;
}

const ClassCard: React.FC<ClassCardProps> = ({ class: cls, theme }) => (
  <Pressable
    style={{
      backgroundColor: theme.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Box flex={1}>
      <Text variant="body" weight="600">
        {cls.name}
      </Text>
      <Text variant="caption" color="secondary" marginTop={4}>
        {cls.students} alunos • {cls.graded} com notas
      </Text>
    </Box>
    <Box
      style={{
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: theme.palette.primary.main + '20',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        variant="body"
        weight="bold"
        style={{ color: theme.palette.primary.main }}
      >
        {Math.round((cls.graded / cls.students) * 100)}%
      </Text>
    </Box>
  </Pressable>
);

interface AssignmentCardProps {
  assignment: any;
  theme: any;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, theme }) => (
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
    <Text variant="h2">{assignment.icon}</Text>
    <Box flex={1}>
      <Text variant="body" weight="600">
        {assignment.title}
      </Text>
      <Text variant="caption" color="secondary" marginTop={4}>
        {assignment.class} • {assignment.submissions} submetido
      </Text>
    </Box>
    <Text variant="h3" style={{ color: theme.text.tertiary }}>
      →
    </Text>
  </Pressable>
);
