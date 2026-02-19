import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/AppNavigator';
import { colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Text style={styles.changeAvatarText}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Perfil</Text>
          <Text style={styles.value}>{user?.role}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{user?.phone || 'Não informado'}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.background.paper,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background.paper,
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.background.paper,
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeAvatarText: {
    color: colors.primary[700],
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    backgroundColor: colors.background.paper,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  infoRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: colors.primary[700],
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  editButtonText: {
    color: colors.background.paper,
    fontSize: 16,
    fontWeight: '600',
  },
});
