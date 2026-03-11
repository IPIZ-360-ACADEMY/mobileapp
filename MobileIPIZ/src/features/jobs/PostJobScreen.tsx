import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../../components/base/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'PostJob'>;

export const PostJobScreen: FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();

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
    <KeyboardAvoidingView className="flex-1 bg-white dark:bg-slate-900" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className="flex-1 bg-white dark:bg-slate-900" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="bg-blue-600 dark:bg-blue-800 px-6 py-6 pt-12">
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#cbd5e1' }}
            className="mb-4"
          >
            <Text className="text-white text-base">← Cancelar</Text>
          </Pressable>
          <Text className="text-white text-2xl font-bold">Publicar Vaga</Text>
        </View>

        <View className="p-4">
          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Título da Vaga *</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-4"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Técnico em Manutenção Industrial"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          />

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Tipo de Vaga *</Text>
          <View className="flex-row space-x-2 mb-4">
            {['FULL_TIME','INTERNSHIP'].map(opt => {
              const active = type === opt;
              const label = opt === 'FULL_TIME' ? 'Tempo Integral' : 'Estágio';
              return (
                <Pressable
                  key={opt}
                  onPress={() => setType(opt as any)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${active ? 'bg-blue-600 border-blue-600' : 'border-blue-600'}`}
                  android_ripple={{ color: '#cbd5e1' }}
                >
                  <Text className={`${active ? 'text-white' : 'text-blue-600'} text-center text-sm font-semibold`}>{label}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Descrição *</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-4 h-32 text-base text-gray-900 dark:text-gray-100"
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva as responsabilidades e requisitos da vaga..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Localização *</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-4"
            value={location}
            onChangeText={setLocation}
            placeholder="Ex: Luanda, Angola"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          />

          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Faixa Salarial</Text>
          <TextInput
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-6"
            value={salary}
            onChangeText={setSalary}
            placeholder="Ex: 150.000 - 250.000 Kz"
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          />

          <Button title="Publicar Vaga" onPress={handlePost} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostJobScreen;
