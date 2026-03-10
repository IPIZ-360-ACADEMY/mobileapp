import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, type AppTheme, type ColorScheme } from '../theme/designSystem';
import { colors as staticColors, type Colors } from '../theme/colors';


/**
 * ThemeContext - Contexto global de tema
 * Fornece o tema completo e permite toggle entre light/dark mode
 */

interface ThemeContextType {
  theme: AppTheme;
  colors: Colors;
  scheme: ColorScheme;
  toggleScheme: () => void;
}

// we can provide a fallback object so that consumers won't crash if context
// is accidentally used outside of a provider.  this mirrors the structure
// we export from `colors.ts` and uses the light theme by default.
const initialContext: ThemeContextType = {
  theme: lightTheme,
  colors: staticColors,
  scheme: 'light',
  toggleScheme: () => {},
};

const ThemeContext = createContext<ThemeContextType | null>(initialContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Detecta o tema do sistema
  const systemScheme = (Appearance.getColorScheme() ?? 'light') as ColorScheme;
  
  const [scheme, setScheme] = useState<ColorScheme>(systemScheme);

  // Sincroniza com mudanças do sistema
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setScheme(colorScheme as ColorScheme);
      }
    });

    return () => listener.remove();
  }, []);

  const theme = (scheme === 'dark' ? darkTheme : lightTheme) as AppTheme;

  // `staticColors` is a single (light‑mode) palette.  to avoid blowing up
  // components that expect `colors.background.default` we create a small
  // wrapper that adjusts a few values when dark mode is active.  this gives
  // us predictable visuals and keeps the rest of the structure intact.
  const colors: Colors = React.useMemo(() => {
    if (scheme === 'dark') {
      // make background darker when dark mode is enabled; you can tweak
      // other fields as well if necessary.
      return {
        ...staticColors,
        background: {
          ...staticColors.background,
          default: staticColors.dark,
          paper: staticColors.dark,
        },
      } as Colors;
    }
    return staticColors;
  }, [scheme]);

  const value: ThemeContextType = {
    theme,
    colors,
    scheme,
    toggleScheme: () => setScheme(s => (s === 'dark' ? 'light' : 'dark')),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para usar o tema
 * @throws Erro se não está dentro de ThemeProvider
 */
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      '❌ useAppTheme deve ser usado dentro de <ThemeProvider>. Verifique App.tsx!',
    );
  }

  return context;
};

// alias used by many of the older screens; it simply forwards to
// `useAppTheme` and keeps the same return type so consumers that only
// destructure `colors` continue to work.
export const useTheme = () => {
  const { theme, colors, scheme, toggleScheme } = useAppTheme();
  return { theme, colors, scheme, toggleScheme };
};

export default ThemeContext;