# 🎨 Documentação do Design System Profissional - MobileIPIZ

## 📋 Visão Geral

O novo Design System da MobileIPIZ foi reconstruído do zero com foco em:

- ✨ **Minimalismo Moderno** - Design limpo e intuitivo
- 🚀 **Escalabilidade** - Cômodo de manter e expandir
- 🎯 **Consistência** - Padrões uniformes em toda a app
- ♿ **Acessibilidade** - Suporta temas claro/escuro
- 📱 **Responsividade** - Adapta-se a qualquer tamanho de tela

---

## 🛠️ Componentes Base

### 1. **Box** - Container Flexível
```typescript
import { Box } from './components/base';

<Box
  bg="primary"           // primary | secondary | tertiary
  padding={16}           // px universal
  paddingH={16}          // padding horizontal
  paddingV={16}          // padding vertical
  margin={8}             // margin universal
  marginH={8}            // margin horizontal
  marginV={8}            // margin vertical
  marginTop={8}          // margin específico
  marginBottom={8}
  marginLeft={8}
  marginRight={8}
  rounded="md"           // none | sm | md | lg | xl | full
  flex={1}               // flex factor
  flexDirection="row"    // row | column
  justifyContent="center"
  alignItems="center"
  gap={12}               // espaçamento entre itens
>
  {/* Conteúdo */}
</Box>
```

### 2. **Text** - Tipografia
```typescript
import { Text } from './components/base';

<Text
  variant="h1"          // h1 | h2 | h3 | body | bodySmall | caption
  weight="bold"         // normal | 600 | bold
  color="primary"       // primary | secondary | tertiary
  center                // boolean - text-align: center
  marginBottom={8}      // suporta margin props
>
  Seu texto aqui
</Text>
```

### 3. **Button** - Botão Interativo
```typescript
import { Button } from './components/base';

<Button
  label="Clique aqui"
  onPress={() => console.log('Clicado!')}
  variant="solid"       // solid | outline | ghost
  size="md"            // sm | md | lg
  fullWidth            // boolean
  disabled={false}
  style={{}}
/>
```

### 4. **Input** - Campo de Entrada
```typescript
import { Input } from './components/base';

<Input
  label="Email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  size="md"             // sm | md | lg
  leftIcon={<Text>✉️</Text>}
  rightIcon={<Text>👁️</Text>}
  onRightIconPress={() => setShowPassword(!showPassword)}
  error="Email inválido"
  secureTextEntry={false}
  multiline={false}
  disabled={false}
/>
```

---

## 🎨 Sistema de Cores

### Light Theme
```typescript
{
  palette: {
    primary: { main: '#3B82F6', dark: '#1E40AF' },
    secondary: { main: '#8B5CF6', dark: '#6D28D9' },
    error: { main: '#EF4444' }
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F3F4F6',
    tertiary: '#E5E7EB'
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF'
  },
  border: {
    light: '#D1D5DB'
  }
}
```

### Dark Theme
```typescript
{
  palette: {
    primary: { main: '#60A5FA', dark: '#3B82F6' },
    secondary: { main: '#A78BFA', dark: '#8B5CF6' },
    error: { main: '#F87171' }
  },
  background: {
    primary: '#111827',
    secondary: '#1F2937',
    tertiary: '#374151'
  },
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF'
  },
  border: {
    light: '#4B5563'
  }
}
```

---

## 📱 Exemplos de Uso

### Dashboard Layout
```typescript
import { Box, Text, Button } from './components/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from './contexts/ThemeContext';

export const MyScreen = () => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
      {/* Header */}
      <Box padding={16} bg="secondary">
        <Text variant="h2" weight="bold">
          Meu Dashboard
        </Text>
      </Box>

      {/* Content */}
      <Box padding={16} gap={12}>
        {/* Card */}
        <Box
          bg="secondary"
          padding={16}
          rounded="lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text weight="bold" marginBottom={8}>Cartão Principal</Text>
          <Text variant="body" color="secondary">
            Conteúdo descritivo
          </Text>
        </Box>

        {/* Button */}
        <Button label="Continuar" onPress={() => {}} fullWidth />
      </Box>
    </SafeAreaView>
  );
};
```

### Form Layout
```typescript
<Box padding={16} gap={16}>
  <Input
    label="Nome"
    placeholder="João Silva"
    value={name}
    onChangeText={setName}
  />

  <Input
    label="Email"
    placeholder="joao@example.com"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    leftIcon={<Text>✉️</Text>}
  />

  <Input
    label="Senha"
    placeholder="Sua senha"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    rightIcon={<Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>}
    onRightIconPress={() => setShowPassword(!showPassword)}
  />

  <Button label="Entrar" onPress={handleLogin} fullWidth />
</Box>
```

---

## 🎯 Padrões de Design

### 1. **Card com Ação**
```typescript
<Pressable
  style={{
    backgroundColor: theme.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.palette.primary.main,
  }}
>
  <Box flexDirection="row" gap={12} alignItems="center">
    <Text variant="h2">📚</Text>
    <Box flex={1}>
      <Text weight="bold">Título do Card</Text>
      <Text variant="caption" color="secondary">
        Descrição ou metadados
      </Text>
    </Box>
    <Text variant="h3">→</Text>
  </Box>
</Pressable>
```

### 2. **Progress Bar**
```typescript
<Box
  style={{
    height: 8,
    backgroundColor: theme.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  }}
>
  <Box
    style={{
      height: '100%',
      width: `${progress}%`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 4,
    }}
  />
</Box>
```

### 3. **Stat Card**
```typescript
<Box
  flex={1}
  alignItems="center"
  padding={12}
  rounded="md"
  style={{ backgroundColor: `${theme.palette.primary.main}15` }}
>
  <Text variant="caption" color="secondary">
    Label
  </Text>
  <Text
    variant="h3"
    weight="bold"
    style={{ color: theme.palette.primary.main }}
  >
    Value
  </Text>
</Box>
```

### 4. **Tab Navigation**
```typescript
<Box paddingH={16} flexDirection="row" gap={8}>
  {['tab1', 'tab2', 'tab3'].map((tab) => (
    <Pressable
      key={tab}
      onPress={() => setActive(tab)}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor:
          activeTab === tab
            ? theme.palette.primary.main
            : theme.background.secondary,
        borderRadius: 20,
      }}
    >
      <Text
        variant="bodySmall"
        weight="600"
        style={{
          color:
            activeTab === tab ? '#fff' : theme.text.secondary,
        }}
      >
        {tab}
      </Text>
    </Pressable>
  ))}
</Box>
```

---

## 🌓 Suporte a Tema

O sistema detecta automaticamente a preferência do dispositivo. Para alternar manualmente:

```typescript
const { theme, scheme, toggleScheme } = useAppTheme();

<Button
  label={scheme === 'dark' ? '☀️ Luz' : '🌙 Escuro'}
  onPress={toggleScheme}
/>
```

---

## 📐 Spacing Scale

Recomenda-se usar múltiplos de 4 ou 8:

```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px
```

---

## 🚀 Migração de Telas Existentes

### Step 1: Substituir imports
```typescript
// Antes
import { View, Text, TouchableOpacity } from 'react-native';

// Depois
import { Box, Text, Button } from './components/base';
import { SafeAreaView } from 'react-native-safe-area-context';
```

### Step 2: Envolver a tela
```typescript
<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
  {/* Conteúdo */}
</SafeAreaView>
```

### Step 3: Substituir componentes
```typescript
// Antes
<View style={{ padding: 16, flexDirection: 'row' }}>
  <Text>Olá</Text>
</View>

// Depois
<Box padding={16} flexDirection="row">
  <Text>Olá</Text>
</Box>
```

---

## 📝 Checklist de Qualidade

Ao criar uma nova tela, verifique:

- ✅ SafeAreaView implementado
- ✅ useAppTheme hook utilizado
- ✅ Componentes base (Box, Text, Button) usados
- ✅ Spacing consistente (múltiplos de 4/8)
- ✅ Shadow/elevation em cards
- ✅ Suporte a tema claro/escuro
- ✅ Feedback visual em Pressables
- ✅ Loading states tratados
- ✅ Error states tratados
- ✅ Acessibilidade considerada

---

## 🔗 Estrutura de Arquivos

```
src/
├── components/
│   └── base/
│       ├── Box.tsx
│       ├── Text.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       └── index.ts
├── contexts/
│   └── ThemeContext.tsx
├── features/
│   ├── auth/
│   │   └── ProfessionalLoginScreen.tsx
│   ├── student/
│   │   ├── ProfessionalDashboard.tsx
│   │   ├── StudentDashboard.tsx (legacy)
│   │   └── NewStudentDashboard.tsx (legacy)
│   ├── teacher/
│   │   ├── ProfessionalTeacherDashboard.tsx
│   │   └── TeacherDashboard.tsx (legacy)
│   ├── admin/
│   │   ├── ProfessionalAdminDashboard.tsx
│   │   └── AdminDashboard.tsx (legacy)
│   └── ... (outras features)
├── hooks/
├── services/
├── theme/
│   └── designSystem.ts
└── types/

App.tsx
SafeAreaProvider + ThemeProvider
```

---

## 💡 Tips & Tricks

### 1. Reutilizar Cards
Crie componentes para padrões recorrentes:
```typescript
interface CardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  theme: any;
}

const ActionCard: React.FC<CardProps> = ({ title, subtitle, icon, onPress, theme }) => (
  <Pressable onPress={onPress}>
    <Box bg="secondary" padding={16} rounded="lg" marginBottom={12}>
      <Box flexDirection="row" gap={12} alignItems="flex-start">
        {icon && <Text variant="h2">{icon}</Text>}
        <Box flex={1}>
          <Text weight="bold">{title}</Text>
          {subtitle && <Text variant="caption" color="secondary">{subtitle}</Text>}
        </Box>
        <Text variant="h3">→</Text>
      </Box>
    </Box>
  </Pressable>
);
```

### 2. Consistent Shadows
```typescript
const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
};

<Box style={shadowStyle}>...</Box>
```

### 3. QuickAction Pattern
```typescript
<Box flexDirection="row" gap={12}>
  {['ação1', 'ação2', 'ação3'].map((action) => (
    <Pressable
      key={action}
      style={{
        flex: 1,
        backgroundColor: theme.background.secondary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
      }}
      onPress={() => handleAction(action)}
    >
      <Text variant="h1">🎯</Text>
      <Text variant="caption" weight="600">{action}</Text>
    </Pressable>
  ))}
</Box>
```

---

## 🐛 Troubleshooting

### SafeAreaView deprecated
✅ Use `react-native-safe-area-context` conforme implementado

### Property doesn't exist
✅ Certifique-se que o prop está em `BoxProps` interface

### Cores não aparecem
✅ Verifique se `useAppTheme()` está sendo chamado

### Layout quebrado em Dark Mode
✅ Use `theme` do hook para cores dinâmicas

---

## 📞 Próximas Versões

- [ ] Animações com Reanimated
- [ ] Componentes: Card, Modal, Toast
- [ ] Componentes: Loader, Badge, Divider
- [ ] Navigation System
- [ ] API Integration
- [ ] Tests & E2E
