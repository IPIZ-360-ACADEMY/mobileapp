/**
 * IPIZ Mobile App - Design System & Professional Styling Guide
 * Version 2.0 - Refactored for Professional UI
 * 
 * Color Palette (Blue → Teal Gradient):
 * Primary: #1E3A8A (Dark Blue) → #0D7377 (Dark Teal)
 * Secondary: #0EA5E9 (Sky) → #14B8A6 (Teal)
 * 
 * Key Design Principles:
 * - Modern gradient backgrounds (Blue to Teal)
 * - Clean, spacious layout
 * - Professional card-based design
 * - Consistent shadows and borders
 * - Responsive typography
 */

// ============================================
// COMPONENT USAGE GUIDE
// ============================================

/*
1. PROFESSIONAL HEADER
   Usage: Top navigation with gradient background
   
   <ProfessionalHeader
     title="Bem-vindo"
     subtitle="João Silva"
     variant="primary"
     rightIcon={<MenuIcon />}
   />
   
   Variants: 'primary' | 'secondary' | 'light'
*/

/*
2. GRADIENT CARD
   Usage: Accent cards with blue-teal gradient
   
   <GradientCard variant="primary">
     <Text className="text-white font-bold">Title</Text>
     <Text className="text-sky-100">Subtitle</Text>
   </GradientCard>
   
   Variants: 'primary' (dark) | 'secondary' (medium) | 'light'
*/

/*
3. STAT CARD
   Usage: Display statistics and metrics
   
   <StatCard
     title="Média Geral"
     value="15.8"
     variant="primary"
   />
   
   <StatCard
     title="Progresso"
     value="85%"
     showProgress
     progressValue={85}
     variant="success"
   />
   
   Variants: 'primary' | 'secondary' | 'success' | 'warning'
*/

/*
4. PROFESSIONAL BUTTON
   Usage: Call-to-action buttons
   
   <Button variant="primary" size="lg" fullWidth>
     Entrar
   </Button>
   
   <Button variant="accent" size="md">
     Candidatar
   </Button>
   
   Variants: 
   - 'primary' (Blue) - Main actions
   - 'secondary' (Teal) - Secondary actions
   - 'tertiary' (Light) - Subtle actions
   - 'accent' (Orange) - Highlight CTAs
   - 'outline' (Border only) - Alternative
   - 'ghost' (Transparent) - Minimal
   - 'success', 'warning', 'error' - Status
*/

/*
5. PROFESSIONAL INPUT
   Usage: Form inputs with validation
   
   <Input
     label="Email"
     placeholder="seu@email.com"
     variant="outlined"
     required
     icon={<EmailIcon />}
   />
   
   <Input
     label="Senha"
     placeholder="••••••••"
     secureTextEntry
     variant="filled"
     rightIcon={<EyeIcon />}
     onRightIconPress={togglePassword}
   />
   
   Variants: 'default' | 'outlined' | 'filled'
   Sizes: 'sm' | 'md' | 'lg'
*/

/*
6. CARD
   Usage: Container for content grouping
   
   <Card variant="elevated">
     <Text className="font-bold">Card Title</Text>
     <Text className="text-gray-600">Card content</Text>
   </Card>
   
   Variants: 'default' | 'outlined' | 'elevated'
*/

/*
7. PROFESSIONAL SCREEN
   Usage: Screen container with gradient background
   
   <ProfessionalScreen scrollable>
     <Text>Screen content</Text>
   </ProfessionalScreen>
   
   Props:
   - scrollable: Boolean (default: true)
   - gradientColors: String[] (Blue to Teal by default)
   - showGradient: Boolean (default: true)
*/

// ============================================
// COLOR USAGE
// ============================================

/*
  TAILWIND COLOR TOKENS (Updated):
  
  Blues:
  - sky-50 / sky-100 / sky-200 (Light blue)
  - sky-600 / sky-700 (Medium blue) 
  
  Dark Blues:
  - slate-900 / slate-800 (Text)
  - slate-700 / slate-600 (Secondary text)
  - slate-500 / slate-400 (Muted text)
  
  Teals:
  - teal-50 / teal-100 (Light teal)
  - teal-600 / teal-700 (Medium teal)
  
  Accent Colors:
  - emerald-600 (Success)
  - amber-600 (Warning)
  - red-600 (Error)
  - orange-600 (CTA Accent)
  
  Example Text Hierarchy:
  - Primary Text: text-slate-900 font-bold
  - Secondary Text: text-slate-700 font-semibold
  - Tertiary Text: text-slate-500 text-sm
  - Inverse (on gradient): text-white
  - Muted: text-slate-400 text-xs
*/

// ============================================
// SPACING GUIDE
// ============================================

/*
  Standard Spacing (using Tailwind):
  
  Containers:
  - p-4 (16px) - Default card padding
  - p-6 (24px) - Large sections
  - p-3 (12px) - Compact elements
  
  Gaps/Margins:
  - gap-2 (8px) - Tight spacing
  - gap-3 (12px) - Default spacing
  - gap-4 (16px) - Loose spacing
  - gap-6 (24px) - Large spacing
  
  Width/Height:
  - h-12 (48px) - Standard button height
  - h-14 (56px) - Large input height
  - w-full (100%) - Full width
*/

// ============================================
// SHADOW & ELEVATION
// ============================================

/*
  Shadow Hierarchy:
  
  - shadow-sm: Subtle (default cards)
  - shadow-md: Medium (elevated cards)
  - shadow-lg: Large (modals, headers)
  
  Usage:
  <Card className="shadow-md" />
  <GradientCard shadow={true} />
*/

// ============================================
// RESPONSIVE DESIGN
// ============================================

/*
  Use Tailwind breakpoints:
  
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  
  Example:
  className="p-4 md:p-6 lg:p-8"
  className="text-sm md:text-base lg:text-lg"
*/

// ============================================
// THEME SYSTEM
// ============================================

/*
  The app uses:
  - System: React Native + Tailwind CSS (NativeWind)
  - Theme Context: useTheme() hook for dark mode
  - Color System: Design tokens in src/theme/colors.ts
  
  Import theme values:
  import { colors } from '@theme/colors';
  
  Use in components:
  const { isDark } = useTheme();
*/

export {};
