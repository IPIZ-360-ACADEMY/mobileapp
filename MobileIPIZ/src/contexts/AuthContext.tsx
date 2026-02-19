import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AuthState } from '../types/user.types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string) => {
    void password;
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const mockUser: User = {
        id: '1',
        name: 'Usuario Teste',
        email,
        role: UserRole.STUDENT,
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    void password;
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const mockUser: User = {
        id: '1',
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
