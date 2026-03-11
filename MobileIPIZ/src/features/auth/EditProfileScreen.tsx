import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../../components/base';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../hooks/useTheme';
import { ProfessionalNavBar } from '../../components/navigation/ProfessionalNavBar';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Nome e email são obrigatórios.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1500);
  };

  const inputFields = [
    { label: 'Nome Completo', value: name, onChangeText: setName, icon: '👤', placeholder: 'Seu nome' },
    { label: 'Email', value: email, onChangeText: setEmail, icon: '✉️', placeholder: 'seu@email.com', keyboardType: 'email-address' },
    { label: 'Telefone', value: phone, onChangeText: setPhone, icon: '📱', placeholder: '(11) 99999-9999', keyboardType: 'phone-pad' },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
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
          {/* Header */}
          <View className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 mb-6 items-center">
            <View className="w-16 h-16 bg-blue-600 dark:bg-blue-700 rounded-full items-center justify-center mb-3">
              <Text className="text-3xl">{user?.name?.charAt(0).toUpperCase() || '👤'}</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center">
              Editar Perfil
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
              Atualize suas informações pessoais
            </Text>
          </View>

          {/* Form Fields */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Informações Pessoais
            </Text>

            {inputFields.map((field, idx) => (
              <View key={idx} className="mb-4">
                <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {field.label}
                </Text>
                <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-3 border border-transparent">
                  <Text className="text-xl mr-3">{field.icon}</Text>
                  <TextInput
                    className="flex-1 text-gray-900 dark:text-gray-100"
                    value={field.value}
                    onChangeText={field.onChangeText}
                    placeholder={field.placeholder}
                    placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                    keyboardType={field.keyboardType || 'default'}
                    editable={!isSaving}
                  />
                </View>
              </View>
            ))}

            {/* Bio (optional) */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Bio (opcional)
              </Text>
              <View className="flex-row items-start bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-3 border border-transparent">
                <Text className="text-xl mr-3 mt-1">💭</Text>
                <TextInput
                  className="flex-1 text-gray-900 dark:text-gray-100"
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Conte um pouco sobre você..."
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={200}
                  editable={!isSaving}
                />
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt- 2 text-right">
                {bio.length}/200
              </Text>
            </View>
          </View>

          {/* Preferences */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Preferências
            </Text>
            {[
              { label: 'Receber notificações por email', icon: '📧' },
              { label: 'Ativar tema escuro', icon: '🌙' },
              { label: 'Perfil público', icon: '🌐' },
            ].map((pref, idx) => (
              <Pressable
                key={idx}
                className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-2 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Text className="text-xl mr-3">{pref.icon}</Text>
                  <Text className="text-gray-900 dark:text-gray-100 font-semibold">
                    {pref.label}
                  </Text>
                </View>
                <View className="w-10 h-6 bg-blue-600 rounded-full" />
              </Pressable>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleSave}
              disabled={isSaving}
              className={`py-4 rounded-lg items-center ${
                isSaving
                  ? 'bg-blue-400 dark:bg-blue-800'
                  : 'bg-blue-600 dark:bg-blue-700'
              }`}
            >
              <Text className="text-white font-bold text-lg">
                {isSaving ? 'Salvando...' : '💾 Salvar Alterações'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              className="py-4 rounded-lg items-center bg-gray-200 dark:bg-slate-800"
            >
              <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg">
                ❌ Cancelar
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;
