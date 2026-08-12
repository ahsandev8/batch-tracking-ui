import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getCurrentUserApi,
  loginApi,
  type LoginRequest,
  type UserProfile,
} from "../api/auth";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (credentials: LoginRequest) => Promise<void>;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (credentials) => {
        const response = await loginApi(credentials);

        set({
          token: response.access_token,
          isAuthenticated: true,
          isLoading: false,
        });

        // Fetch authenticated user
        const user = await getCurrentUserApi();

        set({
          user,
        });
      },

      initializeAuth: async () => {
        const { token } = get();

        if (!token) {
          set({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });

          return;
        }

        try {
          const user = await getCurrentUserApi();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: "batch-tracking-auth",

      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
