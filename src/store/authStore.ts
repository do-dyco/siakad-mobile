import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "./userStore";

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      hasHydrated: false,

      login: () => {
        console.log("User logged in");
        set({ isLoggedIn: true });
      },

      logout: () => {
        console.log("User logged out");
        set({ isLoggedIn: false });
        (useUserStore.getState() as { clearAuth: () => void }).clearAuth();
      },

      setHydrated: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
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
            });
            // Set hydrated flag
            state?.setHydrated();
          }
        };
      },
    }
  )
);
