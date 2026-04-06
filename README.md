# IPIZ Mobile App — Documentação Completa do Projecto

> **Instituto Politécnico Industrial do Zango · 17 de Dezembro · Luanda, Angola**  
> Plataforma educacional mobile full-stack para gestão académica, empregabilidade e rede de alumni.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Estado Actual do Projecto](#2-estado-actual-do-projecto)
3. [Estrutura do Repositório](#3-estrutura-do-repositório)
4. [Stack Tecnológico](#4-stack-tecnológico)
5. [Frontend — MobileIPIZ](#5-frontend--mobileipiz)
   - [Instalação e Arranque](#51-instalação-e-arranque)
   - [Estrutura de Directórios](#52-estrutura-de-directórios)
   - [Navegação e Fluxo de Ecrãs](#53-navegação-e-fluxo-de-ecrãs)
   - [Sistema de Autenticação (Mock)](#54-sistema-de-autenticação-mock)
   - [Módulos por Perfil de Utilizador](#55-módulos-por-perfil-de-utilizador)
   - [Biblioteca de Componentes](#56-biblioteca-de-componentes)
   - [Sistema de Temas e Design System](#57-sistema-de-temas-e-design-system)
   - [Tipos TypeScript](#58-tipos-typescript)
   - [Scripts Disponíveis](#59-scripts-disponíveis)
6. [Backend — API REST](#6-backend--api-rest)
   - [Instalação e Arranque](#61-instalação-e-arranque)
   - [Estrutura de Directórios](#62-estrutura-de-directórios)
   - [Endpoints da API](#63-endpoints-da-api)
   - [Modelos de Dados](#64-modelos-de-dados)
   - [Variáveis de Ambiente](#65-variáveis-de-ambiente)
7. [Perfis de Utilizador (RBAC)](#7-perfis-de-utilizador-rbac)
8. [O que Está Implementado](#8-o-que-está-implementado)
9. [O que Está em Falta](#9-o-que-está-em-falta)
10. [Problemas Conhecidos](#10-problemas-conhecidos)
11. [Roadmap](#11-roadmap)
12. [Contribuição](#12-contribuição)

---

## 1. Visão Geral

O **IPIZ Mobile App** é uma aplicação móvel educacional concebida para digitalizar e modernizar os processos do Instituto Politécnico Industrial do Zango. A plataforma serve cinco perfis de utilizador distintos — estudantes, professores, administradores, alumni (ex-alunos) e empresas parceiras —, cada um com dashboard dedicado e funcionalidades próprias.

O projecto é composto por dois sub-projectos independentes:

| Sub-projecto | Directório | Tecnologia | Estado |
|---|---|---|---|
| Aplicação Mobile | `MobileIPIZ/` | React Native + Expo | ✅ ~90% completo (UI) |
| API REST | `backend/` | Node.js + Express | ⚠️ ~30% completo (skeleton) |

---

## 2. Estado Actual do Projecto

### ✅ O que funciona hoje

- **Compilação sem erros** — `tsc --noEmit` passa com 0 erros após correcções recentes
- **Lint sem erros** — ESLint (v9 flat config) passa com 0 erros
- **Todas as 21 ecrãs do frontend** estão implementadas com dados simulados (mock data)
- **Navegação completa** — bottom tab + stack navigators com controlo de acesso por papel
- **Sistema de autenticação** — login/logout/registo funcional com dados mock
- **RBAC no cliente** — cada papel vê o dashboard correcto após autenticação
- **Design system** — paleta de cores, tipografia, espaçamentos e componentes reutilizáveis
- **Backend skeleton** — servidor Express arranca, rotas definidas, lógica em memória

### ⚠️ O que está incompleto

- **Integração frontend ↔ backend** — o frontend usa dados simulados; não existe camada de serviços que chame a API real
- **Base de dados** — o backend usa armazenamento em memória; não há persistência
- **Autenticação real** — não existe JWT nem bcrypt; qualquer email/password dá acesso
- **Push notifications** — não implementadas
- **Modo offline** — não implementado

### 🔧 Correcções recentes aplicadas (PR atual)

- Instalada dependência em falta: `expo-linear-gradient`
- Corrigidos todos os erros TypeScript (navegação, acesso a propriedades do tema, tipos duplicados, variáveis não usadas)
- Migrado ESLint de `.eslintrc.js` (v8) para `eslint.config.js` (v9 flat config)
- Corrigidos hooks `useFadeIn` e `SplashScreen` para padrão `useState` em vez de `useRef().current` com `Animated.Value`

---

## 3. Estrutura do Repositório

```
mobileapp/
├── MobileIPIZ/          # 📱 Aplicação móvel (React Native + Expo)
│   ├── src/             # Código fonte principal
│   ├── assets/          # Ícones, imagens, splash
│   ├── App.tsx          # Entrada da aplicação
│   ├── index.js         # Registo Expo
│   ├── app.json         # Configuração Expo
│   ├── package.json
│   ├── tsconfig.json
│   ├── eslint.config.js # ESLint v9 flat config
│   └── tailwind.config.js
│
├── backend/             # 🖥️ API REST (Node.js + Express)
│   ├── src/             # Código fonte principal
│   ├── .env.example     # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
│
├── IMG ERRORS/          # Capturas de ecrã de erros históricos
├── IMG Tendences/       # Referências visuais / wireframes
├── errors.txt           # Log de erros históricos do Metro bundler
└── README.md            # ← Este ficheiro
```

---

## 4. Stack Tecnológico

### Frontend

| Tecnologia | Versão | Função |
|---|---|---|
| React Native | 0.81.5 | Framework mobile (iOS + Android) |
| Expo | ~54.0.33 | Toolchain e runtime |
| TypeScript | ^5.9.3 | Tipagem estática |
| React Navigation | 7.x | Navegação entre ecrãs |
| NativeWind | ^4.2.1 | Tailwind CSS para React Native |
| Tailwind CSS | ^3.4.19 | Utilitários de estilo |
| expo-linear-gradient | ^55.0.9 | Gradientes visuais |
| react-native-reanimated | ~4.1.1 | Animações performativas |
| react-native-gesture-handler | ^2.30.0 | Gestos touch |
| react-native-safe-area-context | ~5.6.0 | Áreas seguras iOS/Android |

### Backend

| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | 18+ | Runtime JavaScript |
| TypeScript | ^5.2.2 | Tipagem estática |
| Express.js | ^4.18.2 | Framework HTTP |
| Helmet | ^6.0.1 | Headers de segurança |
| CORS | ^2.8.5 | Cross-Origin Resource Sharing |
| ts-node-dev | ^2.0.0 | Dev server com hot-reload |

---

## 5. Frontend — MobileIPIZ

### 5.1 Instalação e Arranque

```bash
cd MobileIPIZ

# Instalar dependências (recomendado: yarn)
yarn install
# ou: npm install --legacy-peer-deps

# Iniciar servidor de desenvolvimento Expo
yarn start
# ou: npm start

# Abrir no Android (emulador ou dispositivo físico com Expo Go)
yarn android

# Abrir no iOS
yarn ios

# Abrir na web
yarn web
```

> **Pré-requisitos:** Node.js 18+, Expo CLI, aplicação Expo Go instalada no telemóvel  
> **Nota:** No Windows, pode ser necessário aumentar o heap do Node se ocorrer `heap out of memory`. Adicionar `NODE_OPTIONS=--max-old-space-size=4096` antes do comando.

### 5.2 Estrutura de Directórios

```
MobileIPIZ/src/
├── navigation/
│   └── AppNavigator.tsx        # Toda a navegação RBAC da app
│
├── contexts/
│   ├── AuthContext.tsx          # Estado de autenticação global
│   └── ThemeContext.tsx         # Tema (light/dark) — simplificado
│
├── features/                   # Módulos funcionais por papel
│   ├── auth/
│   │   ├── LoginScreen.tsx       # Ecrã de login (288 linhas)
│   │   ├── ProfessionalLoginScreen.tsx
│   │   ├── ProfileScreen.tsx     # Perfil do utilizador (352 linhas)
│   │   └── EditProfileScreen.tsx # Edição de perfil (181 linhas)
│   │
│   ├── student/
│   │   ├── StudentDashboard.tsx  # Dashboard estudante (563 linhas)
│   │   ├── ProfessionalDashboard.tsx (228 linhas)
│   │   ├── AcademicScheduleScreen.tsx (73 linhas)
│   │   ├── AnnouncementsScreen.tsx (114 linhas)
│   │   ├── GradesScreen.tsx      # Notas académicas (351 linhas)
│   │   └── SettingsScreen.tsx    # Configurações (233 linhas)
│   │
│   ├── teacher/
│   │   └── TeacherDashboard.tsx  # Dashboard professor (432 linhas)
│   │
│   ├── admin/
│   │   └── AdminDashboard.tsx    # Dashboard administração (414 linhas)
│   │
│   ├── company/
│   │   └── CompanyDashboard.tsx  # Dashboard empresa (283 linhas)
│   │
│   ├── alumni/
│   │   ├── AlumniDashboard.tsx   # Dashboard alumni (337 linhas)
│   │   ├── AlumniProfileScreen.tsx (135 linhas)
│   │   ├── EditAlumniProfileScreen.tsx (95 linhas)
│   │   ├── CertificateScreen.tsx (110 linhas)
│   │   └── MentorshipScreen.tsx  (76 linhas)
│   │
│   └── jobs/
│       ├── JobListScreen.tsx     # Lista de vagas (694 linhas — maior ficheiro)
│       ├── JobDetailScreen.tsx   # Detalhe de vaga (117 linhas)
│       └── PostJobScreen.tsx     # Publicar vaga (116 linhas)
│
├── screens/
│   ├── SplashScreen.tsx          # Splash animado com redirecionamento
│   ├── FeedScreen.tsx            # Feed de notificações
│   └── examples/
│       └── LoginScreenExample.tsx
│
├── components/                   # Biblioteca de componentes reutilizáveis
│   ├── base/                     # Primitivos (Button, Input, Text, Box)
│   ├── atoms/                    # Elementos atómicos (Icon, Badge, Avatar)
│   ├── molecules/                # Compostos (Card, SearchBar, PostCard, …)
│   ├── organisms/                # Complexos (DashboardCard, ProfessionalHeader, …)
│   ├── navigation/               # ProfessionalNavBar
│   └── ui/                       # Variantes alternativas de Button/Input
│
├── hooks/
│   ├── useTheme.tsx              # Hook do sistema de temas avançado
│   ├── useFadeIn.ts              # Animação de entrada com Animated API
│   └── useStyles.ts              # Utilitário de estilos
│
├── theme/
│   ├── colors.ts                 # Paleta de cores completa
│   ├── spacing.ts                # Espaçamentos e bordas
│   ├── typography.ts             # Tipografia
│   ├── advancedTheme.ts          # Configuração completa light/dark
│   └── index.ts                  # Exportações centralizadas
│
├── types/
│   ├── user.types.ts             # User, AlumniProfile, AuthState, enums
│   ├── job.types.ts              # Job, JobApplication, enums
│   ├── navigation.types.ts       # Tipos de navegação
│   ├── components.types.ts       # Props de componentes
│   ├── theme.types.ts            # Theme interface
│   └── nativewind.d.ts           # Declarações NativeWind
│
└── utils/                        # Funções utilitárias
```

### 5.3 Navegação e Fluxo de Ecrãs

O fluxo de navegação é gerido em `AppNavigator.tsx` e segue este modelo:

```
App.tsx
└── AppNavigator (NavigationContainer)
    └── RootStack
        ├── Splash          → Detecta auth e redireciona
        ├── Login           → Formulário de autenticação
        └── MainTab (Bottom Tabs)
            ├── Home (HomeStack)
            │   ├── [StudentDashboard | TeacherDashboard |
            │   │    AdminDashboard | AlumniDashboard]  ← conforme papel
            │   ├── AcademicSchedule
            │   ├── Announcements
            │   ├── Grades
            │   └── Settings
            │
            ├── Cursos (JobsStack)
            │   ├── JobList
            │   ├── JobDetail
            │   └── PostJob
            │
            ├── Rede (AlumniStack)
            │   ├── AlumniDashboard
            │   ├── AlumniProfile
            │   ├── Certificate
            │   ├── EditAlumniProfile
            │   └── Mentorship
            │
            └── Perfil
                └── ProfileScreen (+ EditProfileScreen via goBack)
```

O ecrã inicial é o `SplashScreen`, que após 3 segundos redireciona para `Login` (se não autenticado) ou `MainTab` (se já autenticado).

### 5.4 Sistema de Autenticação (Mock)

A autenticação é **totalmente simulada** em `AuthContext.tsx`. Não existe ligação ao backend nem validação de credenciais — qualquer email/password autentica o utilizador. O papel (role) é inferido a partir do email:

| Padrão no email | Papel atribuído |
|---|---|
| contém `professor` | `TEACHER` |
| contém `admin` | `ADMIN` |
| contém `alumni` | `ALUMNI` |
| contém `empresa` | `COMPANY` |
| qualquer outro | `STUDENT` |

**Exemplos de login:**
```
professor@ipiz.ao    → Dashboard do Professor
admin@ipiz.ao        → Dashboard de Administração
alumni@ipiz.ao       → Dashboard de Alumni
empresa@sonangol.ao  → Dashboard de Empresa
joao@ipiz.ao         → Dashboard de Estudante (padrão)
```

O token gerado é aleatório (`Math.random`) — não é um JWT real.

### 5.5 Módulos por Perfil de Utilizador

#### 📚 Estudante (`StudentDashboard`)
- Cabeçalho institucional com nome do utilizador
- Indicadores académicos: progresso do ano, notas médias, presenças
- Lista de disciplinas matriculadas
- Oportunidades de estágio em destaque
- Acesso a: Horário Académico, Anúncios, Notas, Definições

#### 👨‍🏫 Professor (`TeacherDashboard`)
- Gestão de turmas com lista de alunos
- Avaliações pendentes e controlo de presenças
- Acompanhamento de estagiários
- Métricas de desempenho da turma

#### 🔐 Administração (`AdminDashboard`)
- Indicadores institucionais em tempo real (dados mock):
  - Total de alunos matriculados
  - Taxa de empregabilidade de alumni
  - Parcerias empresariais activas
  - Certificados emitidos
- Gestão de utilizadores, relatórios estratégicos

#### 🏢 Empresa (`CompanyDashboard`)
- Publicação e gestão de vagas de emprego/estágio
- Lista de candidaturas recebidas
- Avaliação de estagiários
- Acesso a perfis de alumni disponíveis

#### 🎓 Alumni (`AlumniDashboard`)
- Certificado digital com código QR (placeholder)
- Programa de mentoria: encontrar mentor ou ser mentor
- Rede de ex-alunos: conexões e novos membros
- Acções rápidas: publicar vaga, actualizar perfil
- Ecrãs adicionais: perfil detalhado, edição de perfil, certificados, mentoria

#### 💼 Sistema de Vagas (`JobListScreen`)
- Listagem de vagas com pesquisa e filtros por tipo
- Tipos: FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT
- Detalhe de vaga com requisitos, competências, responsabilidades
- Formulário de publicação de vaga (empresas/alumni)

### 5.6 Biblioteca de Componentes

Organizada segundo princípios de **Atomic Design**:

#### Base (Primitivos)
| Componente | Descrição |
|---|---|
| `Button` | Botão com variantes: `primary`, `secondary`, `outline`, `ghost`, `success`, `error`, `gradient` |
| `Input` | Campo de texto com suporte a ícones, erro, label |
| `Text` | Texto com variantes: `h1`–`h3`, `body`, `bodySmall`, `caption`; aliases: `H1`, `H2`, `H3`, `H4`, `Body`, `Caption`, `Label` |
| `Box` | Container base com props de layout (padding, margin, bg, rounded) |

#### Atoms
| Componente | Descrição |
|---|---|
| `Icon` | Ícone com nome e tamanho tipados |
| `Badge` | Etiqueta colorida (status, papel) |
| `Avatar` | Avatar circular com inicial ou imagem |

#### Molecules
| Componente | Descrição |
|---|---|
| `Card` | Cartão base com sombra |
| `GradientCard` | Cartão com gradiente azul → teal (usa `expo-linear-gradient`) |
| `StatCard` | Cartão de estatísticas com valor e tendência |
| `SearchBar` | Barra de pesquisa com debounce |
| `PostCard` | Cartão de post para o feed |
| `NotificationCard` | Cartão de notificação |
| `ListItem` | Item de lista com ícone e acção |
| `SectionHeader` | Cabeçalho de secção com título e subtítulo |

#### Organisms
| Componente | Descrição |
|---|---|
| `DashboardCard` | Cartão de dashboard com valor, tendência e ícone |
| `ProfessionalHeader` | Cabeçalho com gradiente e branding |
| `ProfessionalScreen` | Wrapper de ecrã com fundo gradiente |

### 5.7 Sistema de Temas e Design System

#### Paleta de Cores Principal

| Cor | Hex | Uso |
|---|---|---|
| Primary 500 | `#0EA5E9` | Azul principal (elementos interactivos) |
| Primary 900 | `#0C2D6B` | Azul escuro (cabeçalhos, gradiente) |
| Teal 500 | `#14B8A6` | Verde-azulado (navegação activa, gradiente) |
| Teal 600 | `#0D9488` | Tab activa |
| Accent 500 | `#F97316` | Laranja (CTAs secundários) |
| Neutral 900 | `#0F172A` | Texto principal |
| Neutral 500 | `#64748B` | Texto secundário |
| Background | `#F8FAFC` | Fundo principal |
| White | `#FFFFFF` | Superfícies de cartões |

#### Gradiente Institucional
```
Dark Blue #1E3A8A → Teal #0D7377
```
Usado em cabeçalhos de dashboards e componentes de destaque.

#### Configuração de Tema
O sistema suporta temas `light` e `dark` via `ThemeProvider` em `App.tsx`. A detecção automática do tema do sistema está implementada em `useTheme.tsx`. A maioria dos ecrãs usa `StyleSheet.create` com cores fixas (sem binding ao tema dinâmico).

### 5.8 Tipos TypeScript

#### Utilizador e Autenticação
```typescript
enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN   = 'admin',
  ALUMNI  = 'alumni',
  COMPANY = 'company',
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

#### Perfil Alumni
```typescript
enum AcademicLevel { NONE, TECHNICAL_SPECIALIZATION, BACHELOR, POSTGRADUATE, MASTER, PHD }
enum EmploymentStatus { EMPLOYED, SELF_EMPLOYED, UNEMPLOYED, STUDYING, INTERNSHIP }

interface AlumniProfile {
  id: string;
  userId: string;
  graduationYear: number;
  courseCompleted: string;
  currentAcademicLevel: AcademicLevel;
  employmentStatus: EmploymentStatus;
  companyName?: string;
  jobTitle?: string;
  industrySector?: string;
  monthlyIncomeRange?: string;
  country: string;
  professionalSkills: string[];
  availableForMentorship: boolean;
  willingToRecruitStudents: boolean;
  lastUpdatedAt: string;
}
```

#### Vagas
```typescript
enum JobType   { FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT }
enum JobStatus { OPEN, CLOSED, FILLED }

interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  type: JobType;
  status: JobStatus;
  location: string;
  salaryRange?: string;
  postedAt: string;
  deadline?: string;
}

interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  coverLetter?: string;
}
```

### 5.9 Scripts Disponíveis

```bash
# Desenvolvimento
yarn start          # Inicia Expo dev server (com cache limpa)
yarn android        # Abre no Android
yarn ios            # Abre no iOS
yarn web            # Abre no navegador

# Qualidade de código
yarn lint           # Executa ESLint (flat config v9)
yarn lint:fix       # Corrige problemas de lint automaticamente
yarn format         # Formata código com Prettier
yarn type-check     # Verificação de tipos TypeScript (sem emissão)
```

---

## 6. Backend — API REST

### 6.1 Instalação e Arranque

```bash
cd backend

# Instalar dependências
npm install

# Criar ficheiro de variáveis de ambiente
cp .env.example .env
# Editar .env com as suas configurações

# Modo desenvolvimento (com hot-reload)
npm run dev

# Compilar TypeScript para JavaScript
npm run build

# Modo produção
npm start
```

O servidor arranca na porta `3000` por defeito. Health check disponível em `GET /health`.

### 6.2 Estrutura de Directórios

```
backend/src/
├── config/
│   └── environment.ts      # Leitura de variáveis de ambiente
│
├── controllers/            # Handlers HTTP (req → service → res)
│   ├── UserController.ts
│   ├── JobController.ts
│   └── CompanyController.ts
│
├── models/                 # Interfaces e tipos TypeScript dos dados
│   ├── User.ts
│   ├── Job.ts
│   └── Company.ts
│
├── routes/                 # Definição das rotas Express
│   ├── userRoutes.ts
│   ├── jobRoutes.ts
│   └── companyRoutes.ts
│
├── services/               # Lógica de negócio + armazenamento em memória
│   ├── UserService.ts
│   ├── JobService.ts
│   └── CompanyService.ts
│
├── middlewares/
│   ├── errorHandler.ts     # Tratamento centralizado de erros
│   └── notFoundHandler.ts  # 404 handler
│
└── index.ts                # Entrada do servidor Express
```

### 6.3 Endpoints da API

#### Health
```
GET  /health                          → { status: 'OK', timestamp, service }
```

#### Utilizadores — `/api/users`
```
POST   /api/users                     → Criar utilizador
GET    /api/users                     → Listar todos os utilizadores
GET    /api/users/role/:role          → Filtrar por papel (student, teacher, …)
GET    /api/users/:id                 → Obter utilizador por ID
PUT    /api/users/:id                 → Actualizar utilizador
DELETE /api/users/:id                 → Eliminar utilizador
```

#### Vagas — `/api/jobs`
```
POST   /api/jobs                      → Criar vaga
GET    /api/jobs                      → Listar todas as vagas
GET    /api/jobs/open                 → Listar vagas abertas
GET    /api/jobs/search?q=query       → Pesquisar vagas por texto
GET    /api/jobs/company/:companyId   → Vagas de uma empresa
GET    /api/jobs/type/:type           → Filtrar por tipo (FULL_TIME, INTERNSHIP, …)
GET    /api/jobs/:id                  → Obter vaga por ID
PUT    /api/jobs/:id                  → Actualizar vaga
DELETE /api/jobs/:id                  → Eliminar vaga
```

#### Empresas — `/api/companies`
```
POST   /api/companies                 → Criar empresa
GET    /api/companies                 → Listar todas as empresas
GET    /api/companies/search?q=query  → Pesquisar empresas
GET    /api/companies/industry/:ind   → Filtrar por sector industrial
GET    /api/companies/:id             → Obter empresa por ID
PUT    /api/companies/:id             → Actualizar empresa
DELETE /api/companies/:id             → Eliminar empresa
```

> **Nota:** Todos os dados são armazenados em memória (arrays JavaScript). Ao reiniciar o servidor, todos os dados são perdidos. Não existe ainda integração com base de dados.

### 6.4 Modelos de Dados

O backend define os seus próprios tipos em `src/models/`. São semelhantes mas independentes dos tipos do frontend. A sincronização entre os dois é uma tarefa pendente.

### 6.5 Variáveis de Ambiente

Criar ficheiro `.env` na pasta `backend/` baseado em `.env.example`:

```env
PORT=3000
NODE_ENV=development

# URL aceite pelo CORS (endereço do Metro Bundler do Expo)
CORS_ORIGIN=http://localhost:8081

# Chave secreta para JWT (quando implementado)
JWT_SECRET=chave-super-secreta-mudar-em-producao

# URL da base de dados (quando implementada)
DATABASE_URL=postgresql://utilizador:password@localhost:5432/ipiz_db
```

---

## 7. Perfis de Utilizador (RBAC)

O sistema implementa controlo de acesso baseado em papéis (**Role-Based Access Control**) em dois níveis:

1. **Nível de navegação** (`AppNavigator.tsx`) — o dashboard inicial mostrado após login depende do papel
2. **Nível de autenticação** (`AuthContext.tsx`) — o papel é inferido do email no mock actual

| Papel | Valor | Dashboard | Acesso a Vagas | Acesso a Alumni |
|---|---|---|---|---|
| Estudante | `student` | `StudentDashboard` | Ver e candidatar | Ver rede |
| Professor | `teacher` | `TeacherDashboard` | Ver | Limitado |
| Administração | `admin` | `AdminDashboard` | Total | Total |
| Alumni | `alumni` | `AlumniDashboard` | Publicar e ver | Total |
| Empresa | `company` | `CompanyDashboard` | Publicar e gerir | Ver perfis |

---

## 8. O que Está Implementado

### Frontend (≈90% da UI)

- [x] Ecrã de splash animado com redirecionamento automático
- [x] Ecrã de login com validação de formulário
- [x] Sistema de autenticação com Context API e `useReducer`
- [x] Navegação RBAC completa (bottom tabs + stacks aninhados)
- [x] **StudentDashboard** — indicadores, disciplinas, estágios, quick actions
- [x] **TeacherDashboard** — turmas, avaliações, acompanhamento
- [x] **AdminDashboard** — métricas institucionais, utilizadores
- [x] **AlumniDashboard** — certificado, mentoria, rede
- [x] **CompanyDashboard** — vagas, candidaturas
- [x] **JobListScreen** — pesquisa, filtros, lista completa de vagas
- [x] **JobDetailScreen** — detalhe com requisitos e candidatura
- [x] **PostJobScreen** — formulário de publicação de vaga
- [x] **AlumniProfileScreen** — perfil detalhado de alumni
- [x] **EditAlumniProfileScreen** — edição do perfil alumni
- [x] **CertificateScreen** — visualização de certificado digital
- [x] **MentorshipScreen** — programa de mentoria
- [x] **ProfileScreen** — perfil do utilizador autenticado
- [x] **EditProfileScreen** — edição de dados pessoais
- [x] **AcademicScheduleScreen** — horário académico
- [x] **AnnouncementsScreen** — anúncios institucionais
- [x] **GradesScreen** — notas por disciplina
- [x] **SettingsScreen** — configurações da aplicação
- [x] **FeedScreen** — feed de notificações da comunidade
- [x] Biblioteca de componentes (base, atoms, molecules, organisms)
- [x] Design system com paleta de cores e tipografia
- [x] Suporte a NativeWind (Tailwind CSS)
- [x] Configuração TypeScript estrita (sem erros)
- [x] ESLint v9 (flat config) — sem erros

### Backend (≈30% — skeleton funcional)

- [x] Servidor Express com helmet e CORS
- [x] Health check endpoint (`GET /health`)
- [x] Rotas definidas para Users, Jobs e Companies (28 endpoints)
- [x] Controladores com lógica CRUD básica
- [x] Serviços com armazenamento em memória
- [x] Tratamento centralizado de erros
- [x] Configuração de variáveis de ambiente

---

## 9. O que Está em Falta

### Crítico (bloqueia produção)

- [ ] **Camada de serviços API no frontend** — criar `src/services/api.ts` com Axios/fetch para ligar ao backend
- [ ] **Base de dados real** — integrar PostgreSQL com Prisma ORM no backend
- [ ] **Autenticação JWT real** — bcrypt para passwords, tokens com expiração, refresh token
- [ ] **Persistência de sessão** — guardar token no dispositivo (`expo-secure-store`)
- [ ] **Validação de inputs** no backend (ex.: `zod`, `joi`)

### Importante (funcionalidades core)

- [ ] **Candidatura a vagas** — formulário e persistência no backend
- [ ] **Upload de avatar/documentos** — integração com armazenamento (ex.: Cloudinary, S3)
- [ ] **Sistema de notificações push** — Expo Notifications + FCM
- [ ] **Páginas de registo** — formulário por papel com validação completa
- [ ] **Dashboard de Admin** com dados reais da base de dados

### Qualidade e Infraestrutura

- [ ] **Testes unitários** — Jest + React Native Testing Library
- [ ] **Testes E2E** — Detox ou Maestro
- [ ] **Pipeline CI/CD** — GitHub Actions com build automático
- [ ] **Modo offline** — React Query + cache local
- [ ] **Tema escuro** completo — binding dinâmico nos ecrãs com StyleSheet

---

## 10. Problemas Conhecidos

| Problema | Impacto | Estado |
|---|---|---|
| Autenticação é simulada (mock) | Qualquer credencial funciona | ⚠️ Documentado |
| Backend sem base de dados | Dados perdidos ao reiniciar | ⚠️ Documentado |
| `CompanyDashboard` não aparece na tab | Papel `company` não tem tab própria; mostra StudentDashboard | 🐛 A corrigir |
| `ProfessionalLoginScreen` não é usada | Ficheiro existe mas não está no navigator | 🔍 A investigar |
| Aviso ESLint `react-hooks/exhaustive-deps` | 1 warning no `useTheme.tsx` | ⚠️ Menor |
| Avisos de peer dependencies (yarn) | `@babel/core` e `babel-preset-expo` — não bloqueiam | ⚠️ Menor |

---

## 11. Roadmap

### Fase 1 — ✅ Concluída (UI)
- Estrutura modular e navegação RBAC
- Todos os dashboards com dados mock
- Biblioteca de componentes profissional
- Design system completo
- Compilação TypeScript sem erros
- ESLint v9 configurado e passando

### Fase 2 — 🚧 Em curso (Backend Integration)
- [ ] API service layer no frontend
- [ ] Autenticação JWT real (bcrypt + tokens)
- [ ] PostgreSQL + Prisma ORM
- [ ] Integração completa login/logout com backend
- [ ] Gestão de vagas com persistência

### Fase 3 — Features Avançadas
- [ ] Sistema de candidaturas a vagas
- [ ] Push notifications (Expo + FCM)
- [ ] Upload de ficheiros (avatar, CV, certificados)
- [ ] Modo offline (cache + sync queue)
- [ ] Certificados digitais com QR code verificável

### Fase 4 — Qualidade e Escala
- [ ] Testes unitários e E2E
- [ ] CI/CD pipeline
- [ ] Analytics institucional em tempo real
- [ ] Multi-instituição
- [ ] Portal web administrativo

---

## 12. Contribuição

### Convenções de Código

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Branching:** `feature/nome`, `fix/nome`, `docs/nome`
- **TypeScript:** Tipagem estrita — sem `any` explícito
- **Componentes:** Functional components com hooks
- **Estilo:** Prettier + ESLint — executar `yarn lint:fix` antes de cada commit

### Fluxo de Trabalho

```bash
# 1. Criar branch
git checkout -b feature/minha-funcionalidade

# 2. Desenvolver e verificar qualidade
cd MobileIPIZ
yarn type-check   # deve passar sem erros
yarn lint         # deve passar sem erros

# 3. Commit e push
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feature/minha-funcionalidade

# 4. Abrir Pull Request no GitHub
```

---

## Licença

© 2026 Instituto Politécnico Industrial do Zango (IPIZ)  
Todos os direitos reservados.

---

*Desenvolvido com foco na empregabilidade e transformação digital da educação técnica em Angola.*  
*Localização: Luanda, Angola · Fundação: 17 de Dezembro*
