import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/AppNavigator';
import { colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PostJobScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState<'FULL_TIME' | 'INTERNSHIP'>('FULL_TIME');

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Publicar Vaga</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Título da Vaga *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Técnico em Manutenção Industrial"
          placeholderTextColor={colors.text.hint}
        />

        <Text style={styles.label}>Tipo de Vaga *</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'FULL_TIME' && styles.typeButtonActive]}
            onPress={() => setType('FULL_TIME')}
          >
            <Text style={[styles.typeButtonText, type === 'FULL_TIME' && styles.typeButtonTextActive]}>
              Tempo Integral
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, type === 'INTERNSHIP' && styles.typeButtonActive]}
            onPress={() => setType('INTERNSHIP')}
          >
            <Text style={[styles.typeButtonText, type === 'INTERNSHIP' && styles.typeButtonTextActive]}>
              Estágio
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Descrição *</Text>
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

        <Text style={styles.label}>Localização *</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Ex: Luanda, Angola"
          placeholderTextColor={colors.text.hint}
        />

        <Text style={styles.label}>Faixa Salarial</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          placeholder="Ex: 150.000 - 250.000 Kz"
          placeholderTextColor={colors.text.hint}
        />

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Publicar Vaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    borderColor: colors.primary[700],
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary[700],
  },
  typeButtonText: {
    color: colors.primary[700],
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: colors.background.paper,
  },
  postButton: {
    backgroundColor: colors.primary[700],
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
