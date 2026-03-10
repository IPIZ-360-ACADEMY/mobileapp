import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';
import { Box, Text } from '../components/base';
import { FeedHeader } from '../components/CustomHeader';

/**
 * FeedScreen - Feed Social da Comunidade
 * Posts de professores, alunos e notícias
 */
export const FeedScreen = () => {
  const { theme } = useAppTheme();

  const feedPosts = [
    {
      id: 1,
      author: 'Prof. Silva',
      role: 'professor',
      avatar: '👨‍🏫',
      content: 'Novo material de apoio para Mecânica dos Fluidos disponível na plataforma. #EngenhariaCivil #ISPTEC',
      image: null,
      likes: 56,
      comments: 12,
      shares: 4,
      timestamp: 'há 2h',
    },
    {
      id: 2,
      author: 'ISPTEC Parcerias',
      role: 'institutional',
      avatar: '🏢',
      content: 'Oportunidade de estágio na SONANGOL. Inscreva-se até 30/10. #Estágio #Engenharia',
      image: null,
      likes: 120,
      comments: 25,
      shares: 10,
      timestamp: 'há 4h',
    },
    {
      id: 3,
      author: 'Ana Costa (Estudante)',
      role: 'student',
      avatar: '👩‍🎓',
      content: 'Finalizamos o projeto da ponte! Foi um desafio incrível. #Projeto #Engenharia',
      image: null,
      likes: 89,
      comments: 15,
      shares: 7,
      timestamp: 'há 6h',
    },
  ];

  return (
    <Box flex={1} style={{ backgroundColor: theme.background.primary }}>
      <FeedHeader />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Posts */}
        <Box paddingH={16} paddingV={12} gap={12}>
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} theme={theme} />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};

interface PostCardProps {
  post: any;
  theme: any;
}

const PostCard: React.FC<PostCardProps> = ({ post, theme }) => (
  <Box
    bg="secondary"
    padding={16}
    rounded="lg"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    }}
  >
    {/* Header do Post */}
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
      marginBottom={12}
    >
      <Box flexDirection="row" gap={12} flex={1} alignItems="center">
        <Box
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: theme.palette.primary.main,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text variant="h2">{post.avatar}</Text>
        </Box>
        <Box flex={1}>
          <Text weight="bold" variant="body">
            {post.author}
          </Text>
          <Text variant="caption" color="secondary">
            {post.timestamp}
          </Text>
        </Box>
      </Box>
      <Pressable style={{ padding: 8 }}>
        <Text variant="body" weight="bold">
          ⋮
        </Text>
      </Pressable>
    </Box>

    {/* Conteúdo */}
    <Text variant="body" marginBottom={12}>
      {post.content}
    </Text>

    {/* Divider */}
    <Box
      style={{
        height: 1,
        backgroundColor: theme.border.light,
        marginVertical: 12,
      }}
    />

    {/* Engagement */}
    <Box
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
    >
      <EngagementButton icon="❤️" label={post.likes} theme={theme} />
      <EngagementButton icon="💬" label={post.comments} theme={theme} />
      <EngagementButton icon="↗️" label={post.shares} theme={theme} />
    </Box>
  </Box>
);

interface EngagementButtonProps {
  icon: string;
  label: number;
  theme: any;
}

const EngagementButton: React.FC<EngagementButtonProps> = ({
  icon,
  label,
  theme,
}) => (
  <Pressable
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    }}
  >
    <Text>{icon}</Text>
    <Text variant="caption" weight="600" color="secondary">
      {label}
    </Text>
  </Pressable>
);
