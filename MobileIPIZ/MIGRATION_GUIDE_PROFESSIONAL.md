/**
 * IPIZ Mobile App - Quick Migration Guide for Screens
 * Como refatorar screens existentes para usar os novos componentes profissionais
 */

import { View, Text as RNText } from 'react-native';
import {
  ProfessionalScreen,
  ProfessionalHeader,
  GradientCard,
  Card,
  StatCard,
  Button,
  Input,
} from '@components';

/**
 * BEFORE & AFTER EXAMPLES
 */

// ============================================================================
// EXEMPLO 1: Dashboard/Performance Screen
// ============================================================================

// ANTES (genérico)
const OldDashboardScreen = () => {
  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="bg-blue-500 p-4 rounded">
        <RNText className="text-white">Dashboard</RNText>
      </View>
      <View className="mt-4 bg-white p-4 rounded">
        <RNText>Sua nota: 15.8</RNText>
      </View>
    </View>
  );
};

// DEPOIS (profissional)
const NewDashboardScreen = () => {
  return (
    <ProfessionalScreen>
      {/* Header com gradiente */}
      <ProfessionalHeader
        title="Desempenho Acadêmico"
        subtitle="3º Ano - Eletricidade"
        showDivider={false}
      />

      {/* Main Stat Card com gradiente */}
      <GradientCard variant="primary" className="mt-6">
        <RNText className="text-sky-100 text-sm font-medium">
          Média Geral
        </RNText>
        <RNText className="text-4xl font-bold text-white mt-2">
          15.8
        </RNText>
      </GradientCard>

      {/* Subject Cards Grid */}
      <View className="mt-6 gap-4">
        <StatCard
          title="Eletrotecnia"
          value="17"
          variant="primary"
          showProgress
          progressValue={85}
        />
        <StatCard
          title="Matemática"
          value="14"
          variant="warning"
          showProgress
          progressValue={70}
        />
        <StatCard
          title="Instalações"
          value="16"
          variant="success"
          showProgress
          progressValue={80}
        />
      </View>

      {/* Info Card */}
      <Card variant="elevated" className="mt-6">
        <RNText className="font-semibold text-sky-700">
          Progresso do Semestre
        </RNText>
        <RNText className="text-slate-600 text-sm mt-2">
          85% Completo
        </RNText>
      </Card>
    </ProfessionalScreen>
  );
};

// ============================================================================
// EXEMPLO 2: Login Screen
// ============================================================================

// ANTES (básico)
const OldLoginScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <RNText className="text-2xl font-bold">Login</RNText>
      <View className="mt-4">
        <Input placeholder="Email" />
      </View>
      <View className="mt-4">
        <Input placeholder="Senha" secureTextEntry />
      </View>
      <Button className="mt-4">Entrar</Button>
    </View>
  );
};

// DEPOIS (profissional com gradiente)
const NewLoginScreen = () => {
  return (
    <ProfessionalScreen
      padding="p-6"
      scrollable
      gradientColors={['#1E3A8A', '#0D7377']}
    >
      {/* Logo Section */}
      <View className="items-center gap-4 mb-8">
        <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg">
          <RNText className="text-2xl font-bold text-sky-700">IPIZ</RNText>
        </View>
        <RNText className="text-3xl font-bold text-white">IPIZ Mobile</RNText>
        <RNText className="text-sky-100">Bem-vindo de volta</RNText>
      </View>

      {/* Form Card */}
      <Card variant="elevated" className="gap-4">
        <Input
          label="Email"
          placeholder="seu@email.com"
          variant="outlined"
          required
          keyboardType="email-address"
        />
        <Input
          label="Senha"
          placeholder="••••••••"
          variant="outlined"
          required
          secureTextEntry
        />

        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mt-2"
        >
          Entrar
        </Button>
      </Card>

      {/* Footer */}
      <RNText className="text-sky-100 text-xs text-center mt-6">
        © 2024 IPIZ
      </RNText>
    </ProfessionalScreen>
  );
};

// ============================================================================
// EXEMPLO 3: Jobs/Oportunidades Screen
// ============================================================================

// DEPOIS (profissional)
const NewOpportunitiesScreen = () => {
  return (
    <ProfessionalScreen>
      {/* Header */}
      <ProfessionalHeader
        title="Oportunidades"
        subtitle="56 vagas abertas"
        showDivider={false}
      />

      {/* Filter Chips */}
      <View className="flex-row gap-2 flex-wrap mt-4">
        {['Estágios', 'Empregos', 'Civil', 'Elétrica'].map((chip) => (
          <View
            key={chip}
            className="px-4 py-2 border border-sky-200 rounded-full"
          >
            <RNText className="text-sky-700 font-medium">{chip}</RNText>
          </View>
        ))}
      </View>

      {/* Job Cards */}
      <View className="mt-6 gap-4">
        <Card variant="elevated">
          <View className="gap-2">
            <RNText className="font-bold text-slate-900">
              Estágio em Engenharia Civil
            </RNText>
            <RNText className="text-slate-600">Sonangol - Luanda</RNText>
            <View className="flex-row gap-2 mt-2">
              <View className="px-3 py-1 bg-sky-50 rounded">
                <RNText className="text-xs text-sky-700">Estudante Civil</RNText>
              </View>
              <View className="px-3 py-1 bg-sky-50 rounded">
                <RNText className="text-xs text-sky-700">AutoCAD</RNText>
              </View>
            </View>
            <Button
              variant="primary"
              size="sm"
              className="mt-3 px-4"
            >
              Candidatar
            </Button>
          </View>
        </Card>
      </View>
    </ProfessionalScreen>
  );
};

// ============================================================================
// MIGRATION CHECKLIST
// ============================================================================

/**
 * Para cada screen, siga estes passos:
 * 
 * 1. ✅ Substitua View por ProfessionalScreen
 *    └─ ProfessionalScreen <ScrollView padding="p-6">
 * 
 * 2. ✅ Adicione ProfessionalHeader no topo
 *    └─ ProfessionalHeader title="..." variant="primary"
 * 
 * 3. ✅ Refatore cards com Card ou GradientCard
 *    └─ Card variant="elevated" (dados)
 *    └─ GradientCard variant="primary" (destaques)
 * 
 * 4. ✅ Refatore métricas com StatCard
 *    └─ StatCard title="..." value="..." showProgress
 * 
 * 5. ✅ Atualize cores
 *    └─ Remova cores hardcoded (bg-blue-500)
 *    └─ Use sky-*, teal-*, slate-*
 * 
 * 6. ✅ Atualize Buttons
 *    └─ variant="primary" (azul)
 *    └─ variant="accent" (orange para CTA)
 *    └─ Use size="lg" para mobile
 * 
 * 7. ✅ Refatore Inputs
 *    └─ Use variant="outlined"
 *    └─ Adicione labels com required
 *    └─ Use error states
 * 
 * 8. ✅ Teste spacing
 *    └─ gap-3 entre elementos
 *    └─ p-6 para containers
 *    └─ mt-6 entre seções
 */

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * PATTERN 1: Header + Content Grid
 */
const PatternHeaderGrid = () => (
  <ProfessionalScreen>
    <ProfessionalHeader title="Administração" showDivider={false} />
    <View className="grid grid-cols-2 gap-4 mt-6">
      <StatCard title="Taxa de Empregabilidade" value="78%" />
      <StatCard title="1.250" value="Alunos" />
      <StatCard title="45" value="Professores" />
      <StatCard title="32" value="Empresas" />
    </View>
  </ProfessionalScreen>
);

/**
 * PATTERN 2: Form + Action
 */
const PatternFormAction = () => (
  <ProfessionalScreen>
    <View className="gap-4">
      <Input label="Nome" placeholder="Seu nome" required />
      <Input label="Email" placeholder="seu@email.com" required />
      <Button variant="accent" size="lg" fullWidth>
        Enviar
      </Button>
    </View>
  </ProfessionalScreen>
);

/**
 * PATTERN 3: List with Cards
 */
const PatternCardList = () => (
  <ProfessionalScreen>
    <ProfessionalHeader title="Meus Cursos" showDivider={false} />
    <View className="mt-6 gap-3">
      {[1, 2, 3].map((item) => (
        <Card key={item} variant="elevated">
          <RNText className="font-semibold">Curso {item}</RNText>
          <RNText className="text-slate-600 text-sm">Descrição aqui</RNText>
        </Card>
      ))}
    </View>
  </ProfessionalScreen>
);

/**
 * PATTERN 4: Gradient Highlight + Content
 */
const PatternGradientHero = () => (
  <ProfessionalScreen showGradient={false}>
    <GradientCard variant="primary" className="mb-6">
      <RNText className="text-white font-bold text-lg">Welcome</RNText>
      <RNText className="text-sky-100 text-sm mt-1">Bem-vindo ao app</RNText>
    </GradientCard>
    <Card>
      <RNText>Seu conteúdo aqui</RNText>
    </Card>
  </ProfessionalScreen>
);

export {};
