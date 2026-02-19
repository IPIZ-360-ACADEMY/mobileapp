import React, { FC, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from '../components';
import { colors } from '../theme';

interface FeedCardData {
  id: string;
  title: string;
  description: string;
}

const FEED_CARDS: FeedCardData[] = [
  {
    id: '1',
    title: 'Exemplo de Card',
    description:
      'Este é um exemplo de card no feed. Você pode personalizar este layout conforme necessário.',
  },
  {
    id: '2',
    title: 'Card 2',
    description: 'Adicione mais conteúdo aqui.',
  },
  {
    id: '3',
    title: 'Card 3',
    description: 'Continue construindo seu feed personalizado.',
  },
];

const FeedCard: FC<FeedCardData> = ({ title, description }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export const FeedScreen: FC = () => {
  const handleMenuPress = useCallback(() => {
    console.log('Menu pressed');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Header onMenuPress={handleMenuPress} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Feed</Text>
          <Text style={styles.subtitle}>Bem-vindo ao MobileIPIZ</Text>

          {FEED_CARDS.map(card => (
            <FeedCard key={card.id} {...card} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  contentWrapper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
