import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/AppNavigator';
import { colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AlumniDashboard: FC = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Dashboard Alumni</Text>
            <Text style={styles.subtitle}>Bem-vindo, {user?.name}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileButtonText}>👤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil Profissional</Text>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('AlumniProfile')}
        >
          <Text style={styles.cardTitle}>Atualizar Situação Profissional</Text>
          <Text style={styles.cardDescription}>
            Mantenha seu perfil atualizado para melhor acompanhamento institucional
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Certificate')}
        >
          <Text style={styles.cardTitle}>Certificado Digital</Text>
          <Text style={styles.cardDescription}>
            Gere e compartilhe seu certificado verificável por QR Code
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Oportunidades</Text>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('PostJob')}
        >
          <Text style={styles.cardTitle}>Publicar Vaga</Text>
          <Text style={styles.cardDescription}>
            Contribua recrutando ex-colegas para sua empresa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('JobList')}
        >
          <Text style={styles.cardTitle}>Explorar Vagas</Text>
          <Text style={styles.cardDescription}>
            Veja oportunidades disponíveis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Mentorship')}
        >
          <Text style={styles.cardTitle}>Mentoria</Text>
          <Text style={styles.cardDescription}>
            Torne-se mentor de estudantes atuais
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    backgroundColor: colors.primary[700],
    padding: 24,
    paddingTop: 48,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileButton: {
    padding: 8,
    backgroundColor: colors.primary[800],
    borderRadius: 8,
  },
  profileButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background.paper,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary[50],
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary[800],
    borderRadius: 8,
  },
  logoutText: {
    color: colors.background.paper,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.background.paper,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
