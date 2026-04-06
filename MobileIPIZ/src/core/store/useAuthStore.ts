import { create } from 'zustand';
import { AppRole } from '../rbac/policy';
import { getCurrentSession, loginWithPassword, logoutSession, refreshAuthSession } from '../api';
import { env } from '../config/env';
import { SessionIdentity } from '../auth/blueprint';
import {
  clearPersistedAuthSession,
  loadPersistedAuthSession,
  savePersistedAuthSession,
} from '../auth/tokenStorage';
import { useSessionStore } from './useSessionStore';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  errorMessage: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  identity: SessionIdentity | null;
  isAuthenticated: boolean;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearSession: () => void;
};

function normalizeRole(role: string): AppRole {
  const value = role.toLowerCase();

  if (value === AppRole.SUPER_ROOT) return AppRole.SUPER_ROOT;
  if (value === AppRole.ADMIN) return AppRole.ADMIN;
  if (value === AppRole.COMPANY) return AppRole.COMPANY;
  if (value === AppRole.TEACHER) return AppRole.TEACHER;
  if (value === AppRole.ALUMNI) return AppRole.ALUMNI;

  return AppRole.STUDENT;
}

function applyIdentity(identity: SessionIdentity): void {
  const firstChunk = identity.email.split('@')[0] || 'Utilizador IPIZ';
  const normalizedName = firstChunk
    .split(/[._-]/g)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

  const sessionStore = useSessionStore.getState();
  sessionStore.setRole(normalizeRole(identity.role));
  sessionStore.setUserName(normalizedName || identity.email);
}

function clearIdentity(): void {
  useSessionStore.getState().resetSession();
}

function persistSessionSnapshot(params: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  identity: SessionIdentity;
}): void {
  void savePersistedAuthSession({
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
    expiresAt: params.expiresAt,
    identity: params.identity,
  });
}

function clearSessionSnapshot(): void {
  void clearPersistedAuthSession();
}

function mockAuth(email: string): SessionIdentity {
  const normalizedEmail = email.trim().toLowerCase();
  const role =
    normalizedEmail.includes('superroot') || normalizedEmail.includes('root')
      ? AppRole.SUPER_ROOT
      : normalizedEmail.includes('admin')
      ? AppRole.ADMIN
      : normalizedEmail.includes('teacher') || normalizedEmail.includes('prof')
      ? AppRole.TEACHER
      : normalizedEmail.includes('company')
      ? AppRole.COMPANY
      : normalizedEmail.includes('alumni')
      ? AppRole.ALUMNI
      : AppRole.STUDENT;

  return {
    userId: 'mock-user',
    email: normalizedEmail || 'mock@ipiz.local',
    role,
    permissions: [],
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'idle',
  errorMessage: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  identity: null,
  isAuthenticated: false,

  bootstrap: async (): Promise<void> => {
    if (get().isAuthenticated) {
      return;
    }

    if (env.useMockApi) {
      set({ status: 'unauthenticated', errorMessage: null });
      return;
    }

    set({ status: 'loading', errorMessage: null });

    const persisted = await loadPersistedAuthSession();
    if (!persisted) {
      set({ status: 'unauthenticated', errorMessage: null });
      return;
    }

    applyIdentity(persisted.identity);

    set({
      status: 'loading',
      isAuthenticated: true,
      accessToken: persisted.accessToken,
      refreshToken: persisted.refreshToken,
      expiresAt: persisted.expiresAt,
      identity: persisted.identity,
      errorMessage: null,
    });

    const restored = await get().refreshAccessToken();
    if (!restored) {
      set({ status: 'unauthenticated' });
    }
  },

  login: async (email: string, password: string): Promise<void> => {
    set({ status: 'loading', errorMessage: null });

    try {
      if (env.useMockApi) {
        const identity = mockAuth(email);
        applyIdentity(identity);

        set({
          status: 'authenticated',
          isAuthenticated: true,
          identity,
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: Date.now() + 60 * 60 * 1000,
          errorMessage: null,
        });

        persistSessionSnapshot({
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: Date.now() + 60 * 60 * 1000,
          identity,
        });
        return;
      }

      const response = await loginWithPassword({
        email,
        password,
        provider: 'local',
      });

      applyIdentity(response.identity);

      set({
        status: 'authenticated',
        isAuthenticated: true,
        identity: response.identity,
        accessToken: response.session.accessToken,
        refreshToken: response.session.refreshToken,
        expiresAt: Date.now() + response.session.expiresInSeconds * 1000,
        errorMessage: null,
      });

      const me = await getCurrentSession({ skipAuthRefresh: true });
      applyIdentity(me.identity);
      set({ identity: me.identity });

      persistSessionSnapshot({
        accessToken: response.session.accessToken,
        refreshToken: response.session.refreshToken,
        expiresAt: Date.now() + response.session.expiresInSeconds * 1000,
        identity: me.identity,
      });
    } catch (error) {
      get().clearSession();
      set({
        errorMessage: error instanceof Error ? error.message : 'Falha no login.',
      });
      throw error;
    }
  },

  refreshAccessToken: async (): Promise<boolean> => {
    const state = get();

    if (env.useMockApi) {
      return true;
    }

    if (!state.refreshToken) {
      return false;
    }

    try {
      const refreshed = await refreshAuthSession({
        refreshToken: state.refreshToken,
      });

      set({
        accessToken: refreshed.session.accessToken,
        refreshToken: refreshed.session.refreshToken,
        expiresAt: Date.now() + refreshed.session.expiresInSeconds * 1000,
        status: 'authenticated',
        isAuthenticated: true,
        errorMessage: null,
      });

      const me = await getCurrentSession({ skipAuthRefresh: true });
      applyIdentity(me.identity);
      set({ identity: me.identity });

      persistSessionSnapshot({
        accessToken: refreshed.session.accessToken,
        refreshToken: refreshed.session.refreshToken,
        expiresAt: Date.now() + refreshed.session.expiresInSeconds * 1000,
        identity: me.identity,
      });

      return true;
    } catch {
      get().clearSession();
      return false;
    }
  },

  logout: async (): Promise<void> => {
    const currentRefreshToken = get().refreshToken;

    if (currentRefreshToken && !env.useMockApi) {
      try {
        await logoutSession(currentRefreshToken);
      } catch {
        // Best effort logout.
      }
    }

    get().clearSession();
  },

  clearSession: (): void => {
    clearIdentity();
    clearSessionSnapshot();

    set({
      status: 'unauthenticated',
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      identity: null,
      errorMessage: null,
    });
  },
}));