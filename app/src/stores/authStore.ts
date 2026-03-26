import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'hospital_admin' | 'super_admin';
  avatar?: string;
  isVerified: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'patient' | 'doctor' | 'hospital_admin';
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: async (email: string, password: string, role?: string) => {
        try {
          const result = await api.post<{ token: string; user: User }>('/api/auth/login', { email, password, role });
          set({ isAuthenticated: true, user: result.user, token: result.token });
          return { success: true };
        } catch (e: any) {
          return { success: false, error: e?.message || 'Login failed' };
        }
      },

      register: async (data: RegisterData) => {
        try {
          const result = await api.post<{ token: string; user: User }>('/api/auth/register', data);
          set({ isAuthenticated: true, user: result.user, token: result.token });
          return { success: true };
        } catch (e: any) {
          return { success: false, error: e?.message || 'Registration failed' };
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
