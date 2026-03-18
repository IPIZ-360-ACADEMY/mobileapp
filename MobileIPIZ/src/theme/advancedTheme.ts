/**
 * Advanced Theme System for IPIZ Mobile App
 * Professional Design System with Tailwind CSS Integration
 *
 * This file defines a comprehensive theme system that integrates seamlessly
 * with Tailwind CSS and provides advanced theming capabilities for React Native.
 */


// ============================================================================
// THEME CONFIGURATION
// ============================================================================

export interface ThemeConfig {
  name: string;
  mode: 'light' | 'dark' | 'auto';
  colors: {
    // Brand Colors
    primary: string;
    secondary: string;
    accent: string;

    // Semantic Colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Background Colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      overlay: string;
      blur: string;
    };

    // Surface Colors
    surface: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
      overlay: string;
    };

    // Text Colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
      accent: string;
    };

    // Border Colors
    border: {
      light: string;
      medium: string;
      dark: string;
      focus: string;
      error: string;
    };

    // Shadow Colors
    shadow: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };

  // Typography
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      mono: string;
    };
    fontSize: {
      xs: [string, { lineHeight: string }];
      sm: [string, { lineHeight: string }];
      base: [string, { lineHeight: string }];
      lg: [string, { lineHeight: string }];
      xl: [string, { lineHeight: string }];
      '2xl': [string, { lineHeight: string }];
      '3xl': [string, { lineHeight: string }];
      '4xl': [string, { lineHeight: string }];
    };
    fontWeight: {
      thin: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };
  };

  // Spacing
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };

  // Border Radius
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
  };

  // Shadows
  shadows: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };

  // Animations
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      linear: string;
      in: string;
      out: string;
      inOut: string;
    };
  };
}

// ============================================================================
// LIGHT THEME
// ============================================================================

export const lightTheme: ThemeConfig = {
  name: 'Light',
  mode: 'light',
  colors: {
    primary: '#0ea5e9',
    secondary: '#64748b',
    accent: '#d946ef',

    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      overlay: 'rgba(0, 0, 0, 0.5)',
      blur: 'rgba(255, 255, 255, 0.8)',
    },

    surface: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.05)',
    },

    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      disabled: '#94a3b8',
      inverse: '#ffffff',
      accent: '#0ea5e9',
    },

    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
      focus: '#0ea5e9',
      error: '#ef4444',
    },

    shadow: {
      xs: 'rgba(0, 0, 0, 0.05)',
      sm: 'rgba(0, 0, 0, 0.1)',
      md: 'rgba(0, 0, 0, 0.15)',
      lg: 'rgba(0, 0, 0, 0.2)',
      xl: 'rgba(0, 0, 0, 0.25)',
      '2xl': 'rgba(0, 0, 0, 0.3)',
    },
  },

  typography: {
    fontFamily: {
      primary: 'System',
      secondary: 'System',
      mono: 'monospace',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
    },
  },
};

// ============================================================================
// DARK THEME
// ============================================================================

export const darkTheme: ThemeConfig = {
  name: 'Dark',
  mode: 'dark',
  colors: {
    primary: '#0ea5e9',
    secondary: '#94a3b8',
    accent: '#d946ef',

    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      overlay: 'rgba(0, 0, 0, 0.7)',
      blur: 'rgba(15, 23, 42, 0.8)',
    },

    surface: {
      primary: '#1e293b',
      secondary: '#334155',
      tertiary: '#475569',
      elevated: '#334155',
      overlay: 'rgba(255, 255, 255, 0.05)',
    },

    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      disabled: '#64748b',
      inverse: '#0f172a',
      accent: '#0ea5e9',
    },

    border: {
      light: '#334155',
      medium: '#475569',
      dark: '#64748b',
      focus: '#0ea5e9',
      error: '#ef4444',
    },

    shadow: {
      xs: 'rgba(0, 0, 0, 0.3)',
      sm: 'rgba(0, 0, 0, 0.4)',
      md: 'rgba(0, 0, 0, 0.5)',
      lg: 'rgba(0, 0, 0, 0.6)',
      xl: 'rgba(0, 0, 0, 0.7)',
      '2xl': 'rgba(0, 0, 0, 0.8)',
    },
  },

  typography: {
    fontFamily: {
      primary: 'System',
      secondary: 'System',
      mono: 'monospace',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  },

  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
    },
  },
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Get theme by name
export const getTheme = (name: ThemeName): ThemeConfig => {
  return themes[name];
};

// Get current theme (for now always light as requested)
export const getCurrentTheme = (): ThemeConfig => {
  return lightTheme;
};

// Theme utilities for components
export const createThemeUtils = (theme: ThemeConfig) => ({
  // Color utilities
  getColor: (path: string) => {
    const keys = path.split('.');
    let value: any = theme.colors;
    for (const key of keys) {
      value = value?.[key];
    }
    return value || theme.colors.primary;
  },

  // Spacing utilities
  getSpacing: (size: keyof ThemeConfig['spacing']) => theme.spacing[size],

  // Typography utilities
  getFontSize: (size: keyof ThemeConfig['typography']['fontSize']) =>
    theme.typography.fontSize[size],

  getFontWeight: (weight: keyof ThemeConfig['typography']['fontWeight']) =>
    theme.typography.fontWeight[weight],

  // Border radius utilities
  getBorderRadius: (size: keyof ThemeConfig['borderRadius']) =>
    theme.borderRadius[size],

  // Shadow utilities
  getShadow: (size: keyof ThemeConfig['shadows']) =>
    theme.shadows[size],
});

// ============================================================================
// TAILWIND CSS CLASS MAPPINGS
// ============================================================================

export const tailwindMappings = {
  // Colors
  primary: 'text-primary-500',
  'primary-bg': 'bg-primary-500',
  'primary-border': 'border-primary-500',

  secondary: 'text-secondary-500',
  'secondary-bg': 'bg-secondary-500',
  'secondary-border': 'border-secondary-500',

  accent: 'text-accent-500',
  'accent-bg': 'bg-accent-500',
  'accent-border': 'border-accent-500',

  success: 'text-success-500',
  'success-bg': 'bg-success-500',
  'success-border': 'border-success-500',

  warning: 'text-warning-500',
  'warning-bg': 'bg-warning-500',
  'warning-border': 'border-warning-500',

  error: 'text-error-500',
  'error-bg': 'bg-error-500',
  'error-border': 'border-error-500',

  info: 'text-info-500',
  'info-bg': 'bg-info-500',
  'info-border': 'border-info-500',

  // Background
  'bg-primary': 'bg-background-primary',
  'bg-secondary': 'bg-background-secondary',
  'bg-tertiary': 'bg-background-tertiary',

  // Surface
  'surface-primary': 'bg-surface-primary',
  'surface-secondary': 'bg-surface-secondary',
  'surface-elevated': 'bg-surface-elevated',

  // Text
  'text-primary': 'text-text-primary',
  'text-secondary': 'text-text-secondary',
  'text-tertiary': 'text-text-tertiary',
  'text-disabled': 'text-text-disabled',
  'text-inverse': 'text-text-inverse',
  'text-accent': 'text-text-accent',

  // Borders
  'border-light': 'border-border-light',
  'border-medium': 'border-border-medium',
  'border-dark': 'border-border-dark',
  'border-focus': 'border-border-focus',
  'border-error': 'border-border-error',

  // Shadows
  'shadow-xs': 'shadow-xs',
  'shadow-sm': 'shadow-sm',
  'shadow-md': 'shadow-md',
  'shadow-lg': 'shadow-lg',
  'shadow-xl': 'shadow-xl',
  'shadow-2xl': 'shadow-2xl',

  // Spacing
  'space-xs': 'p-1',
  'space-sm': 'p-2',
  'space-md': 'p-4',
  'space-lg': 'p-6',
  'space-xl': 'p-8',
  'space-2xl': 'p-12',

  // Border Radius
  'rounded-none': 'rounded-none',
  'rounded-sm': 'rounded-sm',
  'rounded-md': 'rounded',
  'rounded-lg': 'rounded-lg',
  'rounded-xl': 'rounded-xl',
  'rounded-2xl': 'rounded-2xl',
  'rounded-full': 'rounded-full',

  // Typography
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',

  'font-thin': 'font-thin',
  'font-light': 'font-light',
  'font-normal': 'font-normal',
  'font-medium': 'font-medium',
  'font-semibold': 'font-semibold',
  'font-bold': 'font-bold',
  'font-extrabold': 'font-extrabold',
  'font-black': 'font-black',
} as const;

// ============================================================================
// COMPONENT THEME HOOKS
// ============================================================================

export const useComponentTheme = () => {
  const theme = getCurrentTheme();
  const utils = createThemeUtils(theme);

  return {
    theme,
    utils,
    // Convenience methods for common patterns
    getButtonStyles: (variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary') => {
      const base = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';

      switch (variant) {
        case 'primary':
          return `${base} bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700`;
        case 'secondary':
          return `${base} bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700`;
        case 'outline':
          return `${base} border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100`;
        case 'ghost':
          return `${base} text-primary-500 hover:bg-primary-50 active:bg-primary-100`;
        default:
          return base;
      }
    },

    getInputStyles: (error?: boolean, disabled?: boolean) => {
      const base = 'px-3 py-2 border rounded-lg transition-colors duration-200';

      if (disabled) {
        return `${base} bg-surface-tertiary text-text-disabled border-border-light cursor-not-allowed`;
      }

      if (error) {
        return `${base} bg-surface-primary text-text-primary border-border-error focus:border-error-500 focus:ring-2 focus:ring-error-200`;
      }

      return `${base} bg-surface-primary text-text-primary border-border-light focus:border-primary-500 focus:ring-2 focus:ring-primary-200`;
    },

    getCardStyles: (elevated = false) => {
      const base = 'bg-surface-primary border border-border-light rounded-xl p-4 transition-shadow duration-200';

      if (elevated) {
        return `${base} shadow-lg hover:shadow-xl`;
      }

      return `${base} shadow-sm hover:shadow-md`;
    },
  };
};

// ============================================================================
// EXPORT
// ============================================================================

export { lightTheme as defaultTheme };
export default lightTheme;