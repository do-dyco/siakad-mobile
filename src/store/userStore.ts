import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setAuth: (authData: {
        user: any;
        accessToken: any;
        refreshToken: any;
      }) => {
        console.log("Setting auth data:", authData);
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        });
      },

      clearAuth: () => {
        console.log("Clearing auth data");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      },

      updateUser: (userData: any) => {
        set({ user: userData });
      },

      updateToken: (token: any) => {
        set({ accessToken: token });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: (state) => {
        console.log("User store hydration started");
        return (state, error) => {
          if (error) {
            console.error("User store hydration failed:", error);
          } else {
            console.log("User store hydrated successfully:", {
              hasUser: !!state?.user,
              hasAccessToken: !!state?.accessToken,
              hasRefreshToken: !!state?.refreshToken,
            });
          }
        };
      },
    }
  )
);
