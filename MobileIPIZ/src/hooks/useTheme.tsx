/**
 * Advanced Theme Hook for IPIZ Mobile App
 * Professional theme management with Tailwind CSS integration
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, ThemeConfig, ThemeName, getTheme, useComponentTheme } from '@theme/advancedTheme';

// ============================================================================
// THEME CONTEXT
// ============================================================================

interface ThemeContextType {
  theme: ThemeConfig;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
  isDark: boolean;
  componentTheme: ReturnType<typeof useComponentTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// THEME PROVIDER
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ThemeName>(
    () => (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') as ThemeName,
  );

  // Detect system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      const newSystemTheme = (colorScheme === 'dark' ? 'dark' : 'light') as ThemeName;
      setSystemTheme(newSystemTheme);

      // Auto-switch to system theme if current theme is 'auto'
      if ((themeName as string) === 'auto') {
        setThemeName(newSystemTheme);
      }
    });

    return () => listener.remove();
  }, [themeName]);

  // Get current theme configuration
  const theme = React.useMemo(() => {
    if ((themeName as string) === 'auto') {
      return getTheme(systemTheme);
    }
    return getTheme(themeName);
  }, [themeName, systemTheme]);

  // Component theme utilities
  const componentTheme = useComponentTheme();

  // Theme management functions
  const setTheme = React.useCallback((name: ThemeName) => {
    setThemeName(name);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const current = (themeName as string) === 'auto' ? systemTheme : themeName;
    const next = current === 'light' ? 'dark' : 'light';
    setThemeName(next);
  }, [themeName, systemTheme]);

  const isDark = theme.mode === 'dark';

  const value: ThemeContextType = {
    theme,
    themeName,
    setTheme,
    toggleTheme,
    isDark,
    componentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// THEME HOOKS
// ============================================================================

/**
 * Main theme hook - provides access to the current theme and utilities
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook for theme colors only
 */
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

/**
 * Hook for theme typography
 */
export const useThemeTypography = () => {
  const { theme } = useTheme();
  return theme.typography;
};

/**
 * Hook for theme spacing
 */
export const useThemeSpacing = () => {
  const { theme } = useTheme();
  return theme.spacing;
};

/**
 * Hook for component-specific theme utilities
 */
export const useComponentStyles = () => {
  const { componentTheme } = useTheme();
  return componentTheme;
};

/**
 * Hook for responsive design utilities
 */
export const useResponsive = () => {
  // This would typically use Dimensions API for responsive utilities
  // For now, returning basic responsive helpers
  return {
    isSmallScreen: false, // Would check screen width
    isMediumScreen: true, // Default assumption
    isLargeScreen: false, // Would check screen width
  };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get theme-aware styles for components
 */
export const getThemeStyles = (_theme: ThemeConfig) => ({
  // Button variants
  button: {
    primary: `bg-primary-500 text-white px-4 py-2 rounded-lg font-medium`,
    secondary: `bg-secondary-500 text-white px-4 py-2 rounded-lg font-medium`,
    outline: `border-2 border-primary-500 text-primary-500 px-4 py-2 rounded-lg font-medium`,
    ghost: `text-primary-500 px-4 py-2 rounded-lg font-medium`,
  },

  // Input variants
  input: {
    default: `px-3 py-2 border border-border-light rounded-lg bg-surface-primary text-text-primary`,
    error: `px-3 py-2 border-2 border-error-500 rounded-lg bg-surface-primary text-text-primary`,
    disabled: `px-3 py-2 border border-border-light rounded-lg bg-surface-tertiary text-text-disabled cursor-not-allowed`,
  },

  // Card variants
  card: {
    default: `bg-surface-primary border border-border-light rounded-xl p-4 shadow-sm`,
    elevated: `bg-surface-primary border border-border-light rounded-xl p-4 shadow-lg`,
  },

  // Text variants
  text: {
    h1: `text-3xl font-bold text-text-primary`,
    h2: `text-2xl font-semibold text-text-primary`,
    h3: `text-xl font-semibold text-text-primary`,
    h4: `text-lg font-medium text-text-primary`,
    body: `text-base text-text-primary`,
    caption: `text-sm text-text-secondary`,
    label: `text-sm font-medium text-text-primary`,
  },
});

/**
 * Create theme-aware style function
 */
export const createThemedStyles = (styleFactory: (theme: ThemeConfig) => any) => {
  return () => {
    const { theme } = useTheme();
    return styleFactory(theme);
  };
};

// ============================================================================
// LEGACY COMPATIBILITY
// ============================================================================

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useTheme instead
 */
export const useAppTheme = () => {
  const { theme, componentTheme } = useTheme();
  return {
    theme,
    colors: theme.colors,
    componentTheme,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export type { ThemeConfig, ThemeName, ThemeContextType };
export { lightTheme, darkTheme, getTheme };