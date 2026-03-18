import React from 'react';
import { ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessionalNavBar } from '../components/navigation/ProfessionalNavBar';
import { PostCard, Post, SectionHeader } from '../components';

/**
 * FeedScreen - Feed de notificações e atualizações
 * Tailwind CSS + design moderno
 */
export const FeedScreen = () => {

  const feedPosts: Post[] = [
    {
      id: 1,
      author: 'Prof. Silva',
      role: 'professor',
      avatar: '👨‍🏫',
      content: 'Novo material de apoio para Mecânica dos Fluidos disponível na plataforma. #EngenhariaCivil',
      likes: 56,
      comments: 12,
      timestamp: 'há 2h',
      icon: '📚',
    },
    {
      id: 2,
      author: 'IPIZ Parcerias',
      role: 'institutional',
      avatar: '🏢',
      content: 'Oportunidade de estágio na SONANGOL. Inscreva-se até 30/10. #Estágio',
      likes: 120,
      comments: 25,
      timestamp: 'há 4h',
      icon: '💼',
    },
    {
      id: 3,
      author: 'Ana Costa',
      role: 'student',
      avatar: '👩‍🎓',
      content: 'Finalizei o projeto da ponte! Um desafio incrível com a turma. #Projeto',
      likes: 89,
      comments: 15,
      timestamp: 'há 6h',
      icon: '🏗️',
    },
    {
      id: 4,
      author: 'Sistema IPIZ',
      role: 'system',
      avatar: '🔔',
      content: 'Período de avaliação começou. Acesse o portal para consultar suas provas. #Avaliação',
      likes: 34,
      comments: 8,
      timestamp: 'há 8h',
      icon: '📋',
    },
  ];


  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Feed Header */}
        <SectionHeader
          title="Notificações"
          subtitle="Fique atualizado com as novidades da comunidade IPIZ"
          className="mb-6"
        />

        {/* Posts */}
        {feedPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {/* Load More */}
        <Pressable className="bg-gray-100 dark:bg-slate-800 rounded-lg py-4 items-center mt-4">
          <Text className="text-gray-700 dark:text-gray-300 font-semibold">
            ↓ Carregar Mais
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedScreen;

