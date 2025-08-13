import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  hasHydrated: boolean;
  login: () => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      hasHydrated: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // dipanggil SEBELUM dan SESUDAH rehydrate; yang di dalam return ini jalan SESUDAH
      onRehydrateStorage: () => (state, error) => {
        // langsung mutasi flag agar pasti true walau action belum terpasang
        if (state) state.hasHydrated = true;
        // (opsional) log error kalau ada
        if (error) console.warn("[persist] rehydrate error:", error);
      },
    }
  )
);
