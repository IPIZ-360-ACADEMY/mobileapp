import React, { FC, useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

/**
 * EditAlumniProfileScreen - Editar perfil de alumni
 */
export const EditAlumniProfileScreen: FC = () => {
  const { isDark } = useTheme();
  const [bio, setBio] = useState('Engenheiro apaixonado por inovação...');
  const [company, setCompany] = useState('Tech Solutions Inc');
  const [role, setRole] = useState('Engenheiro Sênior');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ProfessionalNavBar />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 px-4 py-6"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            ✏️ Editar Perfil Alumni
          </Text>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Empresa Atual
            </Text>
            <TextInput
              className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100"
              value={company}
              onChangeText={setCompany}
              placeholder="Sua empresa"
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Posição
            </Text>
            <TextInput
              className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100"
              value={role}
              onChangeText={setRole}
              placeholder="Seu cargo"
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Bio
            </Text>
            <TextInput
              className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100"
              value={bio}
              onChangeText={setBio}
              placeholder="Conte sobre você"
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <Pressable
            onPress={handleSave}
            className="bg-blue-600 dark:bg-blue-700 py-4 rounded-lg items-center"
          >
            <Text className="text-white font-bold">
              {isSaving ? '⏳ Salvando...' : '💾 Salvar Alterações'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditAlumniProfileScreen;
