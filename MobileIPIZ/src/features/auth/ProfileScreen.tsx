import React, { FC } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppTheme } from '../../contexts/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { theme, colors } = useAppTheme();

  const getStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      backgroundColor: colors.background.default,
      paddingTop: 12,
    },
    headerWrapper: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
    },
    headerCard: {
      backgroundColor: colors.background.paper,
      borderRadius: 14,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      justifyContent: 'flex-start',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 3,
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
      backgroundColor: colors.neutral[600],
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
      color: colors.neutral[700],
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
      backgroundColor: colors.neutral[700],
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

  const styles = getStyles();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.default }]} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.headerWrapper}>
        <View style={[styles.headerCard, { backgroundColor: colors.background.paper }]}>
          <Pressable style={styles.backButton} android_ripple={{ color: colors.shadow.light }} onPress={() => navigation.goBack()}>
            <Text style={[styles.backButtonText, { color: colors.text.primary }]}>← Voltar</Text>
          </Pressable>
          <Text style={[styles.title, { color: colors.text.primary }]}>Meu Perfil</Text>
        </View>
      </View>

      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: colors.background.paper }]}>{user?.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Button title="Alterar Foto" variant="outline" onPress={() => {}} style={styles.changeAvatarButton} />
      </View>

      <View style={[styles.section, { backgroundColor: colors.background.paper }] }>
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

      <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
        <Button title="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
      </View>
    </ScrollView>
  );
};
