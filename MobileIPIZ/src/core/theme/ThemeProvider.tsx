import React, { createContext, useContext, useMemo } from 'react';
import { AppTheme, defaultTheme } from './tokens';

type ThemeContextValue = {
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const value = useMemo<ThemeContextValue>(() => ({ theme: defaultTheme }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): AppTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return ctx.theme;
}
