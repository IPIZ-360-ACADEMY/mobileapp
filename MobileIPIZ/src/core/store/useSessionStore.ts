import { create } from 'zustand';
import { AppPermission, AppRole, getPermissionsForRole, getRoleLabel } from '../rbac/policy';

const DEFAULT_USER_NAME = 'Utilizador IPIZ';
const DEFAULT_ROLE = AppRole.STUDENT;

type SessionState = {
  userName: string;
  role: AppRole;
  roleLabel: string;
  permissions: AppPermission[];
  setUserName: (value: string) => void;
  setRole: (role: AppRole) => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  userName: DEFAULT_USER_NAME,
  role: DEFAULT_ROLE,
  roleLabel: getRoleLabel(DEFAULT_ROLE),
  permissions: getPermissionsForRole(DEFAULT_ROLE),
  setUserName: (value) => set({ userName: value }),
  setRole: (role) =>
    set({
      role,
      roleLabel: getRoleLabel(role),
      permissions: getPermissionsForRole(role),
    }),
  resetSession: () =>
    set({
      userName: DEFAULT_USER_NAME,
      role: DEFAULT_ROLE,
      roleLabel: getRoleLabel(DEFAULT_ROLE),
      permissions: getPermissionsForRole(DEFAULT_ROLE),
    }),
}));
