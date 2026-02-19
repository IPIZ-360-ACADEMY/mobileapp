# Estrutura do Projeto IPIZ Mobile

## Árvore Completa de Diretórios

```
MobileIPIZ/
│
├── assets/
│   ├── icon.png (logo IPIZ)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   └── splash-icon.png
│
├── src/
│   ├── app/
│   │   └── AppNavigator.tsx (RBAC Navigation System)
│   │
│   ├── assets/
│   │   └── logo.png (Logo IPIZ original)
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   └── index.ts
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx (Authentication State Management)
│   │
│   ├── features/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx
│   │   ├── alumni/
│   │   │   └── AlumniDashboard.tsx
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── company/
│   │   │   └── CompanyDashboard.tsx
│   │   ├── jobs/
│   │   │   └── (futuro: JobListScreen, JobDetailScreen, etc.)
│   │   ├── student/
│   │   │   └── StudentDashboard.tsx
│   │   └── teacher/
│   │       └── TeacherDashboard.tsx
│   │
│   ├── hooks/
│   │   └── (custom hooks futuros)
│   │
│   ├── screens/
│   │   ├── FeedScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   └── index.ts
│   │
│   ├── services/
│   │   └── (API services futuros)
│   │
│   ├── store/
│   │   └── (state management adicional futuro)
│   │
│   ├── theme/
│   │   ├── colors.ts (Paleta completa)
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── components.types.ts
│   │   ├── job.types.ts (Job, JobApplication, enums)
│   │   ├── navigation.types.ts
│   │   ├── nativewind.d.ts
│   │   ├── theme.types.ts
│   │   ├── user.types.ts (User, AlumniProfile, enums)
│   │   └── index.ts
│   │
│   └── utils/
│       ├── constants.ts
│       ├── helpers.ts
│       └── index.ts
│
├── .gitignore
├── app.json (Configuração Expo)
├── App.tsx (Entry point com AuthProvider)
├── babel.config.js
├── global.css
├── index.js
├── metro.config.js
├── package.json
├── README.md (Documentação técnica completa)
├── tailwind.config.js
└── tsconfig.json
```

## Fluxo de Navegação

```
App.tsx
  └── AuthProvider
      └── AppNavigator
          ├── Splash Screen
          ├── Login Screen
          └── Role-Based Dashboard
              ├── STUDENT → StudentDashboard
              ├── TEACHER → TeacherDashboard
              ├── ADMIN → AdminDashboard
              ├── COMPANY → CompanyDashboard
              └── ALUMNI → AlumniDashboard
```

## Componentes por Perfil

### STUDENT (Estudante)
- Dashboard com disciplinas
- Oportunidades de estágio
- Candidaturas
- Conexão com mentores

### TEACHER (Professor)
- Gestão de turmas
- Avaliações
- Acompanhamento de estagiários

### ADMIN (Administração)
- KPIs institucionais
- Gestão de usuários
- Relatórios
- Validação de certificados

### COMPANY (Empresa)
- Publicar vagas
- Ver candidaturas
- Avaliar estagiários

### ALUMNI (Ex-Aluno)
- Perfil profissional
- Certificado digital
- Mentoria
- Publicar vagas
- Networking

## Types Principais

### UserRole Enum
```typescript
STUDENT | TEACHER | ADMIN | COMPANY | ALUMNI
```

### AcademicLevel Enum
```typescript
NONE
TECHNICAL_SPECIALIZATION
BACHELOR
POSTGRADUATE
MASTER
PHD
```

### EmploymentStatus Enum
```typescript
EMPLOYED
SELF_EMPLOYED
UNEMPLOYED
STUDYING
INTERNSHIP
```

### JobType Enum
```typescript
FULL_TIME
PART_TIME
INTERNSHIP
CONTRACT
```

### JobStatus Enum
```typescript
OPEN | CLOSED | FILLED
```

## Theme Colors

### Primary (Blue Industrial)
- 700: #1976D2 (principal)
- 800: #1565C0
- 50: #E3F2FD

### Background
- default: #F5F5F7
- paper: #FFFFFF

### Text
- primary: #212121
- secondary: #757575

## Estado da Aplicação

### AuthState
```typescript
{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

## Próximos Passos

1. **Backend Integration**
   - Conectar com API REST
   - Implementar chamadas reais
   - Gerenciar tokens JWT

2. **Features Avançadas**
   - Sistema de mensagens
   - Push notifications
   - Offline-first
   - Analytics

3. **UI/UX**
   - Animações com Reanimated
   - Skeleton loaders
   - Pull-to-refresh
   - Infinite scroll

4. **Segurança**
   - Biometria
   - 2FA
   - Session management

---

**Status**: ✅ Frontend Base Completo e Funcional
**Próxima Fase**: Backend Development
