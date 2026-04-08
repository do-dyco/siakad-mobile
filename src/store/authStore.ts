import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  groups: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  hasHydrated: boolean;
  setAuth: (authData: { user: User; accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  updateToken: (token: string) => void;
  setHydrated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      hasHydrated: false,

      setAuth: (authData) => {
        console.log("Setting auth data:", authData);
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          isLoggedIn: true,
        });
      },

      clearAuth: () => {
        console.log("Clearing auth data");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },

      logout: () => {
        console.log("Logging out");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },

      updateUser: (userData) => {
        set({ user: userData });
      },

      updateToken: (token) => {
        set({ accessToken: token });
      },

      setHydrated: (val) => {
        set({ hasHydrated: val });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: (state) => {
        console.log("Auth store hydration started");
        return (state, error) => {
          if (error) {
            console.error("Auth store hydration failed:", error);
          } else {
            console.log("Auth store hydrated successfully:", {
              isLoggedIn: state?.isLoggedIn || false,
              hasUser: !!state?.user,
            });
            state?.setHydrated(true);
          }
        };
      },
    }
  )
);
