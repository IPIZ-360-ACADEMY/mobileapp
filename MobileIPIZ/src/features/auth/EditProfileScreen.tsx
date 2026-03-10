import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { colors } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const getStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      backgroundColor: colors.neutral[700],
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
    form: {
      padding: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 8,
      marginTop: 16,
    },
    input: {
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.neutral[300],
    },
    saveButton: {
      backgroundColor: colors.neutral[700],
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 32,
    },
    saveButtonText: {
      color: colors.background.paper,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const styles = getStyles();

  const handleSave = () => {
    Alert.alert(
      'Sucesso',
      'Perfil atualizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background.default }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" style={[styles.container, { backgroundColor: colors.background.default }] }>
        <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: 48 }]}>
          <Pressable style={styles.backButton} android_ripple={{ color: colors.shadow.light }} onPress={() => navigation.goBack()}>
            <Text style={[styles.backButtonText, { color: colors.background.paper }]}>← Cancelar</Text>
          </Pressable>
          <Text style={[styles.title, { color: colors.background.paper }]}>Editar Perfil</Text>
        </View>

        <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text.primary }]}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          placeholderTextColor={colors.text.hint}
        />

        <Text style={[styles.label, { color: colors.text.primary }]}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          placeholderTextColor={colors.text.hint}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.text.primary }]}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Digite seu telefone"
          placeholderTextColor={colors.text.hint}
          keyboardType="phone-pad"
        />

          <Button title="Salvar Alterações" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
