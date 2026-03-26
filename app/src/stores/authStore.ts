import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'patient@demo.com': {
    id: 'p1',
    name: 'Aung Kyaw',
    email: 'patient@demo.com',
    phone: '+95 9 123 456 789',
    role: 'patient',
    avatar: 'AK',
    isVerified: true,
    password: 'demo123',
  },
  'doctor@demo.com': {
    id: 'd1',
    name: 'Dr. Khin Mya',
    email: 'doctor@demo.com',
    phone: '+95 9 987 654 321',
    role: 'doctor',
    avatar: 'KM',
    isVerified: true,
    password: 'demo123',
  },
  'hospital@demo.com': {
    id: 'h1',
    name: 'Yangon General Hospital',
    email: 'hospital@demo.com',
    phone: '+95 1 123 456',
    role: 'hospital_admin',
    avatar: 'YG',
    isVerified: true,
    password: 'demo123',
  },
  'admin@demo.com': {
    id: 'a1',
    name: 'Super Admin',
    email: 'admin@demo.com',
    phone: '+95 9 111 222 333',
    role: 'super_admin',
    avatar: 'SA',
    isVerified: true,
    password: 'demo123',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: async (email: string, password: string, role?: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser = MOCK_USERS[email.toLowerCase()];
        
        if (!mockUser || mockUser.password !== password) {
          return { success: false, error: 'Invalid email or password' };
        }

        if (role && mockUser.role !== role) {
          return { success: false, error: `This account is not registered as ${role}` };
        }

        const { password: _, ...userWithoutPassword } = mockUser;
        
        set({
          isAuthenticated: true,
          user: userWithoutPassword,
          token: 'mock-jwt-token-' + Date.now(),
        });

        return { success: true };
      },

      register: async (data: RegisterData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (MOCK_USERS[data.email.toLowerCase()]) {
          return { success: false, error: 'Email already registered' };
        }

        // In real app, this would create a new user
        return { success: true };
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
