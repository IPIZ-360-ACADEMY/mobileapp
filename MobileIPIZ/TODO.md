# Correções para Rodar a Aplicação

## Telas Faltantes
- [x] Criar AlumniProfileScreen.tsx básico
- [x] Criar EditAlumniProfileScreen.tsx básico
- [x] Criar CertificateScreen.tsx básico
- [x] Criar MentorshipScreen.tsx básico

## Correções de Estilos e Tipos
- [x] Corrigir estilos em AlumniDashboard.tsx
- [x] Actualizar theme/index.ts com cores faltantes
- [x] Corrigir tipos de navegação (JobsStackParamList, EditProfileScreen)
- [x] Remover parâmetros não utilizados em AuthContext.tsx
- [x] Remover imports não utilizados em múltiplos ficheiros
- [x] Corrigir acesso a propriedades do tema (theme.colors.text.*, theme.colors.background.*)
- [x] Adicionar exports em falta no componente Text (H1, H2, H3, H4, Body, Caption, Label)
- [x] Exportar tipo Post de PostCard e re-exportar via components/index.ts
- [x] Adicionar variante 'gradient' ao tipo ButtonVariant

## Dependências
- [x] Instalar expo-linear-gradient (em falta, usado por GradientCard, ProfessionalHeader)

## Configuração
- [x] Migrar ESLint para eslint.config.js (v9 flat config)
- [x] Actualizar scripts de lint no package.json

## Hooks React
- [x] Corrigir useFadeIn.ts — usar useState em vez de useRef().current com Animated.Value
- [x] Corrigir SplashScreen.tsx — mesmo padrão
- [x] Corrigir useTheme.tsx — setState síncrono dentro de useEffect → mover para useState

## Estado Actual
- [x] Executar type-check sem erros ✅
- [x] Executar lint sem erros ✅ (0 erros, 1 aviso menor)
- [ ] Testar build/start da aplicação (requer dispositivo ou emulador)

## Próximos Passos (ver README.md raiz)
- [ ] Criar camada de serviços API (src/services/api.ts)
- [ ] Implementar autenticação JWT real
- [ ] Integrar base de dados PostgreSQL + Prisma
- [ ] Adicionar testes unitários

