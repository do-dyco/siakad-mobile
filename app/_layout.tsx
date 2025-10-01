// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../src/store/authStore";
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  const { isLoggedIn, hasHydrated } = useAuthStore();

  const [fontsLoaded] = useFonts({
    ["Lato"]: require("../assets/fonts/Lato-Regular.ttf"),
    ["Lato-Bold"]: require("../assets/fonts/Lato-Bold.ttf"),
    ["Lato-Italic"]: require("../assets/fonts/Lato-Italic.ttf"),
    ["Lato-Thin"]: require("../assets/fonts/Lato-Thin.ttf"),
    ["Lato-Black"]: require("../assets/fonts/Lato-Black.ttf"),
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Set navigation bar color based on theme
    if (colorScheme) {
      if (colorScheme === "dark") {
        NavigationBar.setBackgroundColorAsync("#000000");
        NavigationBar.setButtonStyleAsync("light");
      } else {
        NavigationBar.setBackgroundColorAsync("#ffffff");
        NavigationBar.setButtonStyleAsync("dark");
      }
    }
  }, [colorScheme]);

  useEffect(() => {
    if (!fontsLoaded || !hasHydrated || !isMounted) return;

    const group = segments[0];

    if (!isLoggedIn && group !== "(auth)") {
      router.replace("/(auth)/login");
      SplashScreen.hideAsync();
      return;
    }

    if (isLoggedIn && (!group || group === "")) {
      router.replace("/(tabs)");
      SplashScreen.hideAsync();
      return;
    }

    SplashScreen.hideAsync();
  }, [fontsLoaded, hasHydrated, isLoggedIn, segments, isMounted]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
        />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
