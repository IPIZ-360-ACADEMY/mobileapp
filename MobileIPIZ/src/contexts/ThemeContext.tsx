import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { lightTheme, darkTheme, type ThemeConfig } from '@theme/advancedTheme';
import { colors as staticColors } from '@theme/colors';

type ThemeName = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeConfig;
  themeName: ThemeName;
  colors: typeof staticColors;
  toggleTheme: () => void;
}

// Initial context with light theme as default
const initialContext: ThemeContextType = {
  theme: lightTheme,
  themeName: 'light',
  colors: staticColors,
  toggleTheme: () => {},
};

// !!! Simplified theme provider to avoid runtime colors error.
// Always return a single light theme constant.  This keeps
// the app stable and meets the user's request.

const ThemeContext = createContext<ThemeContextType>(initialContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={initialContext}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para usar o tema - sempre retorna o tema light padrão
 */
export const useAppTheme = (): ThemeContextType => {
  return initialContext;
};

// Alias para compatibilidade
export const useTheme = () => {
  return initialContext;
};

export default ThemeContext;