import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../components/ui/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'PostJob'>;

export const PostJobScreen: FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState<'FULL_TIME' | 'INTERNSHIP'>('FULL_TIME');

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
    textArea: {
      height: 120,
    },
    typeContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.neutral[700],
      alignItems: 'center',
    },
    typeButtonActive: {
      backgroundColor: colors.neutral[700],
    },
    typeButtonText: {
      color: colors.neutral[700],
      fontSize: 14,
      fontWeight: '600',
    },
    typeButtonTextActive: {
      color: colors.background.paper,
    },
    postButton: {
      backgroundColor: colors.neutral[700],
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 32,
    },
    postButtonText: {
      color: colors.background.paper,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const styles = getStyles();

  const handlePost = () => {
    if (!title || !description || !location) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    Alert.alert(
      'Vaga Publicada',
      'Sua vaga foi publicada com sucesso e já está visível para os candidatos!',
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
        <Text style={[styles.title, { color: colors.background.paper }]}>Publicar Vaga</Text>
      </View>

        <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text.primary }]}>Título da Vaga *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Técnico em Manutenção Industrial"
          placeholderTextColor={colors.text.hint}
        />

        <Text style={styles.label}>Tipo de Vaga *</Text>
        <View style={styles.typeContainer}>
          <Pressable style={[styles.typeButton, type === 'FULL_TIME' && styles.typeButtonActive, { borderColor: colors.primary }]} android_ripple={{ color: colors.shadow.light }} onPress={() => setType('FULL_TIME')}>
            <Text style={[styles.typeButtonText, type === 'FULL_TIME' && styles.typeButtonTextActive, { color: type === 'FULL_TIME' ? colors.background.paper : colors.primary }]}>Tempo Integral</Text>
          </Pressable>

          <Pressable style={[styles.typeButton, type === 'INTERNSHIP' && styles.typeButtonActive, { borderColor: colors.primary }]} android_ripple={{ color: colors.shadow.light }} onPress={() => setType('INTERNSHIP')}>
            <Text style={[styles.typeButtonText, type === 'INTERNSHIP' && styles.typeButtonTextActive, { color: type === 'INTERNSHIP' ? colors.background.paper : colors.primary }]}>Estágio</Text>
          </Pressable>
        </View>

        <Text style={[styles.label, { color: colors.text.primary }]}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva as responsabilidades e requisitos da vaga..."
          placeholderTextColor={colors.text.hint}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Text style={[styles.label, { color: colors.text.primary }]}>Localização *</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Ex: Luanda, Angola"
          placeholderTextColor={colors.text.hint}
        />

        <Text style={[styles.label, { color: colors.text.primary }]}>Faixa Salarial</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          placeholder="Ex: 150.000 - 250.000 Kz"
          placeholderTextColor={colors.text.hint}
        />

        <Button title="Publicar Vaga" onPress={handlePost} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
