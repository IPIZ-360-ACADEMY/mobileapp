# IPIZ Mobile - Sistema Educacional Industrial

## Visão Geral

Plataforma mobile full-stack para o Instituto Politécnico Industrial do Zango, desenvolvida com React Native + Expo. Sistema modular com arquitetura escalável, RBAC (Role-Based Access Control) e foco em empregabilidade de ex-alunos.

## Arquitetura

### Stack Tecnológico

- **Frontend**: React Native 0.81.5
- **Framework**: Expo ~54.0
- **Linguagem**: TypeScript 5.9.3
- **Navegação**: React Navigation 7.x
- **Styling**: NativeWind (Tailwind CSS)
- **Gerenciamento de Estado**: Context API

### Estrutura de Diretórios

```
src/
├── app/                    # Configuração de navegação
│   └── AppNavigator.tsx   # RBAC Navigation
├── assets/                # Recursos estáticos (logo, imagens)
├── components/            # Componentes reutilizáveis
├── contexts/              # Context API (Auth, etc.)
│   └── AuthContext.tsx
├── features/              # Módulos por funcionalidade
│   ├── admin/            # Dashboard Administração
│   ├── alumni/           # Módulo Ex-Alunos
│   ├── auth/             # Autenticação
│   ├── company/          # Dashboard Empresas
│   ├── jobs/             # Sistema de Vagas
│   ├── student/          # Dashboard Estudante
│   └── teacher/          # Dashboard Professor
├── hooks/                # Custom React Hooks
├── screens/              # Telas globais
├── services/             # API Services (futuro)
├── store/                # State management
├── theme/                # Sistema de temas
│   ├── colors.ts
│   ├── spacing.ts
│   └── index.ts
├── types/                # TypeScript Definitions
│   ├── user.types.ts
│   ├── job.types.ts
│   └── navigation.types.ts
└── utils/                # Utilitários e helpers
```

## Perfis de Utilizador (RBAC)

### Enums Implementados

```typescript
enum UserRole {
  STUDENT   // Estudante
  TEACHER   // Professor
  ADMIN     // Administração
  COMPANY   // Empresa Parceira
  ALUMNI    // Ex-Aluno
}
```

Cada perfil possui dashboard dedicado e permissões específicas.

## Módulos Principais

### 1. Autenticação
- Login seguro
- Registro por perfil
- Gestão de sessão
- Logout

### 2. Dashboard por Perfil

#### Estudante
- Disciplinas matriculadas
- Oportunidades de estágio
- Conexão com mentores alumni
- Candidaturas a vagas

#### Professor
- Gestão de turmas
- Avaliações pendentes
- Acompanhamento de estagiários
- Controle académico

#### Administração
- Indicadores institucionais
- Taxa de empregabilidade
- Gestão de usuários
- Relatórios estratégicos
- Validação de certificados

#### Empresa
- Publicação de vagas
- Gestão de candidaturas
- Avaliação de estagiários
- Acesso a perfis

#### Alumni (Ex-Aluno)
- Atualização de perfil profissional
- Certificado digital verificável
- Publicação de vagas
- Programa de mentoria
- Networking com ex-colegas

### 3. Módulo Alumni - Estrutura Completa

```typescript
interface AlumniProfile {
  id: string
  userId: string
  graduationYear: number
  courseCompleted: string
  currentAcademicLevel: AcademicLevel
  employmentStatus: EmploymentStatus
  companyName?: string
  jobTitle?: string
  industrySector?: string
  monthlyIncomeRange?: string
  country: string
  professionalSkills: string[]
  availableForMentorship: boolean
  willingToRecruitStudents: boolean
  lastUpdatedAt: string
}

enum AcademicLevel {
  NONE
  TECHNICAL_SPECIALIZATION
  BACHELOR
  POSTGRADUATE
  MASTER
  PHD
}

enum EmploymentStatus {
  EMPLOYED
  SELF_EMPLOYED
  UNEMPLOYED
  STUDYING
  INTERNSHIP
}
```

### 4. Sistema de Vagas

```typescript
interface Job {
  id: string
  companyId: string
  companyName: string
  title: string
  description: string
  requirements: string[]
  skills: string[]
  type: JobType  // FULL_TIME | PART_TIME | INTERNSHIP | CONTRACT
  status: JobStatus  // OPEN | CLOSED | FILLED
  location: string
  salaryRange?: string
  postedAt: string
  deadline?: string
}
```

## Configuração do Projeto

### Pré-requisitos

- Node.js 18+ (LTS)
- npm ou yarn
- Expo CLI
- Expo Go (mobile) ou emulador

### Instalação

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Iniciar servidor de desenvolvimento
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios
```

### Dependências Principais

```json
{
  "expo": "~54.0.33",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@react-navigation/native": "^7.1.28",
  "@react-navigation/native-stack": "^7.13.0",
  "react-native-reanimated": "~4.1.1",
  "react-native-worklets": "latest",
  "nativewind": "^4.2.1",
  "tailwindcss": "^3.4.19",
  "typescript": "^5.9.3"
}
```

## Theme System

### Paleta de Cores

- **Primary**: Blue industrial (#1976D2)
- **Secondary**: Orange (#FF9800)
- **Success**: Green (#2E7D32)
- **Warning**: Orange (#F57C00)
- **Error**: Red (#D32F2F)
- **Neutral**: Grayscale
- **Background**: #F5F5F7 (institucional)

## Segurança (Preparado para Backend)

### Funcionalidades Planejadas

- JWT com Access + Refresh Token
- Hash bcrypt para senhas
- Rate limiting
- Sanitização de inputs
- RBAC granular
- Auditoria de ações críticas

## Funcionalidades Futuras

### Analytics Institucional
- Taxa de empregabilidade por curso
- Distribuição por setor industrial
- Evolução académica dos alumni
- Taxa de conversão estágio → emprego
- Skills mais demandadas

### Certificados Digitais
- Geração automática
- QR Code verificável
- Blockchain (futuro)
- Validação pública

### Sistema Offline-First
- Sincronização automática
- Cache local
- Queue de requisições

### Push Notifications
- Novas vagas
- Mensagens institucionais
- Lembretes de atualização (Alumni)

## Scripts Disponíveis

```bash
npm start           # Inicia Expo dev server
npm run android     # Abre no Android
npm run ios         # Abre no iOS
npm run web         # Abre na web
npm run lint        # Executa ESLint
npm run lint:fix    # Corrige problemas de lint
npm run format      # Formata código com Prettier
npm run type-check  # Verifica tipos TypeScript
```

## Roadmap

### Fase 1 - ✅ Concluída
- [x] Estrutura modular
- [x] Sistema RBAC
- [x] Autenticação básica
- [x] Dashboards por perfil
- [x] Módulo Alumni (estrutura)
- [x] Theme system profissional

### Fase 2 - Backend Integration
- [ ] API REST completa
- [ ] PostgreSQL + Prisma
- [ ] JWT real
- [ ] Integração com serviços

### Fase 3 - Features Avançadas
- [ ] Sistema de mensagens
- [ ] Push notifications
- [ ] Offline-first
- [ ] Analytics dashboard
- [ ] Certificados digitais
- [ ] Sistema de matching (vagas × alunos)

### Fase 4 - Escala Nacional
- [ ] Multi-instituição
- [ ] Métricas nacionais
- [ ] Integração Ministério da Educação
- [ ] Portal web administrativo

## Contribuição

Este projeto segue padrões profissionais de código:
- Clean Code
- SOLID principles
- Conventional Commits
- Code Review obrigatório

## Licença

Propriedade do Instituto Politécnico Industrial do Zango (IPIZ)
Todos os direitos reservados © 2026

## Contato

**Instituto Politécnico Industrial do Zango**
- Localização: Luanda, Angola
- Fundação: 17 de Dezembro

---

**Desenvolvido com foco em empregabilidade e transformação digital da educação técnica em Angola.**
