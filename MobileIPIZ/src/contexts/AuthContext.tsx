import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { User, UserRole, AuthState } from '../types/user.types';

// Re-export for convenience
export { UserRole } from '../types/user.types';

// -------------------------------------------------------------------
// Context value shape
// -------------------------------------------------------------------
interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

// -------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
}

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------
function resolveRole(email: string): UserRole {
  const lower = email.toLowerCase();
  if (lower.includes('superroot') || lower.includes('root')) return UserRole.SUPER_ROOT;
  if (lower.includes('professor')) return UserRole.TEACHER;
  if (lower.includes('admin')) return UserRole.ADMIN;
  if (lower.includes('alumni')) return UserRole.ALUMNI;
  if (lower.includes('empresa')) return UserRole.COMPANY;
  return UserRole.STUDENT;
}

function nameFromEmail(email: string): string {
  const prefix = email.split('@')[0] ?? email;
  return prefix
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

// -------------------------------------------------------------------
// Context
// -------------------------------------------------------------------
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// -------------------------------------------------------------------
// Provider
// -------------------------------------------------------------------
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (email: string, _password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Mock async delay
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    const role = resolveRole(email);
    const user: User = {
      id: generateId(),
      name: nameFromEmail(email),
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user, token: generateToken() },
    });
  }, []);

  const logout = useCallback((): void => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string): Promise<void> => {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock async delay
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      const role = resolveRole(email);
      const user: User = {
        id: generateId(),
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token: generateToken() },
      });
    },
    [],
  );

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// -------------------------------------------------------------------
// Hook
// -------------------------------------------------------------------
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
